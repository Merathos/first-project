'use strict';

(function () {
  var popup = document.querySelector('.js-gallery-popup');

  if (!popup) {
    return;
  }

  var hideClass = 'd-none';
  var slider = popup.querySelector('.js-gallery-popup__frame');
  var prevBtn = popup.querySelector('.js-gallery-popup__nav-btn--prev');
  var nextBtn = popup.querySelector('.js-gallery-popup__nav-btn--next');

  var description = popup.querySelector('.js-gallery-popup__photo-description');
  var currentCounter = popup.querySelector('.js-gallery-popup__counter-current');
  var totalCounter = popup.querySelector('.js-gallery-popup__counter-total');
  var popupBarBottom = popup.querySelector('.popup__bar--bottom');

  var swiper = null;

  var resetSlider = function () {
    swiper.destroy();
    slider.innerHTML = '';
  };

  var initializeSlider = function (target) {
    var items = target.parentElement.parentElement.children;
    var currentItemDescription = target.querySelector('.gallery__item-text');

    var sliderTape = document.createElement('div');
    sliderTape.classList.add('swiper-wrapper');

    Array.prototype.forEach.call(items, function (item) {
      var itemPhoto = item.querySelector('.gallery__item');
      var element = itemPhoto.cloneNode(true);
      element.classList.add('swiper-slide');

      sliderTape.appendChild(element);
    });

    slider.appendChild(sliderTape);

    swiper = new window.Swiper(slider, {
      initialSlide: +target.dataset.index,
      slidesPerView: 1,
      watchOverflow: true,

      grabCursor: true,
      loop: true,

      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },

      on: {
        slideChange: function () {
          description.textContent = items[this.realIndex].querySelector('.gallery__item-text').textContent;
          currentCounter.textContent = +this.realIndex + 1;
        }
      }
    });

    description.textContent = currentItemDescription.textContent;
    currentCounter.textContent = +target.dataset.index + 1;
    totalCounter.textContent = items.length;

    if (items.length <= 1) {
      popupBarBottom.classList.add(hideClass);
    }
  };

  var onDocumentClick = function (evt) {
    if (evt.target.classList.contains('js-gallery__item-link')) {
      evt.preventDefault();

      if (swiper) {
        resetSlider();
      }

      window.openPopup(popup);
      initializeSlider(evt.target);
    }
  };

  document.addEventListener('click', onDocumentClick);
})();
