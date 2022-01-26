'use strict';
(function () {
  var modals = document.querySelectorAll('.confirmation-popup[data-modal]');
  if (modals.length) {
    modals.forEach(function (modal) {
      var modalAttr = modal.getAttribute('data-modal');
      var popUpBody = modal.querySelector('.confirmation-popup__body');
      var popUpOpenbtn = document.querySelectorAll('button[data-modal="' + modalAttr + '"]');
      var popUpClosebtn = modal.querySelector('.confirmation-popup__close-btn');
      var popUpBackbtn = modal.querySelector('.confirmation-popup__back-btn');
      var KeyCodes = {
        ESC: 27,
      };

      var isEscEvent = function (evt, action) {
        if (evt.keyCode === KeyCodes.ESC) {
          action();
        }
      };

      var onPopupEscPress = function (evt) {
        isEscEvent(evt, closePopup);
      };

      var openPopup = function () {
        modal.classList.add('confirmation-popup--show');
        document.querySelector('body').style.overflow = 'hidden';
        document.addEventListener('keydown', onPopupEscPress);
      };

      var closePopup = function () {
        modal.classList.remove('confirmation-popup--show');
        document.querySelector('body').style.overflow = 'visible';
        document.removeEventListener('keydown', onPopupEscPress);
      };

      popUpOpenbtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
          openPopup();
        });
      });

      popUpClosebtn.addEventListener('click', closePopup);
      popUpBackbtn.addEventListener('click', closePopup);
      modal.addEventListener('click', closePopup);
      popUpBody.addEventListener('click', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      });
    });
  }
})();
