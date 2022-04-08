'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Scrollbar = window.Scrollbar;

  var createElement = function createElement(template) {
    var newElement = document.createElement('div');

    newElement.innerHTML = template;

    return newElement.firstChild;
  };

  var renderElement = function renderElement(container, component) {
    var place = arguments.length <= 2 || arguments[2] === undefined ? 'beforeend' : arguments[2];

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

  var returnDataset = function returnDataset(dataset) {
    var string = '';

    for (var el in dataset) {
      string += el + '="' + dataset[el] + '" ';
    }

    return string;
  };

  var createNativeOptionsMarkup = function createNativeOptionsMarkup(items, activeIndex) {
    return items.map(function (el, index) {
      returnDataset(el.datasetBackend);
      if (activeIndex.length) {
        var currentIndex = activeIndex.find(function (item) {
          return item === index;
        });
        if (currentIndex === index) {
          return '<option ' + (el.value ? 'value=' + el.value : '') + ' ' + returnDataset(el.datasetBackend) + ' selected>' + (el.text ? '' + el.text : '') + '</option>';
        } else {
          return '<option ' + (el.value ? 'value=' + el.value : '') + ' ' + returnDataset(el.datasetBackend) + '>' + (el.text ? '' + el.text : '') + '</option>';
        }
      } else {
        return '<option ' + (el.value ? 'value=' + el.value : '') + ' ' + returnDataset(el.datasetBackend) + '>' + (el.text ? '' + el.text : '') + '</option>';
      }
    }).join('\n');
  };

  var createNativeSelectMarkup = function createNativeSelectMarkup(_ref) {
    var id = _ref.id;
    var items = _ref.items;
    var multiple = _ref.multiple;
    var name = _ref.name;
    var required = _ref.required;
    var _ref$activeIndex = _ref.activeIndex;
    var activeIndex = _ref$activeIndex === undefined ? [] : _ref$activeIndex;

    return '<select ' + (id ? 'id=\'' + id + '\'' : '') + ' ' + (name ? 'name=\'' + name + '\'' : '') + ' ' + (multiple ? 'multiple' : '') + ' ' + (required ? 'required' : '') + ' tabindex="-1" aria-hidden="true">\n              <option value=""></option>\n              ' + createNativeOptionsMarkup(items, activeIndex) + '\n            </select>';
  };

  var CustomSelect = function () {
    function CustomSelect() {
      _classCallCheck(this, CustomSelect);

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

    _createClass(CustomSelect, [{
      key: '_createMultiString',
      value: function _createMultiString(arr) {
        if (arr.length) {
          return 'Выбрано ' + arr.length;
        }
        return this._startText;
      }
    }, {
      key: '_setSelectActiveState',
      value: function _setSelectActiveState(multiple, insert, item) {
        var buttonTextBlock = item.querySelector('.custom-select__text');
        var activeItems = item.querySelectorAll('.custom-select__item[aria-selected="true"]');
        var label = item.querySelector('.custom-select__label');
        var str = this._createMultiString(activeItems);

        buttonTextBlock.style.transition = '0s';
        if (label) {
          label.style.transition = '0s';
        }

        setTimeout(function () {
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
    }, {
      key: '_closeSelect',
      value: function _closeSelect() {
        var activeSelect = document.querySelector('[data-select].is-open');
        document.removeEventListener('click', this._onDocumentClick);
        document.removeEventListener('keydown', this._onEscapePress);
        if (activeSelect) {
          activeSelect.classList.remove('is-open');
        }
      }
    }, {
      key: '_onSelectElementClickAction',
      value: function _onSelectElementClickAction(element, index) {
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
              items.forEach(function (item) {
                return item.classList.remove('has-separator');
              });
              var notSelectedElement = parent.querySelector('.custom-select__item:not([aria-selected="true"]):not(.is-hidden)');
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
              var _items = parent.querySelectorAll('.custom-select__item');
              _items.forEach(function (item) {
                return item.classList.remove('has-separator');
              });
              var _notSelectedElement = parent.querySelector('.custom-select__item:not([aria-selected="true"]):not(.is-hidden)');
              if (_notSelectedElement) {
                _notSelectedElement.classList.add('has-separator');
              }
              var _activeItems = parent.querySelectorAll('.custom-select__item[aria-selected="true"]');
              var _str = this._createMultiString(_activeItems);
              buttonTextBlock.innerText = _str;
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
    }, {
      key: '_onDocumentClick',
      value: function _onDocumentClick(_ref2) {
        var target = _ref2.target;

        if (!target.closest('.custom-select')) {
          this._closeSelect();
        }
      }
    }, {
      key: '_onEscapePress',
      value: function _onEscapePress(evt) {
        var isEscape = evt.key === 'Escape';
        if (isEscape) {
          this._closeSelect();
        }
      }
    }, {
      key: '_onSelectItemClick',
      value: function _onSelectItemClick(element, index) {
        this._onSelectElementClickAction(element, index);
      }
    }, {
      key: '_onSelectItemKeydown',
      value: function _onSelectItemKeydown(evt, element, index) {
        var isEnter = evt.key === 'Enter';
        if (isEnter) {
          this._onSelectElementClickAction(element, index);
        }
      }
    }, {
      key: '_onLastItemKeydown',
      value: function _onLastItemKeydown(evt) {
        var isTab = evt.key === 'Tab';
        if (isTab) {
          this._closeSelect();
        }
      }
    }, {
      key: '_onSelectClick',
      value: function _onSelectClick(evt) {
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
    }, {
      key: '_onSelectKeydown',
      value: function _onSelectKeydown(evt) {
        var parent = evt.target.closest('[data-select]');
        parent.classList.remove('is-invalid');
        if (evt.shiftKey && evt.key === 'Tab' && parent.closest('.is-open')) {
          this._closeSelect();
        }
      }
    }, {
      key: '_setActiveSelectItemsState',
      value: function _setActiveSelectItemsState(multiple, selectItems) {
        var _this = this;

        var flag = true;
        this._activeIndex = [];
        selectItems.forEach(function (item, index) {
          if (multiple) {
            if (item.getAttribute('aria-selected') === 'true') {
              _this._activeIndex.push(index);
            }
          } else {
            if (item.getAttribute('aria-selected') === 'true' && flag) {
              _this._activeIndex.push(index);
              flag = false;
            } else {
              item.setAttribute('aria-selected', 'false');
            }
          }
        });
      }
    }, {
      key: '_createSelectStructure',
      value: function _createSelectStructure(item) {
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

        selectItems.forEach(function (selectItem) {
          // console.log(selectItem.attributes)
          var datasetBackend = {};
          selectItem.attributes.forEach(function (f) {
            // console.log(f.name.startsWith('data'))
            // console.log(JSON.stringify(f))
            // if (reg.test(attr[j].name)) {
            //   arr.push(el);
            // }
            // console.log(f.startsWith('data'))
            if (f.name.startsWith('data')) {
              datasetBackend[f.name] = f.value;
            }
          });
          var value = selectItem.dataset.selectValue;
          var itemInfo = {};
          // const dataset1 = selectItem.dataset;
          itemInfo.text = selectItem.innerText;
          itemInfo.value = value;
          itemInfo.datasetBackend = datasetBackend;
          options.items.push(itemInfo);
        });

        renderElement(item, createElement(createNativeSelectMarkup(options)));

        this._selectElement = item;
        this._activeIndex = null;
      }
    }, {
      key: '_initSearch',
      value: function _initSearch(select) {
        var searchInput = select.querySelector('.custom-select__search input');
        if (!searchInput) {
          return;
        }
        var selectItems = select.querySelectorAll('.custom-select__item');
        var buttonClean = select.querySelector('.custom-select__search-clean');

        buttonClean.addEventListener('click', function () {
          searchInput.value = '';
          var inputEv = new CustomEvent('input');
          searchInput.dispatchEvent(inputEv);
        });

        searchInput.addEventListener('input', function (_ref3) {
          var target = _ref3.target;

          if (target.value) {
            buttonClean.classList.add('is-active');
          } else {
            buttonClean.classList.remove('is-active');
          }

          selectItems.forEach(function (item) {
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
          items.forEach(function (item) {
            return item.classList.remove('has-separator');
          });
          var notSelectedElement = select.querySelector('.custom-select__item:not([aria-selected="true"]):not(.is-hidden)');

          if (notSelectedElement && activeItems.length) {
            notSelectedElement.classList.add('has-separator');
          }
        });
      }
    }, {
      key: '_setSelectAction',
      value: function _setSelectAction() {
        var _this2 = this;

        if (!this._selectElement) {
          return;
        }
        var button = this._selectElement.querySelector('.custom-select__button');
        var selectItems = this._selectElement.querySelectorAll('.custom-select__item');

        button.addEventListener('click', this._onSelectClick);
        button.addEventListener('keydown', this._onSelectKeydown);

        selectItems.forEach(function (element, index) {
          element.addEventListener('click', function () {
            _this2._onSelectItemClick(element, index);
          });

          element.addEventListener('keydown', function (evt) {
            _this2._onSelectItemKeydown(evt, element, index);
          });

          if (index === selectItems.length - 1) {
            element.addEventListener('keydown', _this2._onLastItemKeydown);
          }
        });
      }
    }, {
      key: 'init',
      value: function init() {
        var _this3 = this;

        this._selects = document.querySelectorAll('[data-select]');
        this._selects.forEach(function (select) {
          _this3._createSelectStructure(select);
          _this3._initSearch(select);
          _this3._setSelectAction();
        });
      }
    }]);

    return CustomSelect;
  }();

  window.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
      var customSelect = new CustomSelect();
      window.customSelect = customSelect;
      customSelect.init();
    });
  });

  // При добавлении новых селектов без перезагрузки страницы нужно будет вызвать метод  window.customSelect.init();

  console.log();
})();
