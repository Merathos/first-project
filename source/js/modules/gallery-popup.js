'use strict';


(function () {
  var popup = document.querySelector('.gallery-popup');

  if (!popup) {
    return;
  }


  var overlay = popup.querySelector('.popup__overlay');
  var closeBtn = popup.querySelector('.popup__close-btn');

  var slider = popup.querySelector('.swiper-container');
  var prevBtn = popup.querySelector('.gallery-popup__nav-btn--prev');
  var nextBtn = popup.querySelector('.gallery-popup__nav-btn--next');

  var description = popup.querySelector('.gallery-popup__photo-description');
  var currentCounter = popup.querySelector('.gallery-popup__counter-current');
  var totalCounter = popup.querySelector('.gallery-popup__counter-total');

  var swiper = null;


  var closePopup = function () {
    swiper.destroy();
    slider.innerHTML = '';

    bodyScrollLock.enableBodyScroll(popup);
    popup.classList.remove('popup--shown');
  };


  var prepareSlider = function (target) {
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

    swiper = new Swiper(slider, {
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
        },
      }
    });

    description.textContent = currentItemDescription.textContent;
    currentCounter.textContent = +target.dataset.index + 1;
    totalCounter.textContent = items.length;
  };


  var onDocumentClick = function (evt) {
    if (evt.target.classList.contains('gallery__item-link')) {
      evt.preventDefault();

      prepareSlider(evt.target);

      bodyScrollLock.disableBodyScroll(popup);
      popup.classList.add('popup--shown');
    }
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.const.keyCode.ESC && popup.classList.contains('popup--shown')) {
      evt.preventDefault();

      closePopup();
    }
  };


  overlay.addEventListener('click', closePopup);
  closeBtn.addEventListener('click', closePopup);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscPress);
})();
