'use strict';


(function () {

  var modal = function (btns, popup) {
    Array.prototype.forEach.call(btns, function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();

        window.openPopup(popup);
      });
    });
  };

  var popupCommentAdd = document.querySelector('.js-comment-popup--add');
  var btnsCommentAdd = document.querySelectorAll('.js-comment-add');

  if (!popupCommentAdd && !btnsCommentAdd.length) {
    return;
  }

  modal(btnsCommentAdd, popupCommentAdd);

  var popupCommentEdit = document.querySelector('.js-comment-popup--edit');
  var btnsCommentEdit = document.querySelectorAll('.js-comment-edit');

  if (!popupCommentEdit && !btnsCommentEdit.length) {
    return;
  }

  modal(btnsCommentEdit, popupCommentEdit);

  var popupCommentYour = document.querySelector('.js-comment-popup--your');
  var btnsCommentYour = document.querySelectorAll('.js-comment-your');

  if (!popupCommentYour && !btnsCommentYour.length) {
    return;
  }

  modal(btnsCommentYour, popupCommentYour);

  var popupTable = document.querySelector('.js-table-popup');
  var btnsTable = document.querySelectorAll('.js-table');

  if (!popupTable && !btnsTable.length) {
    return;
  }

  modal(btnsTable, popupTable);

  var popupCommentTable = document.querySelector('.js-comment-popup--table');
  var btnsCommentTable = document.querySelectorAll('.js-comment-table');

  if (!popupCommentTable && !btnsCommentTable.length) {
    return;
  }

  modal(btnsCommentTable, popupCommentTable);

})();

'use strict';

(function () {
  var form = document.querySelector('.js-answers__form');
  if (!form) {
    return;
  }
  var inputCount = form.querySelector('.js-count-answer');
  var inputContainer = document.querySelector('.js-answers__count');
  var countAll = document.querySelector('.js-answers__all-count');

  if (!inputCount && !inputContainer && !countAll) {
    return;
  }

  inputContainer.addEventListener('mouseover', function () {
    inputCount.focus();
  });

  inputCount.onblur = function () {
    if (inputCount.value < 1) {
      inputCount.value = 1;
    } else if (inputCount.value > +countAll.textContent) {
      inputCount.value = +countAll.textContent;
    }
    inputContainer.classList.remove('answers__count--hover');
  };

  inputCount.onfocus = function () {
    inputContainer.classList.add('answers__count--hover');
  };

  inputCount.oninput = function () {
    inputCount.value = inputCount.value.replace(/[^\+\d]/g, '');
    inputCount.focus();
    inputContainer.classList.add('answers__count--hover');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    inputCount.blur();
  });

})();

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
  var button = document.querySelector('.js-cookie__button');

  if (cookieBlock && button) {
    document.body.classList.add('page-body--cookie');

    button.addEventListener('click', function () {
      cookieBlock.classList.add(hideClass);
      document.body.classList.remove('page-body--cookie');
    });
  }
})();

'use strict';


(function () {
  var filterVote = document.querySelector('.js-filter-vote');

  if (!filterVote) {
    return;
  }


  var deselectLabel = '<button type="button"><span class="visually-hidden">Сбросить фильтр по голосам</span><svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 1L11 11M11 1L1 11" stroke-width="2"/></svg></button>';


  var addSelect = function () {
    return new window.SlimSelect({
      select: '.js-filter-vote select',
      showSearch: false,
      allowDeselect: true,
      placeholder: 'Голосовал',

      deselectLabel: deselectLabel
    });
  };


  addSelect();
})();

'use strict';


