'use strict';

(function() {
  var otherInputs = document.querySelectorAll('[data-id="other-input"]');
  var hideClass = 'hide';

  var radioArr = [];

  function onChangeToggleTextareaVisibility(evt) {
    var textarea = evt.target.parentElement.querySelector('.js-other-textarea');
    var target = evt.target;

    if (target) {
      textarea.classList.toggle(hideClass);
    }
  }

  function onClickToggleTextareaVisibility(evt) {
    var target = evt.target;
    var textarea = evt.target.parentElement.parentElement.querySelector('.js-other-textarea');

    if (target.nodeName === 'TEXTAREA') { return; }

    if (target.dataset.id === 'other-input') {
      textarea.classList.toggle(hideClass);
    }
  }

  if (otherInputs) {
    otherInputs.forEach(function(el) {

      if (el.getAttribute("type") == 'radio') {
        radioArr.push(el);
      } else {
        el.addEventListener('change', onChangeToggleTextareaVisibility);
      }

      radioArr.forEach(function(el) {
        el.parentElement.parentElement.addEventListener('click', onClickToggleTextareaVisibility);
      });
    });
  }
})();
