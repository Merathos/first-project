'use strict';


(function () {
  var menu = document.querySelector('.user-menu');


  if (!menu) {
    return;
  }


  var menuBtn = menu.querySelector('.user-menu__dropdown-btn');
  var menuBtnText = menuBtn.querySelector('.user-menu__dropdown-btn-text');

  var overlay = menu.querySelector('.user-menu__overlay');
  var list = menu.querySelector('.user-menu__list');


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
    if (evt.keyCode === window.const.keyCode.ESC && overlay.classList.contains('user-menu__overlay--shown')) {
      evt.preventDefault();

      closeDropdown();
    }
  });
})();