(function () {
  var filter = document.querySelector('.js-filter');


  if (!filter) {
    return;
  }


  var openBtn = filter.querySelector('.js-filter__open-btn');

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
  var Scrollbar = window.Scrollbar;
  var selectItem = document.querySelector('#projects-select');
  var categorySelect = document.querySelector('#category-select');

  var addSelect = function (el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
      afterClose: function () {
        Scrollbar.destroy(document.querySelector('.form-select .ss-list'));
      },
      afterOpen: function () {
        Scrollbar.init(document.querySelector('.form-select .ss-list'), {
          continuousScrolling: false
        });
      },
    });

    if (!select) {
      return;
    }
    Scrollbar.init(document.querySelector('.form-select .ss-main .ss-content .ss-list'), {
      continuousScrolling: false
    });
  };

  if (selectItem) {
    addSelect(selectItem);
  }

  if (categorySelect) {
    addSelect(categorySelect);
  }
})();

'use strict';


(function () {
  var popup = document.querySelector('.js-gallery-popup');

  if (!popup) {
    return;
  }


  var slider = popup.querySelector('.js-gallery-popup__frame');
  var prevBtn = popup.querySelector('.js-gallery-popup__nav-btn--prev');
  var nextBtn = popup.querySelector('.js-gallery-popup__nav-btn--next');

  var description = popup.querySelector('.js-gallery-popup__photo-description');
  var currentCounter = popup.querySelector('.js-gallery-popup__counter-current');
  var totalCounter = popup.querySelector('.js-gallery-popup__counter-total');

  var swiper = null;


  var resetSlider = function () {
    swiper.destroy();
    slider.innerHTML = '';
  };

  var initializeSlider = function (target) {
    var items = target.parentElement.parentElement.children;
    var currentItemDescription = target.querySelector('.gallery__item-text');

    var sliderTape = document.createElement('div');
    sliderTape.classList.add('swiper-wrapper');

    Array.prototype.forEach.call(items, function (item) {
      var itemPhoto = item.querySelector('.gallery__item');
      var element = itemPhoto.cloneNode(true);
      element.classList.add('swiper-slide');

      sliderTape.appendChild(element);
    });

    slider.appendChild(sliderTape);

    swiper = new window.Swiper(slider, {
      initialSlide: +target.dataset.index,
      slidesPerView: 1,
      watchOverflow: true,
      grabCursor: true,
      loop: true,

      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },

      on: {
        slideChange: function () {
          description.textContent = items[this.realIndex].querySelector('.gallery__item-text').textContent;
          currentCounter.textContent = +this.realIndex + 1;
        }
      }
    });

    description.textContent = currentItemDescription.textContent;
    currentCounter.textContent = +target.dataset.index + 1;
    totalCounter.textContent = items.length;
  };


  var onDocumentClick = function (evt) {
    if (evt.target.classList.contains('js-gallery__item-link')) {
      evt.preventDefault();

      if (swiper) {
        resetSlider();
      }

      window.openPopup(popup);
      initializeSlider(evt.target);
    }
  };

  document.addEventListener('click', onDocumentClick);
})();

'use strict';


(function () {
  var galleries = document.querySelectorAll('.js-gallery');

  if (!galleries.length) {
    return;
  }

  var sliderSwiper = function (gallery) {
    return new window.Swiper(gallery, {
      slidesPerView: 'auto',
      spaceBetween: 16,

      breakpoints: {
        320: {
          spaceBetween: 12
        }
      },

      watchOverflow: true,
      grabCursor: true
    });
  };


  galleries.forEach(function (gallery) {
    var previews = gallery.querySelectorAll('.js-gallery__item-link');

    previews.forEach(function (preview, i) {
      preview.dataset.index = i;
    });

    sliderSwiper(gallery);
  });
})();

'use strict';


(function () {
  var switcher = document.querySelector('.js-location-switcher');


  if (!switcher) {
    return;
  }


  switcher.classList.add('location-switcher--js');
})();

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
    menu.style.height = header.classList.contains('page-header--open-menu') && document.documentElement.clientWidth < window.const.resolution.DESKTOP ? window.innerHeight - topBar.offsetHeight + 'px' : '';
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

'use strict';


