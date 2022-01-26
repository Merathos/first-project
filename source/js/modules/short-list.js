'use strict';

(function () {
  var hideClass = 'js_hide';
  var list = document.querySelector('.js_short_list');
  var listCat = document.querySelector('.js_short_list-category');
  var button = document.querySelector('.js_short_list + .js_show_all');
  var isHidden = false;

  if (list && button || listCat && button) {
    // var showedItems = 5;
    var items = list.querySelectorAll('li') || listCat.querySelectorAll('li');

    var hideItems = function () {
      items.forEach(function (item, index) {
        if (index > 4 && window.innerWidth < 768) {
          item.classList.add(hideClass);
        } else if ((index > 7 && window.innerWidth < 1024 && window.innerWidth >= 768)) {
          item.classList.add(hideClass);
        }
      });

      if (listCat && items.length > 8) {
        button.style.display = 'block';

        items.forEach(function (item, index) {
          if (index > 8) {
            item.classList.add(hideClass);
            isHidden = true;
          } else {
            item.classList.remove(hideClass);
            isHidden = false;
          }
        });
      }

      isHidden = true;
    };

    hideItems();

    button.addEventListener('click', function () {
      button.style.display = '';
      if(isHidden) {
        items.forEach(function (item) {
          item.classList.remove(hideClass);
        });
        isHidden = false;
        button.classList.add('is-shown')
      } else {
        hideItems();
        button.classList.remove('is-shown')
      }
    });
  }
})();
