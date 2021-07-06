'use strict';


(function () {
  var galleries = document.querySelectorAll('.js-gallery');

  if (!galleries.length) {
    return;
  }

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
      grabCursor: true
    });
  };


  galleries.forEach(function (gallery) {
    var previews = gallery.querySelectorAll('.js-gallery__item-link');

    previews.forEach(function (preview, i) {
      preview.dataset.index = i;
      console.log(preview.dataset)
    });

    sliderSwiper(gallery);
  });
})();