(function () {
  var header = document.querySelector('.js-page-header');

  if (!header) {
    return;
  }


  var headerBar = header.querySelector('.js-page-header__bar');


  var adjustHeaderAppearance = function () {
    if (document.documentElement.clientWidth >= window.const.resolution.DESKTOP && window.pageYOffset > 0) {
      header.classList.add('page-header--above-content');
      header.style.top = -headerBar.offsetHeight + 'px';
    } else {
      header.classList.remove('page-header--above-content');
      header.style.top = 0;
    }
  };

  var adjustPageContentTopPadding = function () {
    document.body.style.paddingTop = header.offsetHeight + 'px';
  };


  var onWindowResize = function () {
    header.classList.remove('page-header--above-content');

    adjustPageContentTopPadding();
    adjustHeaderAppearance();
  };


  header.classList.add('page-header--js');

  adjustPageContentTopPadding();
  adjustHeaderAppearance();


  document.addEventListener('scroll', adjustHeaderAppearance);
  window.addEventListener('resize', onWindowResize);


  window.adjustPageContentTopPadding = adjustPageContentTopPadding;
})();

'use strict';


(function () {
  var popups = document.querySelectorAll('.js-popup');


  window.openPopup = function (popup) {
    window.bodyScrollLock.disableBodyScroll(popup);
    popup.classList.add('popup--shown');
  };


  var closePopup = function (popup) {
    window.bodyScrollLock.enableBodyScroll(popup);
    popup.classList.remove('popup--shown');
  };

  var onEscPress = function (evt, popup) {
    if (evt.keyCode === window.const.keyCode.ESC && popup.classList.contains('popup--shown')) {
      evt.preventDefault();

      closePopup(popup);
    }
  };


  popups.forEach(function (popup) {
    var overlay = popup.querySelector('.js-popup__overlay');
    var closeBtn = popup.querySelector('.js-popup__close-btn');


    overlay.addEventListener('click', function () {
      closePopup(popup);
    });
    closeBtn.addEventListener('click', function () {
      closePopup(popup);
    });

    document.addEventListener('keydown', function (evt) {
      onEscPress(evt, popup);
    });
  });
})();

'use strict';


(function () {
  var panel = document.querySelector('.js-project-page__panel');

  if (!panel) {
    return;
  }


  panel.classList.add('project-page__panel--js');

  (function () {
    return new window.Sticky('.js-project-page__panel');
  })();
})();

'use strict';


(function () {
  var textItems = document.querySelectorAll('.js-project-page__text');

  if (!textItems.length) {
    return;
  }


  var MAX_HEIGHT = 190;

  var windowWidth = document.documentElement.clientWidth;
  var isInitialized = false;


  var toggleTextContent = function (btn) {
    var text = btn.parentElement;
    var textContainer = text.querySelector('.project-page__text-container');
    var btnCaption = btn.querySelector('.project-page__text-btn-caption');

    text.classList.toggle('project-page__text--collapsed');

    if (text.classList.contains('project-page__text--collapsed')) {
      textContainer.style.height = MAX_HEIGHT + 'px';
      btnCaption.textContent = 'Показать полностью';
    } else {
      textContainer.style.height = textContainer.scrollHeight + 'px';
      btnCaption.textContent = 'Скрыть';
    }
  };

  var onDocumentClick = function (evt) {
    if (evt.target.classList.contains('js-project-page__text-btn')) {
      toggleTextContent(evt.target);
    }
  };


  var init = function () {
    Array.prototype.forEach.call(textItems, function (text) {
      var textContainer = text.querySelector('.project-page__text-container');

      if (textContainer.scrollHeight > MAX_HEIGHT) {
        text.classList.add('project-page__text--collapsed', 'project-page__text--js');
        textContainer.style.height = MAX_HEIGHT + 'px';
      }
    });

    document.addEventListener('click', onDocumentClick);

    isInitialized = true;
  };

  var destroy = function () {
    Array.prototype.forEach.call(textItems, function (text) {
      var textContainer = text.querySelector('.project-page__text-container');
      var btnCaption = text.querySelector('.project-page__text-btn-caption');

      text.classList.remove('project-page__text--collapsed', 'project-page__text--js');

      textContainer.style.height = '';
      btnCaption.textContent = 'Показать полностью';
    });

    document.removeEventListener('click', onDocumentClick);

    isInitialized = false;
  };

  var onWindowResize = function () {
    if (windowWidth !== document.documentElement.clientWidth) {
      windowWidth = document.documentElement.clientWidth;

      if (windowWidth < window.const.resolution.TABLET) {
        if (isInitialized) {
          return;
        }

        init();
      } else {
        destroy();
      }
    }
  };


  if (windowWidth < window.const.resolution.TABLET) {
    init();
  }


  window.addEventListener('resize', onWindowResize);
})();

