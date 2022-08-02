'use strict';


(function () {
  var galleries = document.querySelectorAll('.js-gallery-with-thumbs');

  if (!galleries.length) {
    return;
  }

  var initSliderWithThumbs = function (gallery) {
    var singleGalleries = gallery.querySelectorAll('.gallery-with-thumbs__gallery');
    singleGalleries.forEach(function (el) {
      var mainSlider = el.querySelector('.js-main-gallery');
      var thumbsSlider = el.querySelector('.js-thumbs-gallery');

      if (thumbsSlider && mainSlider) {
        var swiperThumbs = new window.Swiper(thumbsSlider, {
          slidesPerView: 5,
          spaceBetween: singleGalleries.length > 1 ? 8 : 12,
          breakpoints: {
            320: {
              spaceBetween: 12
            }
          },
          watchOverflow: true,
          grabCursor: true,
          autoHeight: false
        });

        var swiperMain = new window.Swiper(mainSlider, {
          slidesPerView: 1,
          spaceBetween: 16,
          autoHeight: false,
          thumbs: {
            swiper: swiperThumbs,
          },
        });
      }
    })
  };

  galleries.forEach(function (gallery) {
    initSliderWithThumbs(gallery)
  });


  window.initSliderWithThumbs = initSliderWithThumbs;
})();
