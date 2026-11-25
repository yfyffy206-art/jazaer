import http.server
import socketserver
import os
import gzip
import json
import urllib.parse
from io import BytesIO

ROOT = os.path.dirname(os.path.abspath(__file__))

# إعدادات الاتصال من متغيّرات البيئة (لا مفاتيح داخل الكود)
import firebase_config  # noqa: E402

# العنصر النائب في صفحات HTML يُستبدل عند الطلب بوسم الإعدادات الحقيقي.
# (على Netlify الثابت يُولَّد ملف assets/js/firebase-env.js عبر build_env_js.py)
ENV_PLACEHOLDER = b'<script src="/assets/js/firebase-env.js"></script>'
ENV_PATH = '/assets/js/firebase-env.js'

# النطاق الافتراضي المضمّن في الصفحات الثابتة (og:image/canonical/sitemap).
# يُستبدل عند الطلب بالنطاق الفعلي من ترويسة Host، فتعمل الصور والروابط المطلقة
# على أي استضافة (Railway/Netlify/نطاق مخصّص) دون تعديل الكود.
PLACEHOLDER_SITE_URL = 'https://althenayanfarms.app'   # القيمة المضمّنة في الملفات
CONFIGURED_SITE_URL = firebase_config.site_url(default='')  # نطاق اختياري من env
# كل النطاقات التي يجب تصحيحها إلى نطاق الطلب الفعلي.
SOURCE_SITE_URLS = {s.encode('utf-8') for s in
                    (PLACEHOLDER_SITE_URL, CONFIGURED_SITE_URL) if s}


def _env_script(include_credentials=False):
    """وسم سكربت يحقن الإعدادات.

    صفحات موقع العملاء تحتاج بيانات حساب اللوحة للمصادقة التلقائية مع Firestore
    (تسجيل الدخول المجهول معطّل). صفحات لوحة التحكم تُحقن بالإعدادات العامة فقط
    (اللوحة تُسجّل الدخول ببريد/كلمة مرور المُدخَلة يدوياً).
    """
    cfg = firebase_config.client_env() if include_credentials else firebase_config.public_env()
    return ('<script>window.__FIREBASE_ENV__=' + json.dumps(cfg, ensure_ascii=False)
            + ';</script>').encode('utf-8')


APP_VERSION = 'prize-v1'

# أنواع MIME دقيقة (يحل مشكلة .js يعود text/plain في بعض البيئات)
MIME = {
    '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
    '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject', '.map': 'application/json',
}
# امتدادات الملفات النصية القابلة للضغط
COMPRESSIBLE = {'.html', '.htm', '.css', '.js', '.svg', '.json', '.xml', '.txt'}
# الملفات الثابتة طويلة الأمد (تُخزّن سنة عند العميل)
STATIC_ASSETS = {'.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp',
                 '.avif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.map'}
# الأكواد تتغيّر مع كل إصلاح: لا نخزّنها طويلاً حتى تصل التعديلات للجوال فوراً
REVALIDATE_ASSETS = {'.js', '.css'}