'use strict';

(function () {
  var vote = document.querySelector('.js-project-vote');
  var popup = document.querySelector('.js-vote-popup');

  if (!vote || !popup) {
    return;
  }


  var submitForm = vote.querySelector('.js-project-vote__submit-form form');
  var revokeBtn = vote.querySelector('.js-project-vote__revoke-btn');

  var popupBtn = popup.querySelector('.js-vote-popup__revoke-btn');

  var popupShownTimeout = null;

  var approveValue = +vote.querySelector('.js-vote-results__value--approve').textContent.replace(/\s+/g, '');
  var rejectValue = +vote.querySelector('.js-vote-results__value--reject').textContent.replace(/\s+/g, '');

  var scaleIndicator = vote.querySelector('.js-vote-results__indicator');


  var onSubmitFormClick = function (evt) {
    if (evt.target.classList.contains('project-vote__vote-btn') && !evt.target.classList.contains('project-vote__vote-btn--selected')) {
      vote.classList.add('project-vote--voted');
      evt.target.classList.add('project-vote__vote-btn--selected');

      vote.querySelector('input').dispatchEvent(new Event('change'));

      popup.classList.add('vote-popup--shown');

      popupShownTimeout = setTimeout(function () {
        popup.classList.remove('vote-popup--shown');
      }, 5000);
    }
  };

  var revokeVote = function (evt) {
    evt.preventDefault();

    vote.classList.remove('project-vote--voted');

    submitForm.querySelector('.project-vote__vote-btn--selected').classList.remove('project-vote__vote-btn--selected');
    submitForm.reset();

    popup.classList.remove('vote-popup--shown');
    clearTimeout(popupShownTimeout);
  };


  vote.classList.add('project-vote--js');

  scaleIndicator.style.width = Math.trunc(approveValue / (approveValue + rejectValue) * 100) + '%';

  submitForm.addEventListener('click', onSubmitFormClick);
  revokeBtn.addEventListener('click', revokeVote);
  popupBtn.addEventListener('click', revokeVote);
})();

'use strict';


(function () {
  var list = document.querySelector('.js-projects-list');

  if (!list) {
    return;
  }

  var ellipsis = new window.Ellipsis({
    lines: 3
  });

  var titles = list.querySelectorAll('.project-item__title');

  ellipsis.add(titles);
})();

'use strict';

