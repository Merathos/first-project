'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var selectItems = document.querySelectorAll('.form-select');
  if (!selectItems.length) {
    return;
  }


  Array.prototype.forEach.call(selectItems, function (selectItem) {
    var dropdown = selectItem.querySelector('.form-select__group');
    var trigger =selectItem.querySelector('.form-select__title');
    var options = selectItem.querySelectorAll('.form-select__option');

    if (!dropdown && !trigger && !options.length) {
      return;
    }

    function select(element) {
      var value = element.getAttribute('data-value');
      var nodes = element.parentNode.childNodes;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] instanceof HTMLParagraphElement) {
          if (value == nodes[i].getAttribute('data-value')) {
            nodes[i].classList.add('form-select__option--active');
          }
          else {
            nodes[i].classList.remove('form-select__option--active');
          }
        }
      }
      document.getElementById('project_select-active').value = value;
      selectItem.querySelector('.form-select__title-text').textContent = value;
      if (dropdown.classList.contains('form-select__group--active')) {
        dropdown.classList.remove('form-select__group--active');
      }
      if (trigger.classList.contains('form-select__title--open')) {
        trigger.classList.remove('form-select__title--open');
      }
    }

    function onEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        close();
      }
    }

    function close() {
      if (dropdown.classList.contains('form-select__group--active')) {
        dropdown.classList.remove('form-select__group--active');
      }
      if (trigger.classList.contains('form-select__title--open')) {
        trigger.classList.remove('form-select__title--open');
      }
    }

    document.addEventListener('keydown', onEscPress);

    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target === trigger) {
        evt.preventDefault();
        dropdown.classList.toggle('form-select__group--active');
        trigger.classList.toggle('form-select__title--open');
      } else {
        Array.prototype.forEach.call(options, function (item) {
          if (target === item) {
            select(item);
          } else {
            close();
          }
        });
      }
    });

    var scrollContainer = selectItem.querySelector('.form-select__scrollbar-content');

    if (scrollContainer) {
      window.Scrollbar.init(scrollContainer, options);
    }
  });
})();
