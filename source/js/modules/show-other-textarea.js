'use strict';

(function () {
  var otherChecboxes = document.querySelectorAll('[data-id="other-checkbox"]');
  var otherRadios = document.querySelectorAll('[data-id="other-radio"]');
  var hideClass = 'hide';

  if (otherChecboxes) {
    otherChecboxes.forEach(function (el) {
      el.addEventListener('change', function (evt) {
        var textarea = evt.target.parentElement.querySelector('.js-other-textarea');
        var target = evt.target;

        if (target.checked) {
          textarea.classList.remove(hideClass);
        } else {
          textarea.classList.add(hideClass);
        }
      });
    });
  }

  if (otherRadios) {
    var selectedRadio = null;

    var showOtherField = function (el) {
      var textarea = el.parentElement.querySelector('.js-other-textarea');
      if (textarea) {
        // eslint-disable-next-line no-unused-expressions
        el === selectedRadio ? textarea.classList.remove(hideClass) : textarea.classList.add(hideClass);
      }
    };

    var hideAllOtherFields = function (radioButtons) {
      radioButtons.forEach(function (button) {
        showOtherField(button);
      });
    };

    otherRadios.forEach(function (el) {
      var radioName = el.getAttribute('name');
      var radios = document.querySelectorAll('[name="' + radioName + '"]');
      radios.forEach(function (radio) {
        radio.addEventListener('change', function () {
          selectedRadio = radio;
          showOtherField(radio);
          hideAllOtherFields(radios);
        });
      });
    });
  }
})();
