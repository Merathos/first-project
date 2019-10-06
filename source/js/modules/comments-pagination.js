'use strict';

(function () {
  var form = document.querySelector('.answers__form');
  if (!form) {
    return;
  }
  var inputCount = form.querySelector('#count-answer');
  var inputContainer = document.querySelector('.answers__count');

  if (!inputCount && !inputContainer) {
    return;
  }

  inputContainer.addEventListener('mouseover', function () {
    inputCount.focus();
  });

  inputContainer.addEventListener('mouseout', function () {
    inputCount.blur();
    inputContainer.classList.remove('answers__count--hover');
  });

  inputCount.oninput = function () {
    inputCount.value = inputCount.value.replace(/[^\+\d]/g, '');
    inputCount.focus();
    inputContainer.classList.add('answers__count--hover');
  };
})();
