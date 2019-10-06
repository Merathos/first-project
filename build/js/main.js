'use strict';


(function () {

  var modal = function (btns, popup) {
    Array.prototype.forEach.call(btns, function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();
        bodyScrollLock.disableBodyScroll(popup);
        popup.classList.add('popup--shown');
      });
    });

    var overlay = popup.querySelector('.popup__overlay');
    var closeBtn = popup.querySelector('.popup__close-btn');

    var closePopup = function () {
      bodyScrollLock.enableBodyScroll(popup);
      popup.classList.remove('popup--shown');
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.const.keyCode.ESC && popup.classList.contains('popup--shown')) {
        evt.preventDefault();

        closePopup();
      }
    };

    overlay.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);
    document.addEventListener('keydown', onEscPress);
  };

  var popupCommentAdd = document.querySelector('.comment-popup--add');
  var btnsCommentAdd = document.querySelectorAll('[data-target="comment-add"]');

  if (!popupCommentAdd && !btnsCommentAdd.length) {
    return;
  }

  modal(btnsCommentAdd, popupCommentAdd);

  var popupCommentEdit = document.querySelector('.comment-popup--edit');
  var btnsCommentEdit = document.querySelectorAll('[data-target="comment-edit"]');

  if (!popupCommentEdit && !btnsCommentEdit.length) {
    return;
  }

  modal(btnsCommentEdit, popupCommentEdit);

  var popupCommentYour = document.querySelector('.comment-popup--your');
  var btnsCommentYour = document.querySelectorAll('[data-target="comment-your"]');

  if (!popupCommentYour && !btnsCommentYour.length) {
    return;
  }

  modal(btnsCommentYour, popupCommentYour);
})();

'use strict';

