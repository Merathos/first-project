'use strict';


(function () {
  var header = document.querySelector('.page-header');


  if (!header) {
    return;
  }


  var topBar = header.querySelector('.page-header__bar');

  var menu = header.querySelector('.page-header__main');
  var menuBtn = header.querySelector('.menu-btn');

  var scrollPosition = 0;


  var onMenuBtnClick = function () {
    header.classList.toggle('page-header--open-menu');
    menuBtn.classList.toggle('menu-btn--close');

    menu.style.height = header.classList.contains('page-header--open-menu') ? window.innerHeight - topBar.offsetHeight + 'px' : '';

    if (header.classList.contains('page-header--open-menu')) {
      scrollPosition = window.pageYOffset;
      document.body.classList.add('page-body--no-scroll');
    } else {
      document.body.classList.remove('page-body--no-scroll');
      window.scrollTo(0, scrollPosition);
    }
  };


  menu.classList.add('page-header__main--js');

  menuBtn.addEventListener('click', onMenuBtnClick);
})();
