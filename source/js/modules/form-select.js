'use strict';


(function () {
  var selects = document.querySelectorAll('.js-form-select select');


  var deselectLabel = '<button type="button"><span class="visually-hidden">Сбросить фильтр по голосам</span><svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 1L11 11M11 1L1 11" stroke-width="2"/></svg></button>';


  var addSelect = function (el) {
    var customSelectInstance = new window.SlimSelect({
      select: el,
      showSearch: false,
      showContent: 'down',

      placeholder: el.dataset.placeholderText ? el.dataset.placeholderText : '',

      allowDeselect: el.dataset.deselect ? true : false,
      deselectLabel: deselectLabel,

      afterClose: function () {
        window.Scrollbar.destroy(document.querySelector('.form-select .ss-list'));
      },

      afterOpen: function () {
        window.Scrollbar.init(document.querySelector('.form-select .ss-list'), {
          continuousScrolling: false
        });
      },
    });

    var customSelectElement = customSelectInstance.slim.container;

    var selectOptions = el.querySelectorAll('option[title]');
    var customSelectOptions = customSelectElement.querySelectorAll('.ss-option[data-id]');

    customSelectElement.setAttribute('title', el.title);

    selectOptions.forEach(function (option, i) {
      customSelectOptions[i].setAttribute('title', option.title);
    });

    return customSelectInstance;
  };


  selects.forEach(function (select) {
    addSelect(select);
  });


  window.addSelect = addSelect;
})();
