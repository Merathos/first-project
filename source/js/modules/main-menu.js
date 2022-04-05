'use strict';


(function () {
  var header = document.querySelector('.js-page-header');


  if (!header) {
    return;
  }


  var windowWidth = document.documentElement.clientWidth;


  var topBar = header.querySelector('.js-page-header__bar');

  var menu = header.querySelector('.js-main-menu');
  var menuContainer = menu.querySelector('.container');

  var menuBtn = header.querySelector('.js-menu-btn');
  var menuBtnText = menuBtn.querySelector('.menu-btn__text');

  var specialBtn = document.querySelectorAll('.js-open-popup');

  var adjustMenuHeight = function () {
    menu.style.height = header.classList.contains('page-header--open-menu') && document.documentElement.clientWidth < window.var.resolution.DESKTOP ? window.innerHeight - topBar.offsetHeight + 'px' : '';
  };


  var openMenu = function () {
    header.classList.add('page-header--open-menu');
    window.bodyScrollLock.disableBodyScroll(menuContainer);

    menuBtn.classList.add('menu-btn--close');
    menuBtnText.textContent = 'Закрыть основное меню';
  };

  var closeMenu = function () {
    header.classList.remove('page-header--open-menu');
    window.bodyScrollLock.enableBodyScroll(menuContainer);

    menuBtn.classList.remove('menu-btn--close');
    menuBtnText.textContent = 'Открыть основное меню';

    window.adjustPageContentTopPadding();
  };


  var onMenuBtnClick = function () {
    if (header.classList.contains('page-header--open-menu')) {
      closeMenu();
    } else {
      openMenu();
    }

    adjustMenuHeight();
  };

  var onWindowResize = function () {
    if (windowWidth !== document.documentElement.clientWidth) {
      windowWidth = document.documentElement.clientWidth;

      closeMenu();
    }

    adjustMenuHeight();
  };


  menuBtn.addEventListener('click', onMenuBtnClick);
  specialBtn.forEach(function (btn) {
    btn.addEventListener('click', closeMenu);
  });
  window.addEventListener('resize', onWindowResize);
})();
