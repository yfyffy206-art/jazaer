# لوحة التحكم — مستودع منفصل عن موقع العملاء

هذا المستودع يحتوي **لوحة التحكم فقط**. موقع العملاء له مستودع واستضافة مستقلّان
(`jazaer`)، ولا يشترك الاثنان في نطاق واحد — وهذا هو الفصل الأمني المطلوب:
لو تسرّب رابط الموقع أو تعطّل، تبقى اللوحة معزولة والعكس صحيح.

## الملفات

| المسار | الوظيفة |
|---|---|
| `index.html` | صفحة اللوحة الكاملة (HTML + CSS داخلية) |
| `assets/js/app.js` | منطق اللوحة: تسجيل الدخول، الجلسات، الأوامر، التنبيهات |
| `assets/js/firebase-env.js` | إعدادات Firebase العامة (مرفقة — لا تحتاج بناء) |
| `assets/js/firebase-config.js` | تهيئة Firebase من الإعدادات أعلاه |
| `assets/panel.css`, `assets/images/`, `assets/vendor/` | التنسيق والأصول |
| `serve_dashboard.py` | خادم محلي للوحة (منفذ 12000) |
| `build_env_js.py` | يعيد توليد `firebase-env.js` من متغيّرات البيئة |
| `netlify.toml` / `vercel.json` / `_headers` | إعداد النشر + ترويسات أمنية |

## تشغيل محلي

```bash
python3 serve_dashboard.py          # http://localhost:12000
```

الخادم يحقن إعدادات Firebase تلقائياً من `.env` إن وُجد، وإلا يستخدم
`assets/js/firebase-env.js` المرفق.

## النشر على استضافة منفصلة

### Netlify (الأسهل — سحب وإفلات)
1. <https://app.netlify.com/drop> ثم اسحب **مجلد المشروع كاملاً**.
2. أو اربط المستودع: Build command فارغ، Publish directory `.`.
3. بعد النشر: أضف النطاق، وفعّل HTTPS (تلقائي).

### Vercel
1. New Project ← اختر المستودع.
2. Framework Preset: **Other**، Build Command: فارغ، Output Directory: `.`.

### Cloudflare Pages
1. Workers & Pages ← Create ← Pages ← Connect to Git.
2. Build command: فارغ، Build output directory: `/`.

### GitHub Pages
الإعدادات ← Pages ← Source: *Deploy from a branch* ← `main` / `root`.
المسارات في المشروع نسبية، فتعمل أيضاً على مسار فرعي
(`https://<user>.github.io/dashboard-jazaer/`).

## إعدادات Firebase

`assets/js/firebase-env.js` يحتوي **معرّفات عامة** فقط
(`apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket`,
`messagingSenderId`, `appId`, `measurementId`). هذه القيم تُشحن إلى المتصفح في
أي تطبيق Firebase، وليست أسراراً — الحماية الفعلية من:

1. **Firebase Auth**: فعّل مزوّد `Email/Password` وأنشئ حساب المدير فقط.
   لا يوجد أي بريد أو كلمة سر داخل الكود؛ الدخول عبر `signInWithEmailAndPassword`.
2. **قواعد Firestore / Realtime Database**: اجعل الكتابة من الموقع العام محدودة،
   والقراءة/التغيير من اللوحة مشروطة بـ `auth != null` (أو uid المدير).

لتحديث الإعدادات:

```bash
FIREBASE_API_KEY=... FIREBASE_PROJECT_ID=... python3 build_env_js.py
```

## قائمة أمان سريعة

- [x] `X-Robots-Tag: noindex` + `robots.txt` — اللوحة لا تُفهرس في محرّكات البحث.
- [x] `X-Frame-Options: DENY` — لا يمكن تضمينها داخل موقع آخر (حماية من النقر الخفي).
- [x] `Referrer-Policy: no-referrer` — لا يتسرّب رابط اللوحة لمواقع خارجية.
- [x] لا أسرار في المستودع: `.env` مستثنى، وكلمة سر المدير غير موجودة في الكود.
- [ ] **مستحسن**: اجعل المستودع *Private* (الإعدادات ← General ← Danger Zone ← Change visibility).
- [ ] **مستحسن**: كلمة سر قوية لحساب المدير + تفعيل 2FA على حساب GitHub.
- [ ] **مستحسن**: نطاق فرعي خاص باللوحة (مثل `panel.example.com`) بدل رابط الاستضافة الافتراضي.

## تحديث اللوحة

بعد أي تعديل على `app.js` ارفع رقم الإصدار في `index.html`:
`assets/js/app.js?v=10` ← `?v=11` حتى لا يبقى المتصفح على النسخة القديمة.
