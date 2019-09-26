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
  var hideClass = 'js_hide';
  var cookieBlock = document.querySelector('.js_cookie');
  var button = document.querySelector('.js_cookie .js_btn');

  if (cookieBlock && button) {
    button.addEventListener('click', function () {
      cookieBlock.classList.add(hideClass);
    });
  }
})();

'use strict';


(function () {
  var filter = document.querySelector('.filter');


  if (!filter) {
    return;
  }


  var openBtn = filter.querySelector('.filter__open-btn');
  // var body = filter.querySelector('.filter__body');

  var onOpenBtnClick = function (evt) {
    filter.classList.toggle('filter--open');

    evt.currentTarget.textContent =
      filter.classList.contains('filter--open') ?
        'Скрыть фильтры'
        :
        'Фильтры';
  };


  filter.classList.add('filter--js');

  openBtn.addEventListener('click', onOpenBtnClick);
})();

'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var selectItems = document.querySelectorAll('.form-select');
  if (!selectItems.length) {
    return;
  }


  Array.prototype.forEach.call(selectItems, function (selectItem) {
    var dropdown = selectItem.querySelector('.form-select__group');
    var trigger = selectItem.querySelector('.form-select__title');
    var options = selectItem.querySelectorAll('.form-select__option');

    if (!dropdown && !trigger && !options.length) {
      return;
    }

    function select(element) {
      var value = element.getAttribute('data-value');
      var nodes = element.parentNode.childNodes;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] instanceof HTMLParagraphElement) {
          if (value === nodes[i].getAttribute('data-value')) {
            nodes[i].classList.add('form-select__option--active');
          } else {
            nodes[i].classList.remove('form-select__option--active');
          }
        }
      }
      selectItem.querySelector('input[type="hidden"]').value = value;
      selectItem.querySelector('.form-select__title-text').textContent = value;
      if (dropdown.classList.contains('form-select__group--active')) {
        dropdown.classList.remove('form-select__group--active');
      }
      if (trigger.classList.contains('form-select__title--open')) {
        trigger.classList.remove('form-select__title--open');
      }
    }

    function onEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        close();
      }
    }

    function close() {
      if (dropdown.classList.contains('form-select__group--active')) {
        dropdown.classList.remove('form-select__group--active');
      }
      if (trigger.classList.contains('form-select__title--open')) {
        trigger.classList.remove('form-select__title--open');
      }
    }

    document.addEventListener('keydown', onEscPress);

    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target === trigger) {
        evt.preventDefault();
        dropdown.classList.toggle('form-select__group--active');
        trigger.classList.toggle('form-select__title--open');
      } else {
        Array.prototype.forEach.call(options, function (item) {
          if (target === item) {
            select(item);
          } else {
            close();
          }
        });
      }
    });

    var scrollContainer = selectItem.querySelector('.form-select__scrollbar-content');

    if (scrollContainer) {
      window.Scrollbar.init(scrollContainer, options);
    }
  });
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

  var adjustPageContentTopPadding = function () {
    document.body.style.paddingTop = header.offsetHeight + 'px';
  };

  var onWindowResize = function () {
    adjustPageContentTopPadding();
  };


  header.classList.add('page-header--js');

  adjustHeaderAppearance();
  adjustPageContentTopPadding();


  document.addEventListener('scroll', adjustHeaderAppearance);
  window.addEventListener('resize', onWindowResize);
})();

'use strict';


(function () {
  var list = document.querySelector('.projects__list');

  if (!list) {
    return;
  }

  var ellipsis = Ellipsis({
    lines: 3
  });

  var titles = list.querySelectorAll('.project-item__title');

  ellipsis.add(titles);
})();

// var rangeSlider = document.getElementById('slider-range');

// noUiSlider.create(rangeSlider, {
//     start: [5],
//     behaviour: 'snap',
//     connect: 'lower',
//     step: 1,
//     range: {
//         'min': [1],
//         'max': [10]
//     }
// });

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


  var onMenuBtnClick = function () {
    menu.classList.toggle('user-menu--open');
    overlay.classList.toggle('user-menu__overlay--shown');

    list.style.height =
      (list.offsetHeight === 0) ?
        list.scrollHeight + 'px'
        :
        '';

    menuBtnText.textContent =
      menu.classList.contains('user-menu--open') ?
        'Закрыть меню'
        :
        'Открыть меню';
  };

  var closeDropdown = function () {
    menu.classList.remove('user-menu--open');
    overlay.classList.remove('user-menu__overlay--shown');

    menuBtnText.textContent = 'Открыть меню';
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