(function () {
  var form = document.querySelector('.answers__form');
  if (!form) {
    return;
  }
  var inputCount = form.querySelector('#count-answer');
  var inputContainer = document.querySelector('.answers__count');

  if (!inputCount && !inputContainer) {
    return;
  }

  inputContainer.addEventListener('mouseover', function () {
    inputCount.focus();
  });

  inputContainer.addEventListener('mouseout', function () {
    inputCount.blur();
    inputContainer.classList.remove('answers__count--hover');
  });

  inputCount.oninput = function () {
    inputCount.value = inputCount.value.replace(/[^\+\d]/g, '');
    inputCount.focus();
    inputContainer.classList.add('answers__count--hover');
  };
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
  var button = document.querySelector('.js_cookie .js_btn');

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
  var Scrollbar = window.Scrollbar;
  var selectItem = document.querySelector('#projects-select');
  var categorySelect = document.querySelector('#category-select');
  var voteSelect = document.querySelector('#vote-select');

  var addSelect = function (el) {
    var select = new SlimSelect({
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

  if (voteSelect) {
    addSelect(voteSelect);
  }

})();

'use strict';


(function () {
  var popup = document.querySelector('.gallery-popup');

  if (!popup) {
    return;
  }


  var overlay = popup.querySelector('.popup__overlay');
  var closeBtn = popup.querySelector('.popup__close-btn');

  var slider = popup.querySelector('.swiper-container');
  var prevBtn = popup.querySelector('.gallery-popup__nav-btn--prev');
  var nextBtn = popup.querySelector('.gallery-popup__nav-btn--next');

  var description = popup.querySelector('.gallery-popup__photo-description');
  var currentCounter = popup.querySelector('.gallery-popup__counter-current');
  var totalCounter = popup.querySelector('.gallery-popup__counter-total');

  var swiper = null;


  var closePopup = function () {
    swiper.destroy();
    slider.innerHTML = '';

    bodyScrollLock.enableBodyScroll(popup);
    popup.classList.remove('popup--shown');
  };


  var prepareSlider = function (target) {
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

    swiper = new Swiper(slider, {
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
    if (evt.target.classList.contains('gallery__item-link')) {
      evt.preventDefault();

      bodyScrollLock.disableBodyScroll(popup);
      popup.classList.add('popup--shown');

      prepareSlider(evt.target);
    }
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.const.keyCode.ESC && popup.classList.contains('popup--shown')) {
      evt.preventDefault();

      closePopup();
    }
  };


  overlay.addEventListener('click', closePopup);
  closeBtn.addEventListener('click', closePopup);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscPress);
})();

'use strict';


(function () {
  var galleries = document.querySelectorAll('.gallery');

  if (!galleries.length) {
    return;
  }


  galleries.forEach(function (gallery) {
    var previews = gallery.querySelectorAll('.gallery__item-link');

    previews.forEach(function (preview, i) {
      preview.dataset.index = i;
    });

    new Swiper(gallery, {
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


  var windowWidth = document.documentElement.clientWidth;


  var topBar = header.querySelector('.page-header__bar');

  var menu = header.querySelector('.main-menu');
  var menuContainer = menu.querySelector('.container');

  var menuBtn = header.querySelector('.menu-btn');
  var menuBtnText = menuBtn.querySelector('.menu-btn__text');


  var adjustMenuHeight = function () {
    menu.style.height = header.classList.contains('page-header--open-menu') && document.documentElement.clientWidth < window.const.resolution.DESKTOP ? window.innerHeight - topBar.offsetHeight + 'px' : '';
  };


  var openMenu = function () {
    header.classList.add('page-header--open-menu');
    bodyScrollLock.disableBodyScroll(menuContainer);

    menuBtn.classList.add('menu-btn--close');
    menuBtnText.textContent = 'Закрыть основное меню';
  };

  var closeMenu = function () {
    header.classList.remove('page-header--open-menu');
    bodyScrollLock.enableBodyScroll(menuContainer);

    menuBtn.classList.remove('menu-btn--close');
    menuBtnText.textContent = 'Открыть основное меню';
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
    header.classList.remove('page-header--above-content');

    adjustPageContentTopPadding();
    adjustHeaderAppearance();
  };


  header.classList.add('page-header--js');

  adjustPageContentTopPadding();
  adjustHeaderAppearance();


  document.addEventListener('scroll', adjustHeaderAppearance);
  window.addEventListener('resize', onWindowResize);
})();

'use strict';


(function () {
  var panel = document.querySelector('.project-page__panel');

  if (!panel) {
    return;
  }


  panel.classList.add('project-page__panel--js');

  new Sticky('.project-page__panel');
})();

'use strict';


(function () {
  var textItems = document.querySelectorAll('.project-page__text');

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
    if (evt.target.classList.contains('project-page__text-btn')) {
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
  var vote = document.querySelector('.project-vote');
  var popup = document.querySelector('.vote-popup');

  if (!vote || !popup) {
    return;
  }


  var submitForm = vote.querySelector('.project-vote__submit-form form');
  var revokeBtn = vote.querySelector('.project-vote__revoke-btn');

  var popupBtn = popup.querySelector('.vote-popup__revoke-btn');

  var popupShownTimeout = null;

  var approveValue = +vote.querySelector('.vote-results__value--approve').textContent.replace(/\s+/g, '');
  var rejectValue = +vote.querySelector('.vote-results__value--reject').textContent.replace(/\s+/g, '');

  var scaleIndicator = vote.querySelector('.vote-results__indicator');


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
  var list = document.querySelector('.projects__list');

  if (!list) {
    return;
  }

  var ellipsis = new Ellipsis({
    lines: 3
  });

  var titles = list.querySelectorAll('.project-item__title');

  ellipsis.add(titles);
})();

'use strict';

(function () {
  var rangeSlider = document.getElementById('poll-range');
  if (!rangeSlider) {
    return;
  }

  noUiSlider.create(rangeSlider, {
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
    format: wNumb({
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
    var popupCloseBtn = popup.querySelector('.js-close-popup');
    var listsOptions = popup.querySelectorAll('.special-popup__list');

    listsOptions.forEach(function (list) {
      var btns = list.querySelectorAll('button');

      btns.forEach(function (btn) {
        btn.addEventListener('click', function (evt) {
          evt.preventDefault();
          btns.forEach(function (btn) {
            btn.classList.remove('active');
          });
          btn.classList.add('active');
        });
      });
    });

    btnsOpenPopup.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();
        popup.classList.remove(hideClass);
      });
    });

    popupCloseBtn.addEventListener('click', function () {
      popup.classList.add(hideClass);
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.const.keyCode.ESC) {
        evt.preventDefault();
        popup.classList.add(hideClass);
      }
    });
  }

})();

'use strict';


(function () {
  var subscribeLink = document.querySelector('.social__link--subscribe, .social__link--unsubscribe');

  if (!subscribeLink) {
    return;
  }


  var onSubscribeLinkClick = function (evt) {
    evt.preventDefault();

    if (subscribeLink.classList.contains('social__link--subscribe')) {
      subscribeLink.textContent = 'Отписаться';

      subscribeLink.classList.remove('social__link--subscribe');
      subscribeLink.classList.add('social__link--unsubscribe');
    } else {
      subscribeLink.textContent = 'Подписаться';

      subscribeLink.classList.add('social__link--subscribe');
      subscribeLink.classList.remove('social__link--unsubscribe');
    }
  };


  subscribeLink.addEventListener('click', onSubscribeLinkClick);
})();

'use strict';

(function () {
  var textContainers = document.querySelectorAll('.text-hidden');
  if (!textContainers.length) {
    return;
  }

  Array.prototype.forEach.call(textContainers, function (textContainer) {
    var btnTextOpen = textContainer.querySelector('.text-hidden__btn');
    var btnText = textContainer.querySelector('.text-hidden__btn span');
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
  var upBtn = document.querySelector('.page-body__up-btn');
  var container = document.querySelector('footer .container');

  if (!upBtn) {
    return;
  }


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
    };

    var onWindowResize = function () {
      adjustUpBtnPosition();
    };

    adjustUpBtnPosition();

    window.addEventListener('resize', onWindowResize);
  }


  upBtn.addEventListener('click', onUpBtnClick);
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
