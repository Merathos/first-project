'use strict';


(function () {

  var initializePopup = function (target) {
    var wrap = target.closest('.js-gallery-full-wrap');
    var oldSingleImage = wrap.querySelector('.js-single-image');

    if (oldSingleImage) {
      return;
    }

    var gallery = wrap.querySelector('.js-gallery-full');
    var sourceImage = target.closest('.js-single-image-link');

    var markup = '<button class="gallery-full__btn gallery-full__btn--close js-single-photo-close-btn" type="button"><span class="visually-hidden">Закрыть</span><svg width="16" height="16"><use xlink:href="img/sprite.svg#icon-close"></use></svg></button><div class="gallery-full__image js-single-photo-frame"><img src="' + sourceImage.getAttribute('href') + '"></div>';

    var singleImage = document.createElement('div');
    singleImage.classList.add('project__gallery-full', 'gallery-full', 'opened', 'js-single-image');
    singleImage.innerHTML = markup;

    var openBtn = wrap.querySelector('.button-details');

    if (!openBtn.classList.contains('opened')) {
      window.openAkordeon(openBtn);
    }

    if (gallery) {
      window.galleryInSliderReset(wrap);
      gallery.after(singleImage);
    }
  };

  var onDocumentClick = function (evt) {
    if (evt.target.classList.contains('js-single-image-link')) {
      evt.preventDefault();

      initializePopup(evt.target);
    }

    if (evt.target.closest('.js-single-photo-close-btn')) {
      var btn = evt.target.closest('.js-single-photo-close-btn');
      var singleImage = btn.closest('.js-single-image');
      singleImage.remove();
    }
  };

  document.addEventListener('click', onDocumentClick);
})();
