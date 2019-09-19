'use strict';


(function () {
  var header = document.querySelector('.page-header');


  if (!header) {
    return;
  }


  var topBar = header.querySelector('.page-header__bar');

  var menu = header.querySelector('.main-menu');
  var menuBtn = header.querySelector('.menu-btn');

  var scrollPosition = 0;


  var adjustMenuHeight = function () {
    menu.style.height = header.classList.contains('page-header--open-menu') && document.documentElement.clientWidth < window.const.resolution.DESKTOP ? window.innerHeight - topBar.offsetHeight + 'px' : '';
  };


  var onMenuBtnClick = function () {
    header.classList.toggle('page-header--open-menu');
    menuBtn.classList.toggle('menu-btn--close');

    adjustMenuHeight();

    if (header.classList.contains('page-header--open-menu')) {
      scrollPosition = window.pageYOffset;
      document.body.classList.add('page-body--no-scroll');
    } else {
      document.body.classList.remove('page-body--no-scroll');
      window.scrollTo(0, scrollPosition);
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


  menu.classList.add('main-menu--js');


  menuBtn.addEventListener('click', onMenuBtnClick);
  window.addEventListener('resize', onWindowResize);
})();
