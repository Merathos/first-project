'use strict';

(function () {
  var HEIGHT = 54;

  window.openText = function (textContainers) {
    Array.prototype.forEach.call(textContainers, function (textContainer) {
      var btnTextOpen = textContainer.querySelector('.js-text-hidden__btn');
      var btnText = btnTextOpen.querySelector('span');
      var text = textContainer.querySelector('.text-hidden__container');
      var btnContainer = textContainer.querySelector('.text-hidden__btn-wrapper');
      if (!btnTextOpen && !text && !btnContainer) {
        return;
      }
      if (text.scrollHeight > HEIGHT) {
        text.classList.add('text-hidden__container--close');
        btnTextOpen.addEventListener('click', function (evt) {
          evt.preventDefault();
          btnTextOpen.classList.toggle('text-hidden__btn--open');
          text.classList.toggle('text-hidden__container--close');
          btnContainer.classList.toggle('text-hidden__btn-wrapper--open');
          btnText.textContent = btnText.textContent === 'Развернуть' ? 'Свернуть' : 'Развернуть';
        });
      } else {
        btnContainer.classList.add('text-hidden__btn-wrapper--hidden');
      }
    });
  };

  var discTextContainers = document.querySelectorAll('.answers__discussion-col.js-text-hidden');
  if (discTextContainers.length) {
    window.openText(discTextContainers);
  }

})();
