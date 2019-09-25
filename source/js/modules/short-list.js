'use strict';

(function () {
  var hideClass = 'js_hide';
  var list = document.querySelector('.js_short_list');
  var button = document.querySelector('.js_short_list + .js_show_all');

  if (list && button) {
    // var showedItems = 5;
    var items = list.querySelectorAll('li');

    items.forEach(function (item, index) {
      if (index > 4) {
        item.classList.add(hideClass);
      }
    });

    button.addEventListener('click', function () {
      items.forEach(function (item) {
        item.classList.remove(hideClass);
        button.classList.add(hideClass);
      });
    });
  }
})();
