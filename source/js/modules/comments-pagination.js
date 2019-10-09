'use strict';

(function () {
  var form = document.querySelector('.answers__form');
  if (!form) {
    return;
  }
  var inputCount = form.querySelector('#count-answer');
  var inputContainer = document.querySelector('.answers__count');
  var countAll = document.querySelector('.answers__all-count');

  if (!inputCount && !inputContainer && !countAll) {
    return;
  }

  inputContainer.addEventListener('mouseover', function () {
    inputCount.focus();
  });

  inputCount.onblur = function () {
    if (inputCount.value < 1) {
      inputCount.value = 1;
    } else if (inputCount.value > +countAll.textContent) {
      inputCount.value = +countAll.textContent;
    }
    inputContainer.classList.remove('answers__count--hover');
  };

  inputCount.onfocus = function () {
    inputContainer.classList.add('answers__count--hover');
  };

  inputCount.oninput = function () {
    inputCount.value = inputCount.value.replace(/[^\+\d]/g, '');
    inputCount.focus();
    inputContainer.classList.add('answers__count--hover');
  };
})();
