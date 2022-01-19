'use strict';

(function () {
  var popup = document.querySelector('.js-projects-popup');

  // var projectsLink = document.querySelector('.js-projects__item-link');

  // if (projectsLink) {
  //   projectsLink.addEventListener('click', function (evt) {
  //     evt.preventDefault();
  //     window.openPopup(popup);
  //   });
  // }

  var projectsLink = document.querySelectorAll('.js-projects__item-link');

  if (projectsLink) {
    projectsLink.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.openPopup(popup);
      });
    });
  }

  window.openPopup = function (p) {
    window.bodyScrollLock.disableBodyScroll(p);
    p.classList.add('popup--shown');
  };

  var closePopup = function (p) {
    window.bodyScrollLock.enableBodyScroll(p);
    p.classList.remove('popup--shown');
  };

  var onEscPress = function (evt, p) {
    if (evt.keyCode === window.const.keyCode.ESC && p.classList.contains('popup--shown')) {
      evt.preventDefault();

      closePopup(p);
    }
  };

  // popup.forEach(function (p) {
  if (popup) {
    var overlay = popup.querySelector('.js-popup__overlay');
    var closeBtn = popup.querySelector('.js-popup__close-btn');

    if (overlay) {
      overlay.addEventListener('click', function () {
        closePopup(popup);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closePopup(popup);
      });
    }
  }

  document.addEventListener('keydown', function (evt) {
    onEscPress(evt, popup);
  });
  // });
})();
