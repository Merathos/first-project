'use strict';

(function () {
  var popup = document.querySelector('.js-projects-popup');

  var projectsLink = document.querySelectorAll('.js-projects__item-link');

  //var gallerys = popup.querySelectorAll('.js-gallery-popup');

  var sliderSwiper = function (gallery) {
    return new window.Swiper(gallery, {
      slidesPerView: 'auto',
      spaceBetween: 16,

      breakpoints: {
        320: {
          spaceBetween: 12
        }
      },

      watchOverflow: true,
      grabCursor: true,
      observer: true,
      observerParent: true,
      observeSlideChildren: true,
    });
  };

  var initSliders = function(popupInner) {
    var gallerys = popupInner.querySelectorAll('.js-gallery-in-popup');

    gallerys.forEach(function (gallery) {
      sliderSwiper(gallery);
    });
  };

  if (projectsLink) {
    projectsLink.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.openPopup(popup);

        if (!popup.classList.contains('js-sliders-inited')) {
          initSliders(popup);
        }

        popup.classList.add('js-sliders-inited');
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
