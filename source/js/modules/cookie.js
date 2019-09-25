'use strict';

(function () {
  var hideClass = 'js_hide';
  var cookieBlock = document.querySelector('.js_cookie');
  var button = document.querySelector('.js_cookie .js_btn');

  if (cookieBlock && button) {
    button.addEventListener('click', function () {
      cookieBlock.classList.add(hideClass);
    });
  }
})();
