'use strict';


(function () {
  var header = document.querySelector('.page-header');


  if (!header) {
    return;
  }


  var topBar = header.querySelector('.page-header__bar');

  var menu = header.querySelector('.main-menu');
  var menuContainer = menu.querySelector('.container');

  var menuBtn = header.querySelector('.menu-btn');
  var menuBtnText = menuBtn.querySelector('.menu-btn__text');


  var adjustMenuHeight = function () {
    menu.style.height = header.classList.contains('page-header--open-menu') && document.documentElement.clientWidth < window.const.resolution.DESKTOP ? window.innerHeight - topBar.offsetHeight + 'px' : '';
  };


  var onMenuBtnClick = function () {
    header.classList.toggle('page-header--open-menu');

    adjustMenuHeight();

    if (header.classList.contains('page-header--open-menu')) {
      bodyScrollLock.disableBodyScroll(menuContainer);

      menuBtn.classList.add('menu-btn--close');
      menuBtnText.textContent = 'Закрыть меню';
    } else {
      bodyScrollLock.enableBodyScroll(menuContainer);

      menuBtn.classList.remove('menu-btn--close');
      menuBtnText.textContent = 'Открыть меню';
    }
  };

  var onWindowResize = function () {
    adjustMenuHeight();

    if (header.classList.contains('page-header--open-menu') && document.documentElement.clientWidth >= window.const.resolution.DESKTOP) {
      header.classList.remove('page-header--open-menu');
      menuBtn.classList.remove('menu-btn--close');
      document.body.classList.remove('page-body--no-scroll');
    }
  };


  menuBtn.addEventListener('click', onMenuBtnClick);
  window.addEventListener('resize', onWindowResize);
})();
