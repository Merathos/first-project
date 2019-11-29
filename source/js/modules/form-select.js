'use strict';


(function () {
  var selects = document.querySelectorAll('.js-form-select select');


  var deselectLabel = '<button type="button"><span class="visually-hidden">Сбросить фильтр по голосам</span><svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 1L11 11M11 1L1 11" stroke-width="2"/></svg></button>';


  var addSelect = function (el) {
    return new window.SlimSelect({
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
  };


  selects.forEach(function (select) {
    var customSelectInstance = addSelect(select);
    var customSelectElement = customSelectInstance.slim.container;

    var selectOptions = select.querySelectorAll('option[value]');
    var customSelectOptions = customSelectElement.querySelectorAll('.ss-option[data-id]');

    setTimeout(function () {
      customSelectElement.setAttribute('title', select.title);

      customSelectOptions.forEach(function (option, i) {
        option.setAttribute('title', selectOptions[i].title);
      });
    }, 100);
  });


  window.addSelect = addSelect;
})();
