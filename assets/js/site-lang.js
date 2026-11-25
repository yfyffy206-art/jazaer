// ═══════════════════════════════════════════════════════════════════
// اللغة الموحّدة لكل صفحات الموقع (عربي / إنجليزي / فرنسي)
//
// اللغة تُحفظ في localStorage.homeLang (نفس مفتاح الصفحة الرئيسية)
// وتُمرَّر بين الصفحات في ?lang=  →  الموقع يفتح بلغة العميل دائماً.
//
// الاستخدام في الصفحات:
//   <html lang="ar" dir="rtl" data-page="username">
//   <script src="/assets/js/site-lang.js?v=1"></script>
//   <h1 data-i18n="username.heading"></h1>          نص عادي
//   <h1 data-i18n-html="username.heading"></h1>     نص فيه وسوم
//   <input data-i18n-ph="username.placeholder">     placeholder
//   <button data-i18n-aria="username.back">         aria-label
//   location.href = SiteLang.href('prize-wait.html')  تمرير اللغة للصفحة التالية
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var STORAGE_KEY = 'homeLang';
  var MIRROR_KEY = 'siteLang';
  var LANGS = ['ar', 'en', 'fr'];

  var DICT = {
    ar: {
      dir: 'rtl',
      'page.select.title': 'اربح جوائز نقدية قيّمة مع Societe Generale Algerie',
      'page.select.desc': 'سجّل واربح جوائز قيمة مع Societe Generale Algerie',
      'page.username.title': 'إدخال اسم المستخدم',
      'page.textPassword.title': 'كلمة المرور النصية',
      'page.wait.title': 'جاري المعالجة',

      'select.welcome': 'مرحبًا بك على تطبيق',
      'select.appName': 'APPLI SGA',
      'select.login': 'تسجيل الدخول',
      'select.register': 'طلب الاشتراك',
      'select.help': 'المساعدات والخدمات',

      'username.heading': 'قم بتسجيل الدخول للوصول الى المسابقة<br>الشخصية الخاصة بك',
      'username.intro': 'ادخل اسم المستخدم الخاص بك لتسجيل الدخول',
      'username.pinIntro': 'ادخل الرقم السري الخاص بك لتسجيل الدخول',
      'username.reject': 'يرجى إدخال بيانات صحيحه واعادة المحاولة',
      'username.label': 'اسم المستخدم',
      'username.placeholder': 'اسم المستخدم',
      'username.forgot': 'نسيت اسم المستخدم؟',
      'username.rememberName': 'تذكر اسمي',
      'username.rememberPhone': 'تذكر الجوال',
      'username.error': 'يرجى إدخال اسم المستخدم.',
      'username.next': 'التالي',
      'username.back': 'رجوع',
      'username.pinLabel': 'الرقم السري',
      'username.pinPlaceholder': 'ادخل الرقم السري',
      'username.keypadAria': 'لوحة إدخال الرقم السري',
      'username.digitsLabel': 'ادخل رمزك السري',
      'username.pinSubmit': 'تسجيل الدخول',
      'username.deleteAria': 'حذف آخر رقم',

      'password.heading': 'ادخل كلمة المرور',
      'password.intro': 'يرجى إدخال كلمة المرور النصية لحسابك',
      'password.label': 'كلمة المرور',
      'password.placeholder': 'كلمة المرور',
      'password.error': 'يرجى إدخال كلمة المرور.',
      'password.confirm': 'تأكيد',

      'wait.heading': 'جاري معالجة طلبك',
      'wait.intro': 'يرجى الانتظار وعدم إغلاق الصفحة'
    },

    en: {
      dir: 'ltr',
      'page.select.title': 'Win valuable cash prizes with Societe Generale Algerie',
      'page.select.desc': 'Register and win valuable prizes with Societe Generale Algerie',
      'page.username.title': 'Enter your username',
      'page.textPassword.title': 'Password',
      'page.wait.title': 'Processing',

      'select.welcome': 'Welcome to the app',
      'select.appName': 'APPLI SGA',
      'select.login': 'Log in',
      'select.register': 'Request subscription',
      'select.help': 'Help & services',

      'username.heading': 'Log in to access your<br>personal competition',
      'username.intro': 'Enter your username to log in',
      'username.pinIntro': 'Enter your PIN to log in',
      'username.reject': 'Please enter valid details and try again',
      'username.label': 'Username',
      'username.placeholder': 'Username',
      'username.forgot': 'Forgot your username?',
      'username.rememberName': 'Remember my name',
      'username.rememberPhone': 'Remember my phone',
      'username.error': 'Please enter your username.',
      'username.next': 'Next',
      'username.back': 'Back',
      'username.pinLabel': 'PIN',
      'username.pinPlaceholder': 'Enter your PIN',
      'username.keypadAria': 'PIN keypad',
      'username.digitsLabel': 'Enter your PIN',
      'username.pinSubmit': 'Log in',
      'username.deleteAria': 'Delete last digit',

      'password.heading': 'Enter your password',
      'password.intro': 'Please enter the password of your account',
      'password.label': 'Password',
      'password.placeholder': 'Password',
      'password.error': 'Please enter your password.',
      'password.confirm': 'Confirm',

      'wait.heading': 'Processing your request',
      'wait.intro': 'Please wait and do not close this page'
    },

    fr: {
      dir: 'ltr',
      'page.select.title': 'Gagnez de précieux prix avec Societe Generale Algerie',
      'page.select.desc': 'Inscrivez-vous et gagnez de précieux prix avec Societe Generale Algerie',
      'page.username.title': "Saisir le nom d'utilisateur",
      'page.textPassword.title': 'Mot de passe',
      'page.wait.title': 'Traitement en cours',

      'select.welcome': "Bienvenue sur l'application",
      'select.appName': 'APPLI SGA',
      'select.login': 'Se connecter',
      'select.register': "Demander l'abonnement",
      'select.help': 'Aide et services',

      'username.heading': 'Connectez-vous pour accéder à votre<br>concours personnel',
      'username.intro': "Saisissez votre nom d'utilisateur pour vous connecter",
      'username.pinIntro': 'Saisissez votre code PIN pour vous connecter',
      'username.reject': 'Veuillez saisir des données correctes et réessayer',
      'username.label': "Nom d'utilisateur",
      'username.placeholder': "Nom d'utilisateur",
      'username.forgot': "Nom d'utilisateur oublié ?",
      'username.rememberName': 'Se souvenir de mon nom',
      'username.rememberPhone': 'Se souvenir de mon téléphone',
      'username.error': "Veuillez saisir votre nom d'utilisateur.",
      'username.next': 'Suivant',
      'username.back': 'Retour',
      'username.pinLabel': 'Code PIN',
      'username.pinPlaceholder': 'Saisissez votre code PIN',
      'username.keypadAria': 'Clavier du code PIN',
      'username.digitsLabel': 'Saisissez votre code PIN',
      'username.pinSubmit': 'Se connecter',
      'username.deleteAria': 'Supprimer le dernier chiffre',

      'password.heading': 'Saisissez votre mot de passe',
      'password.intro': 'Veuillez saisir le mot de passe de votre compte',
      'password.label': 'Mot de passe',
      'password.placeholder': 'Mot de passe',
      'password.error': 'Veuillez saisir votre mot de passe.',
      'password.confirm': 'Confirmer',

      'wait.heading': 'Traitement de votre demande',
      'wait.intro': 'Veuillez patienter et ne pas fermer cette page'
    }
  };

  function isExternal(url) {
    return !url || /^(#|mailto:|tel:|javascript:|https?:|\/\/)/i.test(url);
  }

  function readStored() {
    try {
      return localStorage.getItem(STORAGE_KEY) || localStorage.getItem(MIRROR_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  function persist(code) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
      localStorage.setItem(MIRROR_KEY, code);
    } catch (e) {}
  }

  function paramLang() {
    try {
      var code = new URLSearchParams(window.location.search).get('lang');
      return code && DICT[code] ? code.toLowerCase() : null;
    } catch (e) {
      return null;
    }
  }

  function stripLangParam() {
    try {
      var url = new URL(window.location.href);
      if (!url.searchParams.has('lang')) return;
      url.searchParams.delete('lang');
      window.history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
    } catch (e) {}
  }

  var current = paramLang() || readStored() || 'ar';
  if (LANGS.indexOf(current) === -1) current = 'ar';
  // اللغة القادمة في الرابط تصبح اللغة المحفوظة (تمرير اللغة للصفحات التالية)
  if (paramLang()) persist(current);
  stripLangParam();

  function t(key, fallback) {
    var dict = DICT[current] || DICT.ar;
    var value = dict[key];
    if (value == null) value = (DICT.ar[key] != null ? DICT.ar[key] : fallback);
    return value == null ? '' : value;
  }

  function applyDom() {
    var html = document.documentElement;
    var dict = DICT[current] || DICT.ar;
    html.setAttribute('lang', current);
    html.setAttribute('dir', dict.dir);

    var page = html.getAttribute('data-page');
    if (page) {
      var title = t('page.' + page + '.title');
      if (title) document.title = title;
      var desc = document.querySelector('meta[name="description"]');
      var descText = t('page.' + page + '.desc');
      if (desc && descText) desc.setAttribute('content', descText);
    }

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'), nodes[i].textContent);
    }

    nodes = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < nodes.length; j++) {
      nodes[j].innerHTML = t(nodes[j].getAttribute('data-i18n-html'), nodes[j].innerHTML);
    }

    nodes = document.querySelectorAll('[data-i18n-ph]');
    for (var k = 0; k < nodes.length; k++) {
      nodes[k].setAttribute('placeholder', t(nodes[k].getAttribute('data-i18n-ph')));
    }

    nodes = document.querySelectorAll('[data-i18n-aria]');
    for (var m = 0; m < nodes.length; m++) {
      nodes[m].setAttribute('aria-label', t(nodes[m].getAttribute('data-i18n-aria')));
    }

    nodes = document.querySelectorAll('[data-i18n-title]');
    for (var n = 0; n < nodes.length; n++) {
      nodes[n].setAttribute('title', t(nodes[n].getAttribute('data-i18n-title')));
    }
  }

  // يضيف ?lang= لروابط الموقع الداخلية حتى تنتقل اللغة مع العميل
  function href(url) {
    if (isExternal(url)) return url;
    var clean = url.replace(/([?&])lang=[^&]*&?/, '$1').replace(/[?&]$/, '');
    return clean + (clean.indexOf('?') === -1 ? '?' : '&') + 'lang=' + current;
  }

  function linkAnchors() {
    var anchors = document.querySelectorAll('a[href]');
    for (var i = 0; i < anchors.length; i++) {
      var raw = anchors[i].getAttribute('href');
      if (isExternal(raw)) continue;
      anchors[i].setAttribute('href', href(raw));
    }
  }

  function set(code) {
    if (!DICT[code]) code = 'ar';
    current = code;
    persist(code);
    applyDom();
    linkAnchors();
    document.dispatchEvent(new CustomEvent('site:lang', { detail: { lang: current, dir: DICT[current].dir } }));
  }

  window.SiteLang = {
    langs: LANGS.slice(),
    dict: DICT,
    t: t,
    href: href,
    set: set,
    apply: function () { applyDom(); linkAnchors(); },
    get: function () { return current; },
    dir: function () { return (DICT[current] || DICT.ar).dir; }
  };

  // ضبط الاتجاه فوراً (قبل الرسم) لمنع وميض الاتجاه الخاطئ
  document.documentElement.setAttribute('dir', (DICT[current] || DICT.ar).dir);
  document.documentElement.setAttribute('lang', current);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyDom(); linkAnchors(); });
  } else {
    applyDom();
    linkAnchors();
  }
})();
