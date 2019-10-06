'use strict';

(function () {
  var hideClass = 'js-hide';
  var popup = document.querySelector('.special-popup');
  var btnsOpenPopup = document.querySelectorAll('.js-open-popup');

  if (popup && btnsOpenPopup) {
    var popupCloseBtn = popup.querySelector('.js-close-popup');
    var listsOptions = popup.querySelectorAll('.special-popup__list');

    listsOptions.forEach(function (list) {
      var btns = list.querySelectorAll('button');

      btns.forEach(function (btn) {
        btn.addEventListener('click', function (evt) {
          evt.preventDefault();
          btns.forEach(function (btn) {
            btn.classList.remove('active');
          });
          btn.classList.add('active');
        });
      });
    });

    btnsOpenPopup.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();
        popup.classList.remove(hideClass);
      });
    });

    popupCloseBtn.addEventListener('click', function () {
      popup.classList.add(hideClass);
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.const.keyCode.ESC) {
        evt.preventDefault();
        popup.classList.add(hideClass);
      }
    });
  }

})();
