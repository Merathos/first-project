'use strict';
var initChoices = function () {

  var Scrollbar = window.Scrollbar;
  var selectItems = document.querySelectorAll('._select');
  if (selectItems.length > 0) {
    selectItems.forEach(function (item) {
      // var list = item.parentElement.nextElementSibling.querySelector('.choices__list');
      new window.Choices(item, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        placeholder: true,
        placeholderValue: 'Выберите из списка',
      });
      item.addEventListener('showDropdown', function () {
        Scrollbar.init((item.parentElement.nextElementSibling.querySelector('.choices__list')), {
          continuousScrolling: false
        });
      });
      item.addEventListener('hideDropdown', function () {
        setTimeout(function () {
          Scrollbar.destroy((item.parentElement.nextElementSibling.querySelector('.choices__list')), {
            continuousScrolling: false
          });
        }, 500);
      });
      // Scrollbar.init((item.parentElement.nextElementSibling.querySelector('.choices__list')), {
      //   continuousScrolling: false
      // });
    });
  }

  var selectItemSearch = document.querySelectorAll('._select-search');
  if (selectItemSearch.length > 0) {
    selectItemSearch.forEach(function (item) {
      // var list = item.parentElement.nextElementSibling.querySelector('.choices__list');
      new Choices(item, {
        searchEnabled: true,
        itemSelectText: '',
        shouldSort: false,
        placeholder: true,
        placeholderValue: 'Выберите из списка',
        noResultsText: 'Ни чего не найдено',
        searchPlaceholderValue: 'Начните вводить текст',
      });
      item.addEventListener('showDropdown', function (evt) {
        Scrollbar.init((item.parentElement.nextElementSibling.querySelector('.choices__list')), {
          continuousScrolling: false
        });
      });
      item.addEventListener('hideDropdown', function (evt) {
        setTimeout(function () {
          Scrollbar.destroy((item.parentElement.nextElementSibling.querySelector('.choices__list')), {
            continuousScrolling: false
          });
        }, 500);
      });
      // Scrollbar.init((item.parentElement.nextElementSibling.querySelector('.choices__list')), {
      //   continuousScrolling: false
      // });
    });
  }
};

window.initChoices = initChoices;

initChoices();