class Handler(http.server.SimpleHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'  # keep-alive: اتصال واحد لكل الملفات

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def _request_site_url(self):
        """النطاق الفعلي من ترويسة Host (مع احترام X-Forwarded-Proto خلف الوكلاء).
        يُستخدم لتصحيح الروابط المطلقة (og:image/canonical) لكل نطاق."""
        host = self.headers.get('Host', '')
        if not host:
            return None
        proto = self.headers.get('X-Forwarded-Proto', 'http').split(',')[0].strip() or 'http'
        return '%s://%s' % (proto, host)

    def _rewrite_base(self, content, request_url):
        """يستبدل النطاق الافتراضي/المُعدّ في المحتوى بالنطاق الفعلي للطلب."""
        if not request_url:
            return content
        target = request_url.encode('utf-8')
        if target not in SOURCE_SITE_URLS:
            for src in SOURCE_SITE_URLS:
                content = content.replace(src, target)
        # og:image: منصّات المشاركة تطلب رابطاً مطلقاً، لا نسبياً
        content = content.replace(b'<meta property="og:image" content="/',
                                  b'<meta property="og:image" content="' + target + b'/')
        return content

    def guess_type(self, path):
        return MIME.get(os.path.splitext(path)[1].lower(), 'application/octet-stream')

    def do_GET(self):
        return self._handle(with_body=True)

    def do_HEAD(self):
        return self._handle(with_body=False)

    def _handle(self, with_body=True):
        # فك ترميز المسار (يدعم أسماء الملفات غير الإنجليزية مثل أسماء عربية)
        path = urllib.parse.unquote(self.path.split('?', 1)[0])

        # النطاق الفعلي للطلب — لتصحيح الروابط المطلقة (og:image/canonical/sitemap)
        self._site_url = self._request_site_url()

        # حجب الملفات الحساسة (متغيّرات البيئة/الكود المصدري) مهما كان الطلب
        base = os.path.basename(path)
        if (base.startswith('.') or base.endswith('.py')
                or base in ('firebase_config.py',)):
            self.send_error(404, 'Not found')
            return

        # ملف الإعدادات المحقون من env (يُولَّد عند الطلب — للاستخدام المباشر)
        if path == ENV_PATH:
            body = _env_script(include_credentials=True)
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            if with_body:
                self.wfile.write(body)
            return

        # فحص صحة الإصدار المنشور (لتشخيص النشر)
        if path == '/healthz':
            info = {'status': 'ok', 'version': APP_VERSION}
            body = json.dumps(info, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            if with_body:
                self.wfile.write(body)
            return

        # موقع العملاء: ملفات حقيقية، وإلا index.html
        if path == '/':
            return self._serve('/index.html', with_body)
        full = os.path.join(ROOT, path.lstrip('/'))
        if os.path.exists(full):
            return self._serve(path, with_body)
        return self._serve('/index.html', with_body)

    def _serve(self, url_path, with_body=True):
        """يخدم ملفاً ثابتاً مع cache ذكي + gzip."""
        fs_path = self.translate_path(url_path)
        if not os.path.exists(fs_path) or os.path.isdir(fs_path):
            self.send_error(404, 'Not found')
            return

        ext = os.path.splitext(url_path)[1].lower()
        ctype = self.guess_type(url_path)
        try:
            with open(fs_path, 'rb') as f:
                content = f.read()
        except Exception:
            self.send_error(403, 'Forbidden')
            return

        # حقن الإعدادات من env في صفحات HTML عند الطلب (استبدال العنصر النائب).
        if ENV_PLACEHOLDER in content:
            content = content.replace(ENV_PLACEHOLDER, _env_script(include_credentials=True))

        # تصحيح الروابط المطلقة (og:image/canonical/sitemap) للنطاق الفعلي — HTML/XML/TXT فقط.
        if ext in {'.html', '.htm', '.xml', '.txt'}:
            content = self._rewrite_base(content, getattr(self, '_site_url', None))

        if ext in {'.html', '.htm'}:
            cache = 'no-cache, must-revalidate'  # صفحات HTML: تتحقق من التحديث دائماً
        elif ext in REVALIDATE_ASSETS:
            cache = 'no-cache, must-revalidate'  # الأكواد: تحقّق من التحديث في كل مرة
        elif ext in STATIC_ASSETS:
            cache = 'public, max-age=31536000, immutable'  # ملفات ثابتة
        else:
            cache = 'no-store'

        # ضغط gzip للنصوص فقط
        accept_enc = self.headers.get('Accept-Encoding', '')
        gzipped = None
        if (ext in COMPRESSIBLE) and ('gzip' in accept_enc):
            try:
                buf = BytesIO()
                with gzip.GzipFile(fileobj=buf, mode='wb', compresslevel=6, mtime=0) as gz:
                    gz.write(content)
                gz_data = buf.getvalue()
                if len(gz_data) < len(content):
                    gzipped = gz_data
            except Exception:
                gzipped = None

        body = gzipped if gzipped is not None else content
        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', cache)
        if gzipped is not None:
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Vary', 'Accept-Encoding')
        self.end_headers()
        if with_body:
            self.wfile.write(body)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True  # خيوط خلفية لا تمنع الإغلاق


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 12001))
    with Server(('0.0.0.0', port), Handler) as httpd:
        print(f'المشروع يعمل على المنفذ :{port}')
        print(f'  http://localhost:{port}/')
        httpd.serve_forever()
