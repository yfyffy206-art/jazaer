/* منع التكبير/التصغير نهائياً على الهواتف.
   meta viewport + touch-action في no-zoom.css يغطيان أغلب المتصفحات،
   وهذا الملف يغطي ما تتجاهله تلك الآليات:
   - Safari على iOS لا يحترم user-scalable=no منذ iOS 10، ويكبّر بإيماءة الإصبعين.
   - بعض المتصفحات تسمح بالتكبير عند لمس الصفحة بإصبعين.
   ملاحظة: لا نُلغي حدث click أبداً حتى لا تتعطل الأزرار ولوحة الأرقام. */
(function () {
  'use strict';

  var opts = { passive: false };
  function block(event) { event.preventDefault(); }

  ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (type) {
    document.addEventListener(type, block, opts);
  });

  function blockMultiTouch(event) {
    if (event.touches && event.touches.length > 1) event.preventDefault();
  }
  document.addEventListener('touchstart', blockMultiTouch, opts);
  document.addEventListener('touchmove', blockMultiTouch, opts);

  // تكبير بالعجلة مع Ctrl (أجهزة سطح المكتب واللوحات اللمسية)
  window.addEventListener('wheel', function (event) {
    if (event.ctrlKey) event.preventDefault();
  }, opts);
})();
