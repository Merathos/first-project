'use strict';


(function () {
  var menus = document.querySelectorAll('.js-user-menu');


  if (!menus.length) {
    return;
  }

  menus.forEach(function (menu) {
    var menuBtn = menu.querySelector('.js-user-menu__dropdown-btn');
    var menuBtnText = menuBtn.querySelector('.user-menu__dropdown-btn-text');

    var overlay = menu.querySelector('.js-user-menu__overlay');
    var list = menu.querySelector('.js-user-menu__list');


    var openDropdown = function () {
      menu.classList.add('user-menu--open');
      overlay.classList.add('user-menu__overlay--shown');

      menuBtnText.textContent = 'Закрыть меню пользователя';
    };

    var closeDropdown = function () {
      menu.classList.remove('user-menu--open');
      overlay.classList.remove('user-menu__overlay--shown');

      menuBtnText.textContent = 'Открыть меню пользователя';
    };


    var onMenuBtnClick = function () {
      if (menu.classList.contains('user-menu--open')) {
        closeDropdown();

        list.style.height = '';
      } else {
        openDropdown();

        list.style.height = list.scrollHeight + 'px';
      }
    };


    menuBtn.addEventListener('click', onMenuBtnClick);
    overlay.addEventListener('click', closeDropdown);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.var.keyCode.ESC && overlay.classList.contains('user-menu__overlay--shown')) {
        evt.preventDefault();

        closeDropdown();
      }
    });
  })

})();
