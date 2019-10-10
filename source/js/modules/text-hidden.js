'use strict';

(function () {
  var textContainers = document.querySelectorAll('.text-hidden');
  if (!textContainers.length) {
    return;
  }

  Array.prototype.forEach.call(textContainers, function (textContainer) {
    var btnTextOpen = textContainer.querySelector('.text-hidden__btn');
    var btnText = textContainer.querySelector('.text-hidden__btn span');
    var text = textContainer.querySelector('.text-hidden__container');
    var btnContainer = textContainer.querySelector('.answers__button-wrapper');
    if (!btnTextOpen && !text && !btnContainer) {
      return;
    }
    btnTextOpen.addEventListener('click', function (evt) {
      evt.preventDefault();
      btnTextOpen.classList.toggle('text-hidden__btn--open');
      text.classList.toggle('text-hidden__container--open');
      btnContainer.classList.toggle('answers__button-wrapper--open');
      btnText.textContent = btnText.textContent === 'Развернуть' ? 'Свернуть' : 'Развернуть';
    });
  });
})();
