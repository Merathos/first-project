'use strict';
(function () {
  if (document.querySelector('.confirmation-popup')) {
    var popUp = document.querySelector('.confirmation-popup');
    var popUpBody = popUp.querySelector('.confirmation-popup__body');
    var popUpOpenbtn = document.querySelector('#improvement-submit-btn');
    var popUpClosebtn = popUp.querySelector('.confirmation-popup__close-btn');
    var popUpBackbtn = popUp.querySelector('.confirmation-popup__back-btn');
    var form = document.querySelector('#js-improvement-form');
    var submitFormBtn = form.querySelector('.confirmation-popup__submit-btn');
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
      popUp.classList.add('confirmation-popup--show');
      document.querySelector('body').style.overflow = 'hidden';
      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      popUp.classList.remove('confirmation-popup--show');
      document.querySelector('body').style.overflow = 'visible';
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onSubmitUpdateUserImages = function () {
      var formData = new FormData(form);
      var userImages = window.formDataImages;
      if (userImages.length) {
        formData.delete('user-images');
        userImages.forEach(function (image) {
          formData.append('user-images', image, image.name);
        });
      }
    };

    popUpOpenbtn.addEventListener('click', function () {
      openPopup();
    });

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      onSubmitUpdateUserImages();
    });

    popUpClosebtn.addEventListener('click', closePopup);
    popUpBackbtn.addEventListener('click', closePopup);
    popUp.addEventListener('click', closePopup);
    popUpBody.addEventListener('click', function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    });
  }
})();
