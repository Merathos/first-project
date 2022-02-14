'use strict';


(function () {
  var galleries = document.querySelectorAll('.js-gallery');

  if (!galleries.length) {
    return;
  }

  var sliderSwiper = function (gallery) {
    var swiper = new window.Swiper(gallery, {
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

    gallery.swiper = swiper;

    return swiper;
  };


  var initSlider = function (gallery) {
    var previews = gallery.querySelectorAll('.js-gallery__item-link');

    previews.forEach(function (preview, i) {
      preview.dataset.index = i;
    });

    sliderSwiper(gallery);

    gallery.classList.add('is-inited');
  };


  galleries.forEach(function (gallery) {
    initSlider(gallery);
  });


  window.initSlider = initSlider;
})();
