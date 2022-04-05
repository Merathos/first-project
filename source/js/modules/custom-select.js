'use strict';

(function () {
  var Scrollbar = window.Scrollbar;

  var createElement = (template) => {
    var newElement = document.createElement('div');

    newElement.innerHTML = template;

    return newElement.firstChild;
  };

  var renderElement = (container, component, place = 'beforeend') => {
    switch (place) {
      case 'prepend':
        container.prepend(component);
        break;
      case 'afterend':
        container.after(component);
        break;
      case 'beforeend':
        container.append(component);
        break;
    }
  };

  var createNativeOptionsMarkup = (items, activeIndex) => {
    return items
      .map((el, index) => {
        if (activeIndex.length) {
          var currentIndex = activeIndex.find((item) => item === index);
          if (currentIndex === index) {
            return `<option ${el.value ? `value=${el.value}` : ''} selected>${el.text ? `${el.text}` : ''}</option>`;
          } else {
            return `<option ${el.value ? `value=${el.value}` : ''}>${el.text ? `${el.text}` : ''}</option>`;
          }
        } else {
          return `<option ${el.value ? `value=${el.value}` : ''}>${el.text ? `${el.text}` : ''}</option>`;
        }
      })
      .join('\n');
  };

  var createNativeSelectMarkup = ({id, items, multiple, name, required, activeIndex = []}) => {
    return `<select ${id ? `id='${id}'` : ''} ${name ? `name='${name}'` : ''} ${multiple ? 'multiple' : ''} ${
      required ? 'required' : ''
    } tabindex="-1" aria-hidden="true">
              <option value=""></option>
              ${createNativeOptionsMarkup(items, activeIndex)}
            </select>`;
  };

  class CustomSelect {
    constructor() {
      this._selects = null;
      this._selectElement = null;
      this._activeIndex = null;
      this._startText = null;

      this._onDocumentClick = this._onDocumentClick.bind(this);
      this._onEscapePress = this._onEscapePress.bind(this);
      this._onSelectItemClick = this._onSelectItemClick.bind(this);
      this._onSelectItemKeydown = this._onSelectItemKeydown.bind(this);
      this._onLastItemKeydown = this._onLastItemKeydown.bind(this);
      this._onSelectClick = this._onSelectClick.bind(this);
      this._onSelectKeydown = this._onSelectKeydown.bind(this);

      window.selectInit = this.init.bind(this);
    }

    _createMultiString(arr) {
      if (arr.length) {
        return `Выбрано ${arr.length}`;
      }
      return this._startText;
    }

    _setSelectActiveState(multiple, insert, item) {
      var buttonTextBlock = item.querySelector('.custom-select__text');
      var activeItems = item.querySelectorAll('.custom-select__item[aria-selected="true"]');
      var label = item.querySelector('.custom-select__label');
      var str = this._createMultiString(activeItems);

      buttonTextBlock.style.transition = '0s';
      if (label) {
        label.style.transition = '0s';
      }

      setTimeout(() => {
        if (label) {
          label.style.transition = null;
        }
        buttonTextBlock.style.transition = null;
      }, 300);

      if (multiple && insert) {
        item.classList.add('not-empty');
        buttonTextBlock.innerHTML = str;
      } else if (multiple) {
        return;
      } else {
        item.classList.add('not-empty');
        buttonTextBlock.innerHTML = activeItems[0].innerHTML;
      }
    }

    _closeSelect() {
      var activeSelect = document.querySelector('[data-select].is-open');
      document.removeEventListener('click', this._onDocumentClick);
      document.removeEventListener('keydown', this._onEscapePress);
      if (activeSelect) {
        activeSelect.classList.remove('is-open');
      }
    }

    _onSelectElementClickAction(element, index) {
      var parent = element.closest('.custom-select');
      var multiple = parent.dataset.multiple;
      var insert = parent.dataset.insert;
      var buttonTextBlock = parent.querySelector('.custom-select__text');
      var itemText = element.innerText;
      var options = parent.querySelectorAll('option');
      var select = parent.querySelector('select');
      var changeEv = new CustomEvent('change');
      var inputEv = new CustomEvent('input');
      select.dispatchEvent(changeEv);
      select.dispatchEvent(inputEv);
      var form = select.closest('form');

      if (form) {
        var formChangeEv = new CustomEvent('change');
        var formInputEv = new CustomEvent('input');
        form.dispatchEvent(formChangeEv);
        form.dispatchEvent(formInputEv);
      }

      if (multiple) {
        if (insert === 'true') {
          if (element.getAttribute('aria-selected') === 'true') {
            element.setAttribute('aria-selected', 'false');
            var activeItems = parent.querySelectorAll('.custom-select__item[aria-selected="true"]');
            var items = parent.querySelectorAll('.custom-select__item');
            items.forEach((item) => item.classList.remove('has-separator'));
            var notSelectedElement = parent.querySelector(
              '.custom-select__item:not([aria-selected="true"]):not(.is-hidden)',
            );
            if (notSelectedElement && activeItems.length) {
              notSelectedElement.classList.add('has-separator');
            }
            var str = this._createMultiString(activeItems);
            options[index + 1].selected = false;
            buttonTextBlock.innerText = str;
            if (!str) {
              parent.classList.remove('not-empty');
              parent.classList.remove('is-valid');
            }
          } else {
            element.setAttribute('aria-selected', 'true');
            var items = parent.querySelectorAll('.custom-select__item');
            items.forEach((item) => item.classList.remove('has-separator'));
            var notSelectedElement = parent.querySelector(
              '.custom-select__item:not([aria-selected="true"]):not(.is-hidden)',
            );
            if (notSelectedElement) {
              notSelectedElement.classList.add('has-separator');
            }
            var activeItems = parent.querySelectorAll('.custom-select__item[aria-selected="true"]');
            var str = this._createMultiString(activeItems);
            buttonTextBlock.innerText = str;
            parent.classList.add('not-empty');
            parent.classList.add('is-valid');
            options[index + 1].selected = true;
          }
        } else {
          if (element.getAttribute('aria-selected') === 'true') {
            element.setAttribute('aria-selected', 'false');
            options[index + 1].selected = false;
          } else {
            element.setAttribute('aria-selected', 'true');
            options[index + 1].selected = true;
          }
        }
      } else {
        var activeItem = parent.querySelector('.custom-select__item[aria-selected="true"]');
        if (element.getAttribute('aria-selected') === 'true') {
          this._closeSelect();
        } else {
          if (activeItem) {
            activeItem.setAttribute('aria-selected', 'false');
            parent.classList.remove('not-empty');
            parent.classList.remove('is-valid');
          }
          buttonTextBlock.innerText = itemText;
          element.setAttribute('aria-selected', 'true');
          parent.classList.add('not-empty');
          parent.classList.add('is-valid');
          options[index + 1].selected = true;
          this._closeSelect();
        }
      }
    }

    _onDocumentClick({target}) {
      if (!target.closest('.custom-select')) {
        this._closeSelect();
      }
    }

    _onEscapePress(evt) {
      var isEscape = evt.key === 'Escape';
      if (isEscape) {
        this._closeSelect();
      }
    }

    _onSelectItemClick(element, index) {
      this._onSelectElementClickAction(element, index);
    }

    _onSelectItemKeydown(evt, element, index) {
      var isEnter = evt.key === 'Enter';
      if (isEnter) {
        this._onSelectElementClickAction(element, index);
      }
    }

    _onLastItemKeydown(evt) {
      var isTab = evt.key === 'Tab';
      if (isTab) {
        this._closeSelect();
      }
    }

    _onSelectClick(evt) {
      var parent = evt.target.closest('[data-select]');
      var activeSelect = document.querySelector('[data-select].is-open');
      parent.classList.remove('is-invalid');

      if (activeSelect && activeSelect === parent) {
        activeSelect.classList.remove('is-open');
        return;
      }

      if (activeSelect) {
        this._closeSelect();
      }

      document.addEventListener('click', this._onDocumentClick);
      document.addEventListener('keydown', this._onEscapePress);

      if (parent.classList.contains('is-open')) {
        parent.classList.remove('is-open');
      } else {
        parent.classList.add('is-open');
      }
    }

    _onSelectKeydown(evt) {
      var parent = evt.target.closest('[data-select]');
      parent.classList.remove('is-invalid');
      if (evt.shiftKey && evt.key === 'Tab' && parent.closest('.is-open')) {
        this._closeSelect();
      }
    }

    _setActiveSelectItemsState(multiple, selectItems) {
      let flag = true;
      this._activeIndex = [];
      selectItems.forEach((item, index) => {
        if (multiple) {
          if (item.getAttribute('aria-selected') === 'true') {
            this._activeIndex.push(index);
          }
        } else {
          if (item.getAttribute('aria-selected') === 'true' && flag) {
            this._activeIndex.push(index);
            flag = false;
          } else {
            item.setAttribute('aria-selected', 'false');
          }
        }
      });
    }

    _createSelectStructure(item) {
      var nativeSelect = item.querySelector('select');
      this._startText = item.querySelector('.custom-select__text').innerText;
      if (nativeSelect) {
        this._selectElement = null;
        return;
      }
      var options = {};
      options.items = [];
      var multiple = item.dataset.multiple;
      var id = item.dataset.id;
      var name = item.dataset.name;
      var required = item.dataset.required;
      var insert = item.dataset.insert;
      var selectList = item.querySelector('.custom-select__list');
      var selectItems = item.querySelectorAll('.custom-select__item');
      this._setActiveSelectItemsState(multiple, selectItems);

      Scrollbar.init(selectList, {
        continuousScrolling: false,
      });

      if (this._activeIndex.length) {
        options.activeIndex = this._activeIndex;
        this._setSelectActiveState(multiple, insert, item);
      }

      options.name = name || false;
      options.id = id || false;
      options.required = Boolean(required);
      options.multiple = Boolean(multiple);

      selectItems.forEach((selectItem) => {
        var value = selectItem.dataset.selectValue;
        var itemInfo = {};
        itemInfo.text = selectItem.innerText;
        itemInfo.value = value;
        options.items.push(itemInfo);
      });

      renderElement(item, createElement(createNativeSelectMarkup(options)));

      this._selectElement = item;
      this._activeIndex = null;
    }

    _initSearch(select) {
      var searchInput = select.querySelector('.custom-select__search input');
      if (!searchInput) {
        return;
      }
      var selectItems = select.querySelectorAll('.custom-select__item');
      var buttonClean = select.querySelector('.custom-select__search-clean');

      buttonClean.addEventListener('click', () => {
        searchInput.value = '';
        var inputEv = new CustomEvent('input');
        searchInput.dispatchEvent(inputEv);
      });

      searchInput.addEventListener('input', ({target}) => {
        if (target.value) {
          buttonClean.classList.add('is-active');
        } else {
          buttonClean.classList.remove('is-active');
        }

        selectItems.forEach((item) => {
          if (item.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });

        var notHiddenSelectItems = select.querySelectorAll('.custom-select__item:not(.is-hidden)');
        var emptyBox = select.querySelector('.custom-select__empty-box');
        if (emptyBox) {
          if (!notHiddenSelectItems.length) {
            emptyBox.classList.add('is-active');
          } else {
            emptyBox.classList.remove('is-active');
          }
        }

        var items = select.querySelectorAll('.custom-select__item');
        var activeItems = select.querySelectorAll('.custom-select__item[aria-selected="true"]:not(.is-hidden)');
        items.forEach((item) => item.classList.remove('has-separator'));
        var notSelectedElement = select.querySelector('.custom-select__item:not([aria-selected="true"]):not(.is-hidden)');

        if (notSelectedElement && activeItems.length) {
          notSelectedElement.classList.add('has-separator');
        }
      });
    }

    _setSelectAction() {
      if (!this._selectElement) {
        return;
      }
      var button = this._selectElement.querySelector('.custom-select__button');
      var selectItems = this._selectElement.querySelectorAll('.custom-select__item');

      button.addEventListener('click', this._onSelectClick);
      button.addEventListener('keydown', this._onSelectKeydown);

      selectItems.forEach((element, index) => {
        element.addEventListener('click', () => {
          this._onSelectItemClick(element, index);
        });

        element.addEventListener('keydown', (evt) => {
          this._onSelectItemKeydown(evt, element, index);
        });

        if (index === selectItems.length - 1) {
          element.addEventListener('keydown', this._onLastItemKeydown);
        }
      });
    }

    init() {
      this._selects = document.querySelectorAll('[data-select]');
      this._selects.forEach((select) => {
        this._createSelectStructure(select);
        this._initSearch(select);
        this._setSelectAction();
      });
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
      var customSelect = new CustomSelect();
      window.customSelect = customSelect;
      customSelect.init();
    });
  });

  // При добавлении новых селектов без перезагрузки страницы нужно будет вызвать метод  window.customSelect.init();

  console.log();
})();