(function () {
  var rangeSlider = document.querySelector('.js-poll-range');
  if (!rangeSlider) {
    return;
  }

  window.noUiSlider.create(rangeSlider, {
    start: [5],
    behaviour: 'snap',
    connect: 'lower',
    step: 1,
    range: {
      'min': [1],
      'max': [10]
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4
    },
    tooltips: true,
    format: window.wNumb({
      decimals: 0,
    })
  });

  rangeSlider.noUiSlider.on('update', function (values) {
    var maxPos = Math.max(values);
    var pips = rangeSlider.querySelectorAll('.noUi-marker-horizontal.noUi-marker-sub');

    if (!pips) {
      return;
    }

    for (var i = 0; i < pips.length; i++) {

      if (i <= maxPos - 2) {
        pips[i].classList.add('form-range__accent');
      } else {
        pips[i].classList.remove('form-range__accent');
      }
    }

  });

})();

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
  var hideClass = 'js-hide';
  var popup = document.querySelector('.special-popup');
  var btnsOpenPopup = document.querySelectorAll('.js-open-popup');


  if (popup && btnsOpenPopup) {
    var root = document.documentElement;


    var isDefault = {
      'font-size': true,
      'font-family': true,
      'theme': true
    };


    var popupCloseBtn = popup.querySelector('.js-close-popup');
    var btns = popup.querySelectorAll('[data-property]');
    var resetBtn = popup.querySelector('.js-special-popup__reset');


    var toggleProperty = function (btn) {
      var targetProperty = btn.dataset.property;
      var targetValue = btn.dataset.value;

      root.classList.forEach(function (item) {
        if (new RegExp(targetProperty).test(item)) {
          root.classList.remove(item);
        }
      });

      if (targetValue !== 'default') {
        isDefault[targetProperty] = false;
        root.classList.add('mod-' + targetProperty + '-' + targetValue);
      } else {
        isDefault[targetProperty] = true;
      }

      if (targetProperty === 'font-size') {
        window.adjustPageContentTopPadding();
      }

      resetBtn.disabled = isDefault['font-size'] && isDefault['font-family'] && isDefault['theme'];
    };


    var onResetBtnClick = function () {
      root.className.split(' ').forEach(function (item) {
        if (item.indexOf('mod-') !== -1) {
          root.classList.remove(item);
        }
      });

      btns.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.value === 'default');
      });

      resetBtn.disabled = true;
    };


    btns.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();

        var selector = '[data-property=' + evt.target.getAttribute('data-property') + ']';

        popup.querySelectorAll(selector).forEach(function (item) {
          item.classList.remove('active');
        });
        evt.target.classList.add('active');

        toggleProperty(evt.currentTarget);
      });
    });

    resetBtn.addEventListener('click', onResetBtnClick);


    btnsOpenPopup.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();
        popup.classList.remove(hideClass);

        if (root.clientWidth < window.const.resolution.DESKTOP) {
          window.bodyScrollLock.disableBodyScroll(popup);
        }
      });
    });

    popupCloseBtn.addEventListener('click', function () {
      popup.classList.add(hideClass);

      if (root.clientWidth < window.const.resolution.DESKTOP) {
        window.bodyScrollLock.enableBodyScroll(popup);
      }
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.const.keyCode.ESC) {
        evt.preventDefault();
        popup.classList.add(hideClass);

        if (root.clientWidth < window.const.resolution.DESKTOP) {
          window.bodyScrollLock.enableBodyScroll(popup);
        }
      }
    });
  }
})();

'use strict';


(function () {
  var subscribeLink = document.querySelector('.js-social__link--subscribe, .js-social__link--unsubscribe');

  if (!subscribeLink) {
    return;
  }

  var linkText = subscribeLink.querySelector('.social__link-text');


  var onSubscribeLinkClick = function (evt) {
    evt.preventDefault();

    if (subscribeLink.classList.contains('social__link--subscribe')) {
      linkText.textContent = 'Отписаться';

      subscribeLink.classList.remove('social__link--subscribe');
      subscribeLink.classList.add('social__link--unsubscribe');
    } else {
      linkText.textContent = 'Подписаться';

      subscribeLink.classList.add('social__link--subscribe');
      subscribeLink.classList.remove('social__link--unsubscribe');
    }
  };


  subscribeLink.addEventListener('click', onSubscribeLinkClick);
})();

'use strict';
(function () {
  var tableContainers = document.querySelectorAll('.table-fixed');

  if (!tableContainers.length) {
    return;
  }
  var scroll = null;

  Array.prototype.forEach.call(tableContainers, function (tableContainer) {
    scroll = new window.SimpleBar(tableContainer, {
      autoHide: false
    });
    return scroll;
  });

})();

(function () {
  var tableBodys = document.querySelectorAll('.table-fixed__body');

  if (!tableBodys.length) {
    return;
  }

  var scroll = null;

  Array.prototype.forEach.call(tableBodys, function (tableBody) {
    scroll = new window.SimpleBar(tableBody, {
      autoHide: false
    });
    return scroll;
  });

})();

