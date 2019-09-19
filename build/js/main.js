
'use strict';


(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var Resolution = {
    DESKTOP: 1200,
    TABLET: 768,
    MOBILE: 320
  };


  window.const = {
    keyCode: KeyCode,
    resolution: Resolution
  };
})();

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

'use strict';


(function () {
  var header = document.querySelector('.page-header');


  if (!header) {
    return;
  }


  var adjustHeaderAppearance = function () {
    if (window.pageYOffset > 0) {
      header.classList.add('page-header--above-content');
    } else {
      header.classList.remove('page-header--above-content');
    }
  };


  adjustHeaderAppearance();

  document.addEventListener('scroll', adjustHeaderAppearance);
})();

'use strict';


(function () {
  var menu = document.querySelector('.user-menu');


  if (!menu) {
    return;
  }


  var menuBtn = menu.querySelector('.user-menu__dropdown-toggle');
  var overlay = menu.querySelector('.user-menu__overlay');
  var list = menu.querySelector('.user-menu__list');


  var onMenuBtnClick = function () {
    menu.classList.toggle('user-menu--open');
    overlay.classList.toggle('user-menu__overlay--shown');

    list.style.height = (list.offsetHeight === 0) ? list.scrollHeight + 'px' : '';
  };

  var closeDropdown = function () {
    menu.classList.remove('user-menu--open');
    overlay.classList.remove('user-menu__overlay--shown');
  };


  menu.classList.add('user-menu--js');


  menuBtn.addEventListener('click', onMenuBtnClick);
  overlay.addEventListener('click', closeDropdown);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.const.keyCode.ESC && overlay.classList.contains('user-menu__overlay--shown')) {
      evt.preventDefault();

      closeDropdown();
    }
  });
})();
