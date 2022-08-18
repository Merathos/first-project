'use strict';


(function () {
  var selects = document.querySelectorAll('.js-multiple-select');

  var addMultipleSelect = function (el) {

    var multipleSelectInstance = new window.SlimSelect({
      select: el,
      showSearch: false,
      showContent: 'down',
      allowDeselectOption: true,
      closeOnSelect: false,
      placeholder: el.dataset.placeholderText ? el.dataset.placeholderText : '',

      allowDeselect: el.dataset.deselect ? true : false,

      afterOpen: function () {
        window.Scrollbar.init(selectContainer.querySelector('.ss-content'), {
          continuousScrolling: false
        });
      },

      beforeOpen: function () {
        var target = multipleSelectInstance.slim.container;
        var number = multipleSelectInstance.slim.content.querySelectorAll('.ss-option:not(.ss-hide)').length;
        target.classList.remove('two-column', 'three-column');

        if (number > 8 && number <= 15) {
          target.classList.add('two-column');
        }
        if (number > 14 && number <= 21) {
          target.classList.add('three-column');
        }
        if (number > 21) {
          target.classList.add('three-column');
          target.classList.add('fixed-height');
        }

        calcWidthBasedOnPosition();
      },

      afterClose: function () {
        window.Scrollbar.destroy(selectContainer.querySelector('.ss-content'));
        removeCalculatedWidth();
        multipleSelectInstance.select.element.closest('form').submit();
      },

      onChange: function () {
        selectChangeHandler();
      }
    });

    var selectContainer = multipleSelectInstance.slim.container;

    var selectChangeHandler = function () {
      toggleDeselectAllButton();
      updateCounter();
    };

    var calcWidthBasedOnPosition = function () {
      var COL_WIDTH = 312;
      var menu = selectContainer.querySelector('.ss-content');
      var x = menu.getBoundingClientRect().x;
      var width = menu.getBoundingClientRect().width;
      var viewportWidth = window.innerWidth;

      var currentColNumber = getComputedStyle(selectContainer).getPropertyValue('--colNum');
      var rightGapWidth = viewportWidth - (x + width);

      if (rightGapWidth >= 16) {
        return;
      }

      if (!rightGapWidth - COL_WIDTH) {
        selectContainer.setAttribute('style', '--colNum:' + (currentColNumber - 1));
        return;
      }

      if (!rightGapWidth - COL_WIDTH * 2) {
        selectContainer.setAttribute('style', '--colNum:' + (currentColNumber - 2));
        return;
      }
    };

    var removeCalculatedWidth = function () {
      selectContainer.removeAttribute('style');
    };

    var createDeselectAllButton = function () {
      var button = document.createElement('button');
      button.classList.add('ss-deselect-all');
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        multipleSelectInstance.set([]);
      });
      return button;
    };

    var toggleDeselectAllButton = function () {
      if (multipleSelectInstance.selected().length) {
        selectContainer.querySelector('.ss-add').classList.remove('ss-empty');
      } else {
        selectContainer.querySelector('.ss-add').classList.add('ss-empty');
      }
    };

    var updateCounter = function () {
      if (multipleSelectInstance.selected().length) {
        selectContainer.querySelector('.ss-plus').textContent = 'Категорий выбрано: ' + multipleSelectInstance.selected().length;
      } else {
        selectContainer.querySelector('.ss-plus').textContent = el.dataset.placeholderText;
      }
    };

    var createArrow = function () {
      var parent = document.createElement('div');
      parent.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.9833 12L8 7.02703L3.01667 12L1.5 10.4865L8 4L14.5 10.4865L12.9833 12Z" fill="#0E4CD3"/></svg>';
      return parent.children[0];
    };

    selectContainer.querySelector('.ss-add').classList.add('ss-empty');
    selectContainer.querySelector('.ss-add').prepend(createDeselectAllButton());
    selectContainer.querySelector('.ss-add').appendChild(createArrow());
    selectContainer.querySelector('.ss-plus').textContent = el.dataset.placeholderText;

    selectChangeHandler();

    return multipleSelectInstance;
  };

  selects.forEach(function (select) {
    addMultipleSelect(select);
  });

  window.addMultipleSelect = addMultipleSelect;
})();
