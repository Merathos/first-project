'use strict';

(function () {
  var Scrollbar = window.Scrollbar;

  const createElement = (template) => {
    const newElement = document.createElement('div');

    newElement.innerHTML = template;

    return newElement.firstChild;
  };

  const renderElement = (container, component, place = 'beforeend') => {
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

  const createNativeOptionsMarkup = (items, activeIndex) => {
    return items.map((el, index) => {
      if (activeIndex.length) {
        const currentIndex = activeIndex.find((item) => item === index);
        if (currentIndex === index) {
          return `<option ${el.value ? `value=${el.value}` : ''} selected>${el.text ? `${el.text}` : ''}</option>`;
        } else {
          return `<option ${el.value ? `value=${el.value}` : ''}>${el.text ? `${el.text}` : ''}</option>`;
        }
      } else {
        return `<option ${el.value ? `value=${el.value}` : ''}>${el.text ? `${el.text}` : ''}</option>`;
      }
    }).join('\n');
  };

  const createNativeSelectMarkup = ({id, items, multiple, name, required, activeIndex = []}) => {
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
      const buttonTextBlock = item.querySelector('.custom-select__text');
      const activeItems = item.querySelectorAll('.custom-select__item[aria-selected="true"]');
      const label = item.querySelector('.custom-select__label');
      const str = this._createMultiString(activeItems);

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
      const activeSelect = document.querySelector('[data-select].is-open');
      document.removeEventListener('click', this._onDocumentClick);
      document.removeEventListener('keydown', this._onEscapePress);
      if (activeSelect) {
        activeSelect.classList.remove('is-open');
      }
    }

    _onSelectElementClickAction(element, index) {
      const parent = element.closest('.custom-select');
      const multiple = parent.dataset.multiple;
      const insert = parent.dataset.insert;
      const buttonTextBlock = parent.querySelector('.custom-select__text');
      const itemText = element.innerText;
      const options = parent.querySelectorAll('option');
      const select = parent.querySelector('select');
      const changeEv = new CustomEvent('change');
      const inputEv = new CustomEvent('input');
      select.dispatchEvent(changeEv);
      select.dispatchEvent(inputEv);
      const form = select.closest('form');

      if (form) {
        const formChangeEv = new CustomEvent('change');
        const formInputEv = new CustomEvent('input');
        form.dispatchEvent(formChangeEv);
        form.dispatchEvent(formInputEv);
      }

      if (multiple) {
        if (insert === 'true') {
          if (element.getAttribute('aria-selected') === 'true') {
            element.setAttribute('aria-selected', 'false');
            const activeItems = parent.querySelectorAll('.custom-select__item[aria-selected="true"]');
            const items = parent.querySelectorAll('.custom-select__item');
            items.forEach((item) => item.classList.remove('has-separator'));
            const notSelectedElement = parent.querySelector('.custom-select__item:not([aria-selected="true"])');
            if (notSelectedElement) {
              notSelectedElement.classList.add('has-separator');
            }
            const str = this._createMultiString(activeItems);
            options[index + 1].selected = false;
            buttonTextBlock.innerText = str;
            if (!str) {
              parent.classList.remove('not-empty');
              parent.classList.remove('is-valid');
            }
          } else {
            element.setAttribute('aria-selected', 'true');
            const items = parent.querySelectorAll('.custom-select__item');
            items.forEach((item) => item.classList.remove('has-separator'))
            const notSelectedElement = parent.querySelector('.custom-select__item:not([aria-selected="true"])');
            if (notSelectedElement) {
              notSelectedElement.classList.add('has-separator');
            }
            const activeItems = parent.querySelectorAll('.custom-select__item[aria-selected="true"]');
            const str = this._createMultiString(activeItems);
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
        const activeItem = parent.querySelector('.custom-select__item[aria-selected="true"]');
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
      const isEscape = evt.key === 'Escape';
      if (isEscape) {
        this._closeSelect();
      }
    }

    _onSelectItemClick(element, index) {
      this._onSelectElementClickAction(element, index);
    }

    _onSelectItemKeydown(evt, element, index) {
      const isEnter = evt.key === 'Enter';
      if (isEnter) {
        this._onSelectElementClickAction(element, index);
      }
    }

    _onLastItemKeydown(evt) {
      const isTab = evt.key === 'Tab';
      if (isTab) {
        this._closeSelect();
      }
    }

    _onSelectClick(evt) {
      const parent = evt.target.closest('[data-select]');
      const activeSelect = document.querySelector('[data-select].is-open');
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
      const parent = evt.target.closest('[data-select]');
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
      const nativeSelect = item.querySelector('select');
      this._startText = item.querySelector('.custom-select__text').innerText;
      if (nativeSelect) {
        this._selectElement = null;
        return;
      }
      const options = {};
      options.items = [];
      const multiple = item.dataset.multiple;
      const id = item.dataset.id;
      const name = item.dataset.name;
      const required = item.dataset.required;
      const insert = item.dataset.insert;
      const selectList = item.querySelector('.custom-select__list');
      const selectItems = item.querySelectorAll('.custom-select__item');
      this._setActiveSelectItemsState(multiple, selectItems);

      Scrollbar.init((selectList), {
        continuousScrolling: false
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
        const value = selectItem.dataset.selectValue;
        const itemInfo = {};
        itemInfo.text = selectItem.innerText;
        itemInfo.value = value;
        options.items.push(itemInfo);
      });

      renderElement(item, createElement(createNativeSelectMarkup(options)));

      this._selectElement = item;
      this._activeIndex = null;
    }

    _initSearch(select) {
      const searchInput = select.querySelector('.custom-select__search input');
      if (!searchInput) {
        return;
      }

      const selectItems = select.querySelectorAll('.custom-select__item');

      searchInput.addEventListener('input', () => {
        selectItems.forEach((item) => {
          if (item.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    }

    _setSelectAction() {
      if (!this._selectElement) {
        return;
      }
      const button = this._selectElement.querySelector('.custom-select__button');
      const selectItems = this._selectElement.querySelectorAll('.custom-select__item');

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
      const customSelect = new CustomSelect();
      window.customSelect = customSelect;
      customSelect.init();
    });
  });

  // При добавлении новых селектов без перезагрузки страницы нужно будет вызвать метод  window.customSelect.init();

  console.log();

})();