(function () {
  var el = document.querySelector('.table-fixed--all-screen .table-fixed__body .simplebar-content-wrapper');
  var header = document.querySelector('.table-fixed--all-screen .table-fixed__header');

  if (!el && !header) {
    return;
  }

  el.addEventListener('scroll', function () {

    if (el.scrollTop > 50) {
      header.classList.add('table-fixed__header--scroll');
    }
    if (el.scrollTop < 50) {
      header.classList.remove('table-fixed__header--scroll');
    }
  });

})();

'use strict';

(function () {
  var windowWidth = document.documentElement.clientWidth;
  var tabList = document.querySelector('.activity-tabs__list');

  if (!tabList) {
    return;
  }

  var tab = tabList.querySelector('.activity-tabs__item--active');

  if (!tab) {
    return;
  }

  var posX = tab.offsetLeft;

  if (windowWidth < window.const.resolution.TABLET) {
    tabList.scrollLeft = posX - 16;
  }

})();

'use strict';

(function () {
  var textContainers = document.querySelectorAll('.js-text-hidden');
  if (!textContainers.length) {
    return;
  }

  Array.prototype.forEach.call(textContainers, function (textContainer) {
    var btnTextOpen = textContainer.querySelector('.js-text-hidden__btn');
    var btnText = btnTextOpen.querySelector('span');
    var text = textContainer.querySelector('.text-hidden__container');
    var btnContainer = textContainer.querySelector('.answers__button-wrapper');
    if (!btnTextOpen && !text && !btnContainer) {
      return;
    }
    btnTextOpen.addEventListener('click', function (evt) {
      evt.preventDefault();
      btnTextOpen.classList.toggle('text-hidden__btn--open');
      text.classList.toggle('text-hidden__container--open');
      btnContainer.classList.toggle('answers__button-wrapper--open');
      btnText.textContent = btnText.textContent === 'Развернуть' ? 'Свернуть' : 'Развернуть';
    });
  });
})();

'use strict';


(function () {
  var upBtn = document.querySelector('.js-page-body__up-btn');
  var container = document.querySelector('footer .container');

  if (!upBtn) {
    return;
  }


  var cookieBtn = document.querySelector('.js-cookie__button');


  var onUpBtnClick = function (evt) {
    evt.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  if (container) {
    var adjustUpBtnPosition = function () {
      if (container.getBoundingClientRect().right + upBtn.offsetWidth < document.documentElement.clientWidth) {
        upBtn.style.left = container.getBoundingClientRect().right - parseInt(getComputedStyle(container).paddingRight, 10) + 16 + 'px';
        upBtn.style.right = '';
      } else {
        upBtn.style.left = '';
        upBtn.style.right = '16px';
      }

      if (cookieBtn) {
        upBtn.style.bottom = window.innerHeight - cookieBtn.getBoundingClientRect().bottom + 'px';
      }
    };

    var onWindowResize = function () {
      adjustUpBtnPosition();
    };

    adjustUpBtnPosition();

    window.addEventListener('resize', onWindowResize);
  }


  var onDocumentClick = function (evt) {
    if ((evt.target.classList.contains('js-special-popup__btn-size') || evt.target.classList.contains('js-special-popup__reset')) && cookieBtn) {
      var cookieBtnHeight = cookieBtn.offsetHeight;
      var cookieBtnBottom = window.innerHeight - cookieBtn.getBoundingClientRect().bottom;

      upBtn.style.height = cookieBtnHeight + 'px';
      upBtn.style.width = cookieBtnHeight + 'px';
      upBtn.style.bottom = cookieBtnBottom + 'px';
    }
  };


  upBtn.addEventListener('click', onUpBtnClick);

  document.addEventListener('click', onDocumentClick);
})();

'use strict';


(function () {
  var menu = document.querySelector('.js-user-menu');


  if (!menu) {
    return;
  }


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
    if (evt.keyCode === window.const.keyCode.ESC && overlay.classList.contains('user-menu__overlay--shown')) {
      evt.preventDefault();

      closeDropdown();
    }
  });
})();
