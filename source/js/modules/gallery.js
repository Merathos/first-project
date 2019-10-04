'use strict';


(function () {
  var galleries = document.querySelectorAll('.gallery');

  if (!galleries.length) {
    return;
  }


  var ITEM_WIDTH = 135;


  galleries.forEach(function (gallery) {
    var previews = gallery.querySelectorAll('.gallery__item-link');

    previews.forEach(function (preview, i) {
      preview.dataset.index = i;
    });

    new Swiper(gallery, {
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
  });
})();
