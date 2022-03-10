'use strict';
var initChoices = function () {
  var selectItems = document.querySelectorAll('._select');
  if (selectItems.length > 0) {
    selectItems.forEach(function (item) {
      new Choices(item, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        placeholder: true,
        placeholderValue: 'Выберите из списка',
      });
    });
  }

  var selectItemSearch = document.querySelectorAll('._select-search');
  if (selectItemSearch.length > 0) {
    selectItemSearch.forEach(function (item) {
      new Choices(item, {
        searchEnabled: true,
        itemSelectText: '',
        shouldSort: false,
        placeholder: true,
        placeholderValue: 'Выберите из списка',
        noResultsText: 'Ни чего не найдено',
        searchPlaceholderValue: 'Начните вводить текст',
      });
    });
  }
};
initChoices();
