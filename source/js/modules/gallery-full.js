'use strict';


(function () {
  var initializeSlider = function (target) {
    var wrap = target.closest('.js-gallery-full-wrap');

    if (!wrap) {
      return;
    }

    var items = wrap.querySelectorAll('.gallery__tape .swiper-slide');

    var gallery = wrap.querySelector('.js-gallery-full');
    gallery.classList.remove('hidden');

    var slider = wrap.querySelector('.js-gallery-full-frame');
    var prevBtn = wrap.querySelector('.js-gallery-full-prev');
    var nextBtn = wrap.querySelector('.js-gallery-full-next');

    var sliderTape = document.createElement('div');
    sliderTape.classList.add('swiper-wrapper');

    Array.prototype.forEach.call(items, function (item) {
      var itemPhoto = item.querySelector('.gallery__item');
      var element = itemPhoto.cloneNode(true);
      element.querySelector('.gallery__item-img').src = item.querySelector('.gallery__item-link').href;
      element.classList.remove('gallery__item');
      element.classList.add('swiper-slide');
      element.classList.add('gallery-full__item');

      sliderTape.appendChild(element);
    });

    slider.appendChild(sliderTape);

    wrap.swiper = new window.Swiper(slider, {
      initialSlide: +target.dataset.index,
      slidesPerView: 1,
      watchOverflow: true,
      observer: true,
      observerParent: true,
      spaceBetween: 16,

      grabCursor: true,
      loop: true,

      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },

      on: {
        slideChange: function () {
          var currentActiveSlide = wrap.querySelector('.js-full-gallery-link.active');
          var newActiveLink = wrap.querySelector('.js-full-gallery-link[data-index="' + this.realIndex + '"]');

          if (currentActiveSlide) {
            currentActiveSlide.classList.remove('active');
          }

          if (newActiveLink) {
            newActiveLink.classList.add('active');
          }
        }
      }
    });

    var singleImage = wrap.querySelector('.js-single-image');

    if (singleImage) {
      singleImage.remove();
    }
  };

  var resetSlider = function (wrap) {
    var gallery = wrap.querySelector('.js-gallery-full');
    var slider = wrap.querySelector('.js-gallery-full-frame');
    var currentActiveSlide = wrap.querySelector('.js-full-gallery-link.active');

    if (wrap.swiper) {
      wrap.swiper.destroy();
      wrap.swiper = null;
    }

    if (slider) {
      slider.innerHTML = '';
    }

    if (gallery) {
      gallery.classList.add('hidden');
    }

    if (currentActiveSlide) {
      currentActiveSlide.classList.remove('active');
    }
  };

  var onDocumentClick = function (evt) {
    var galleryLink = evt.target.closest('.js-full-gallery-link');
    var closeBtn = evt.target.closest('.js-gallery-full-close-btn');
    var wrap = evt.target.closest('.js-gallery-full-wrap');

    if (galleryLink) {
      evt.preventDefault();

      if (wrap.swiper) {
        wrap.swiper.slideToLoop(+galleryLink.dataset.index);
      } else {
        initializeSlider(evt.target);
      }
    }

    if (closeBtn) {
      resetSlider(wrap);
    }
  };

  document.addEventListener('click', onDocumentClick);
  window.galleryInSliderReset = resetSlider;
})();
