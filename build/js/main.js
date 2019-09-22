(function ($) {
  reinitSelect($);
})(jQuery);
function reinitSelect($) {
  if ($('.form-select__group').length) {
    $('.form-select__group').styler({
      onSelectOpened: function() {
        $(this)
          .find('.jq-selectbox__trigger-arrow')
          .addClass('jq-selectbox__trigger-arrow--rotate');
      },
      onSelectClosed: function() {
        $(this)
          .find('.jq-selectbox__trigger-arrow')
          .removeClass('jq-selectbox__trigger-arrow--rotate');
      }
    });
    var ps = new PerfectScrollbar('.jq-selectbox__dropdown ul', {
      wheelSpeed: 0.5
    });
  }
}


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
  var switcher = document.querySelector('.location-switcher');


  if (!switcher) {
    return;
  }


  switcher.classList.add('location-switcher--js');
})();

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
  header.classList.add('page-header--js');

  document.addEventListener('scroll', adjustHeaderAppearance);
})();

'use strict';


(function () {
  var menu = document.querySelector('.user-menu');


  if (!menu) {
    return;
  }


  var menuBtn = menu.querySelector('.user-menu__dropdown-btn');
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
