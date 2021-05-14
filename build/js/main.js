'use strict';

(function () {
  var buttonsFavorite = document.querySelectorAll('.js-button-favorive');

  if (!buttonsFavorite) {
    return;
  }

  var activeClass = 'button-star--active';

  function favoriteClickHanler(evt) {
    var target = evt.target;

    target.classList.toggle(activeClass);
  }

  buttonsFavorite.forEach(function(button) {
    button.addEventListener('click', favoriteClickHanler);
  });
})();

'use strict';


(function () {

  var modal = function (btns, popup) {
    Array.prototype.forEach.call(btns, function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();

        window.openPopup(popup);
        var textsHidden = popup.querySelectorAll('.js-text-hidden');
        if (textsHidden.length) {
          window.openText(textsHidden);
        }

        window.initTable();
      });
    });
  };

  var popupCommentAdd = document.querySelector('.js-comment-popup--add');
  var btnsCommentAdd = document.querySelectorAll('.js-comment-add');

  if (popupCommentAdd && btnsCommentAdd.length) {
    modal(btnsCommentAdd, popupCommentAdd);
  }

  var popupCommentEdit = document.querySelector('.js-comment-popup--edit');
  var btnsCommentEdit = document.querySelectorAll('.js-comment-edit');

  if (popupCommentEdit && btnsCommentEdit.length) {
    modal(btnsCommentEdit, popupCommentEdit);
  }

  var popupCommentYour = document.querySelector('.js-comment-popup--your');
  var btnsCommentYour = document.querySelectorAll('.js-comment-your');

  if (popupCommentYour && btnsCommentYour.length) {
    modal(btnsCommentYour, popupCommentYour);
  }

  var popupTable = document.querySelector('.js-table-popup');
  var btnsTable = document.querySelectorAll('.js-table');

  if (popupTable && btnsTable.length) {
    modal(btnsTable, popupTable);
  }

  var popupCommentTable = document.querySelector('.js-comment-popup--table');
  var btnsCommentTable = document.querySelectorAll('.js-comment-table');

  if (popupCommentTable && btnsCommentTable.length) {
    modal(btnsCommentTable, popupCommentTable);
  }

})();

'use strict';

(function () {
    if (document.querySelector('.commentary-add')) {
        var textareaContainer = document.querySelector('.commentary-add__textarea');
        var textarea = textareaContainer.querySelector('textarea');
        var errorField = textareaContainer.querySelector('#textarea-error-field');

        textarea.addEventListener('input', function () {
            if (textarea.value.length >= 500) {
                textareaContainer.classList.add('commentary-add__textarea--warning');
                errorField.textContent = 'Осталось символов: ' + Math.abs(1000 - textarea.value.length);
            } else {
                textareaContainer.classList.remove('commentary-add__textarea--warning');
            }

            if (textarea.value.length >= 1000) {
                textareaContainer.classList.add('commentary-add__textarea--error');
                errorField.textContent = 'Вы превысили лимит символов на ' + Math.abs(1000 - textarea.value.length);
            } else {
                textareaContainer.classList.remove('commentary-add__textarea--error');
            }
        });
    }
})();
'use strict';

(function () {
    if (document.querySelector('#edit-comment')) {
        var commentsContainer = document.querySelector('.hearings__comments');
        var yourComment = document.querySelector('.your-comment');
        var editTemplate = document.querySelector('#edit-comment-block');
        var editBtn = yourComment.querySelector('#edit-comment');
        var deleteBtn = yourComment.querySelector('#delete-comment');
        var yourText = yourComment.querySelector('.your-comment__text');

        deleteBtn.addEventListener('click', function (evt) {
            evt.preventDefault();
            yourComment.remove();
        });

        editBtn.addEventListener('click', function (evt) {
            evt.preventDefault();
            yourComment.classList.add('visually-hidden');
            var clone = editTemplate.content.firstElementChild.cloneNode(true);
            var textareaContainer = clone.querySelector('.commentary-add__textarea');
            var textarea = textareaContainer.querySelector('textarea');
            var errorField = textareaContainer.querySelector('#textarea-error-field');
            var saveBtn = clone.querySelector('#commentary-save');

            clone.querySelector('textarea').value = yourText.innerText;

            textarea.addEventListener('input', function () {
                if (textarea.value.length >= 500) {
                    textareaContainer.classList.add('commentary-add__textarea--warning');
                    errorField.textContent = 'Осталось символов: ' + Math.abs(1000 - textarea.value.length);
                } else {
                    textareaContainer.classList.remove('commentary-add__textarea--warning');
                }

                if (textarea.value.length >= 1000) {
                    textareaContainer.classList.add('commentary-add__textarea--error');
                    errorField.textContent = 'Вы превысили лимит символов на ' + Math.abs(1000 - textarea.value.length);
                } else {
                    textareaContainer.classList.remove('commentary-add__textarea--error');
                }
            });

            saveBtn.addEventListener('click', function () {
                evt.preventDefault();
                if (textarea.value.length > 0 && textarea.value.length < 1000) {
                    yourText.innerText = textarea.value;
                    clone.remove();
                    yourComment.classList.remove('visually-hidden');
                }
            });

            commentsContainer.prepend(clone);
        });
    }
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
  var modals = document.querySelectorAll('.confirmation-popup[data-modal]');
  if (modals.length) {
    modals.forEach(function (modal) {
      var modalAttr = modal.getAttribute('data-modal');
      var popUpBody = modal.querySelector('.confirmation-popup__body');
      var popUpOpenbtn = document.querySelectorAll('button[data-modal="' + modalAttr + '"]');
      var popUpClosebtn = modal.querySelector('.confirmation-popup__close-btn');
      var popUpBackbtn = modal.querySelector('.confirmation-popup__back-btn');
      var KeyCodes = {
        ESC: 27,
      };

      var isEscEvent = function (evt, action) {
        if (evt.keyCode === KeyCodes.ESC) {
          action();
        }
      };

      var onPopupEscPress = function (evt) {
        isEscEvent(evt, closePopup);
      };

      var openPopup = function () {
        modal.classList.add('confirmation-popup--show');
        document.querySelector('body').style.overflow = 'hidden';
        document.addEventListener('keydown', onPopupEscPress);
      };

      var closePopup = function () {
        modal.classList.remove('confirmation-popup--show');
        document.querySelector('body').style.overflow = 'visible';
        document.removeEventListener('keydown', onPopupEscPress);
      };

      popUpOpenbtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
          openPopup();
        });
      });

      popUpClosebtn.addEventListener('click', closePopup);
      popUpBackbtn.addEventListener('click', closePopup);
      modal.addEventListener('click', closePopup);
      popUpBody.addEventListener('click', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      });
    });
  }
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
  var togglers = document.querySelectorAll('.js-collapse-button');
  var collapsedContents = document.querySelectorAll('.js-collapse-content');

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      // eslint-disable-next-line no-invalid-this
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
      if (immediate && !timeout) {
        func.apply(context, args);
      }
    };
  }

  if (collapsedContents.length) {
    var setWidthVariable = debounce(function () {
      collapsedContents.forEach(function (el) {
        el.style.setProperty('--height', el.scrollHeight + 'px');
      });
    }, 250);

    setWidthVariable();
    window.addEventListener('resize', function () {
      setWidthVariable();
    });
  }

  if (togglers.length) {
    togglers.forEach(function (toggler) {
      var content = toggler.parentElement.querySelector('.js-collapse-content');
      var text = toggler.querySelector('span');

      var collapseContent = function () {
        if (content.getAttribute('data-collapsed') === 'false') {
          content.setAttribute('data-collapsed', 'true');
          text.textContent = 'Контакты';
          toggler.classList.remove('collapsed');
        } else {
          content.setAttribute('data-collapsed', 'false');
          text.textContent = 'Свернуть';
          toggler.classList.add('collapsed');
        }
      };
      collapseContent();
      toggler.addEventListener('click', collapseContent);
    });
  }
})();

'use strict';
(function () {
  var container = document.querySelector('.js-upload-file-container');

  if (container) {
    var input = container.querySelector('input[id="user-files"]');
    var initialInput = input.cloneNode(true);
    var label = container.querySelector('label[for="user-files"]');
    var previewContainer = container.querySelector('.file-uploads__preview-container');
    var files = [];
    var MAX_FILES_NUMBER = 5;

    var checkPreviousFiles = function () {
      var prevFiles = previewContainer.querySelectorAll('.file-wrapper');
      prevFiles.forEach(function (item) {
        var child = item.querySelector('span');
        files.push(child);
        renderCloseBtn(item, child);
      });
    };

    var checkInputVisible = function () {
      if (files.length === MAX_FILES_NUMBER) {
        label.classList.add('visually-hidden');
      } else {
        label.classList.remove('visually-hidden');
      }
    };

    var cloneInput = function (fileContainer) {
      var currentInput = container.querySelector('#user-files');
      var newInput = currentInput.cloneNode(true);
      newInput.removeAttribute('id');
      fileContainer.appendChild(newInput);
    };

    var renderCloseBtn = function (btnContainer, file) {
      var button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('aria-label', 'удалить загруженные данные');
      btnContainer.appendChild(button);
      button.addEventListener('click', function () {
        btnContainer.remove();
        var index = files.indexOf(file);
        if (index > -1) {
          files.splice(index, 1);
          checkInputVisible();
        }
      });
    };

    var renderPreview = function (file) {
      var fileContainer = document.createElement('div');
      fileContainer.classList.add('file-wrapper');
      var fileTitle = document.createElement('span');
      fileTitle.textContent = file.name;
      fileContainer.appendChild(fileTitle);
      renderCloseBtn(fileContainer, file);
      previewContainer.appendChild(fileContainer);
      cloneInput(fileContainer);
    };

    checkPreviousFiles();
    input.addEventListener('change', function () {
      if (input.files.length) {
        input.files.forEach(function (file) {
          files.push(file);
          checkInputVisible();
          renderPreview(file);
        });
      }
      input.files = initialInput.files;
    });
  }
})();

'use strict';


(function () {

    var initJsFilter = function (filter) {
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
    };

  var filter = document.querySelector('.js-filter');

  initJsFilter(filter);

  window.initJsFilter = initJsFilter;
})();

'use strict';


(function () {
  var selects = document.querySelectorAll('.js-form-select select:not([multiple])');


  var deselectLabel = '<button type="button"><span class="visually-hidden">Сбросить фильтр по голосам</span><svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 1L11 11M11 1L1 11" stroke-width="2"/></svg></button>';


  var addSelect = function (el) {
    var customSelectInstance = new window.SlimSelect({
      select: el,
      showSearch: false,
      showContent: 'down',

      placeholder: el.dataset.placeholderText ? el.dataset.placeholderText : '',

      allowDeselect: el.dataset.deselect ? true : false,
      deselectLabel: deselectLabel,

      afterClose: function () {
        window.Scrollbar.destroy(customSelectElement.querySelector('.ss-list'));
      },

      afterOpen: function () {
        window.Scrollbar.init(customSelectElement.querySelector('.ss-list'), {
          continuousScrolling: false
        });
      },
    });

    var customSelectElement = customSelectInstance.slim.container;

    var selectOptions = el.querySelectorAll('option[title]');
    var customSelectOptions = customSelectElement.querySelectorAll('.ss-option[data-id]');

    customSelectElement.setAttribute('title', el.title);

    selectOptions.forEach(function (option, i) {
      customSelectOptions[i].setAttribute('title', option.title);
    });

    return customSelectInstance;
  };

  var addProposalSelect = function (el) {
    var customProposalSelectInstance = new window.SlimSelect({
      select: el,
      showSearch: false,
    });
    return customProposalSelectInstance;
  };

  selects.forEach(function (select) {
    addSelect(select);
  });

  var proposalSelects = document.querySelector('.js-form-select-improvement select');

  if (proposalSelects) {
    addProposalSelect(proposalSelects);
  }

  window.addSelect = addSelect;
})();

'use strict';


(function () {
    var popup = document.querySelector('.js-gallery-popup');

    if (!popup) {
        return;
    }

    var hideClass = 'd-none';
    var slider = popup.querySelector('.js-gallery-popup__frame');
    var prevBtn = popup.querySelector('.js-gallery-popup__nav-btn--prev');
    var nextBtn = popup.querySelector('.js-gallery-popup__nav-btn--next');

    var description = popup.querySelector('.js-gallery-popup__photo-description');
    var currentCounter = popup.querySelector('.js-gallery-popup__counter-current');
    var totalCounter = popup.querySelector('.js-gallery-popup__counter-total');
    var popupBarBottom = popup.querySelector('.popup__bar--bottom');

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

        if (items.length <= 1) {
          popupBarBottom.classList.add(hideClass);
        }
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
    if (document.querySelector('.hearings-result__status-info')) {
        var resultContainer = document.querySelector('.hearings__result');
        var statusInfo = resultContainer.querySelector('.hearings-result__status-info');
        var pollResultTemplate = document.querySelector('#poll-result');

        statusInfo.addEventListener('click', function (evt) {
            evt.preventDefault();
            statusInfo.remove();
            var clone = pollResultTemplate.content.firstElementChild.cloneNode(true);
            resultContainer.append(clone);
        });

    }
})();
'use strict';
(function () {
  var initInfoBannerToggle = function (banner) {
    var bannerText = banner.querySelector('.info-banner__text');
    var bannerToggleTextButton = banner.querySelector('.info-banner__button');

    if (bannerText && bannerToggleTextButton && !banner.classList.contains('info-banner_enough-lines_true') && !banner.classList.contains('info-banner_enough-lines_false')) {

      var textSpan = bannerToggleTextButton.querySelector('.info-banner-button__text');
      var changeButtonText = function () {
        if (bannerToggleTextButton.classList.contains('opened')) {
          textSpan.textContent = 'Свернуть';
        } else {
          textSpan.textContent = 'Развернуть';
        }
      };
      // Количество строк текста
      var bannerTextHeight = bannerText.getBoundingClientRect().height;
      var bannerTextLineHeight = +getComputedStyle(
          bannerText
      ).lineHeight.replace('px', '');
      var bannerTextLines = Math.ceil(
          bannerTextHeight / bannerTextLineHeight
      );

      console.log(bannerTextLines);

      // Максимально допустимое количество строк
      var maxLinesAmount = 3;

      // Если в блоке есть заголовок, то максимальное количество строк отличается по макету, но в ТЗ речь про 3 при любых условиях
      if (banner.querySelector('.info-banner__title')) {
        maxLinesAmount = 2;
      }

      if (bannerTextLines > maxLinesAmount) {
        banner.classList.add('info-banner_enough-lines_true');

        bannerToggleTextButton.addEventListener('click', function (e) {
          e.currentTarget.classList.toggle('opened');
          bannerText.classList.toggle('opened');
          changeButtonText();
        });
      } else {
        banner.classList.add('info-banner_enough-lines_false');
        changeButtonText();
      }
    }
  };

  var infoBanner = document.querySelectorAll('.info-banner');

  if (infoBanner.length > 0) {
    infoBanner.forEach(function (banner) {
      initInfoBannerToggle(banner);
    });
  }

  window.initInfoBannerToggle = initInfoBannerToggle;
})();

'use strict';


(function () {
  var tooltips = document.querySelectorAll('.info-tooltip');

  if (!tooltips.length) {
    return;
  }


  var OFFSET = 20;


  var showTooltip = function (evt) {
    var label = evt.target.closest('.info-tooltip');

    if (label) {
      label.classList.add('shown');

      var tooltip = label.querySelector('.info-tooltip__text');
      var tooltipRect = tooltip.getBoundingClientRect();

      if (tooltipRect.left <= OFFSET) {
        tooltip.style.left = -(label.getBoundingClientRect().left - OFFSET) + 'px';

        tooltip.classList.add('info-tooltip__text--side-close');
        return;
      }

      if (tooltipRect.right >= document.documentElement.clientWidth - OFFSET) {
        tooltip.style.right = -(document.documentElement.clientWidth - label.getBoundingClientRect().right - OFFSET) + 'px';

        tooltip.classList.add('info-tooltip__text--side-close');
        return;
      }
    }
  };


  var hideTooltip = function (evt) {
    var label = evt.target.closest('.info-tooltip');

    if (label) {
      label.classList.remove('shown');

      var tooltip = label.querySelector('.info-tooltip__text');

      tooltip.classList.remove('info-tooltip__text--side-close');
      tooltip.style = '';
    }
  };


  document.addEventListener('mouseover', showTooltip);
  document.addEventListener('mouseout', hideTooltip);

  document.addEventListener('focusin', showTooltip);
  document.addEventListener('focusout', hideTooltip);
})();

'use strict';

(function () {
  var previews = document.querySelectorAll('.preview-input');
  var popup = document.querySelector('.js-popup');

  if (previews.length && popup) {

    var insertImageSrc = function (source, target) {
      var sourceSrc = source.getAttribute('src');
      if (sourceSrc) {
        target.setAttribute('src', sourceSrc);
      } else {
        target.removeAttribute('src');
      }
    };

    var insertDescription = function (source, target) {
      if (source) {
        var description = source.textContent;
        target.textContent = description;
      } else {
        target.textContent = '';
      }

    };

    previews.forEach(function (preview) {
      var zoomButton = preview.querySelector('.zoom-button');
      var previewSource = preview.querySelector('.preview-input__image-wrapper img');
      var previewDescription = preview.querySelector('.preview-input__description');
      var popupImage = popup.querySelector('.gallery-popup__frame img');
      var popupDescription = popup.querySelector('.gallery-popup__photo-description');

      zoomButton.addEventListener('click', function () {
        insertImageSrc(previewSource, popupImage);
        insertDescription(previewDescription, popupDescription);
        window.openPopup(popup);
      });
    });
  }
})();

'use strict';


(function () {
  var map = document.querySelector('.landscaping-form__section.map-section'),
    mapHidden = document.querySelector('#map-hidden'),
    mapSearch = document.querySelector('#map-search'),
    mapBlock = document.querySelector('#map'),
    userCoords = document.querySelector('#user-coords'),
    drawButton = document.querySelectorAll('.mapMenuIcon'),
    mapMenu = document.querySelector('.mapMenu');

  if (!mapBlock) {
    return;
  }
  var imagePin = mapBlock.getAttribute('data-icon');

  ymaps.ready(init);

  function init() {
    var myMap,
      suggestView = new ymaps.SuggestView('map-search'),
      myPlacemark,
      firstGeoObject,
      oldAddress;
    if(userCoords.value){
      ymaps.geocode(userCoords.value, {}).then(function (res){
        var firstGeoObject = res.geoObjects.get(0),
          coordSearch = firstGeoObject.geometry.getCoordinates();

        myMap = new ymaps.Map('map', {
          center: coordSearch,
          zoom: 15,
          controls: ['zoomControl']
        }, {
          searchControlProvider: 'yandex#search',
          suppressMapOpenBlock:true
        });
        myPlacemark = new ymaps.GeoObject({
          geometry: {
            type: "Point",
            coordinates: coordSearch
          },
        }, {
          iconLayout: 'default#image',
          iconImageHref: imagePin,
          iconImageSize: [36, 54],
          draggable: true
        });

        mapHidden.value = coordSearch;
        //добавляем метку на карту
        myMap.geoObjects
        .add(myPlacemark);

        //при перетаскивании метки меняем координаты
        myMap.geoObjects.events.add([
          'dragend'
        ], function (e) {
          var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
            myMap.converter.pageToGlobal(e.get('position')),
            myMap.getZoom()
          );
          mapHidden.value = placemarkPosition;
          getAddress(placemarkPosition);
          ymaps.geocode(placemarkPosition).then(function (res) {
            document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
            $(mapSearch).trigger('keyup');
          })
        });
        // Слушаем клик на карте.
        myMap.events.add('click', function (e) {
          var coords = e.get('coords');
          ymaps.geocode(coords).then(function (res) {
            document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
            $(mapSearch).trigger('keyup');
          })
          addMark(coords)
        });
      })
    } else if(mapHidden.value) {
      var coordHidden = mapHidden.value.split(',').map(function(item) {
        return Number(item)
      })
      myMap = new ymaps.Map('map', {
        center: coordHidden,
        zoom: 15,
        controls: ['zoomControl']
      }, {
        searchControlProvider: 'yandex#search',
        suppressMapOpenBlock:true
      });
      myPlacemark = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: coordHidden
        },
      }, {
        iconLayout: 'default#image',
        iconImageHref: imagePin,
        iconImageSize: [36, 54],
        draggable: true
      });

      ymaps.geocode(coordHidden).then(function (res) {
        document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
        $(mapSearch).trigger('keyup');
      })
      //добавляем метку на карту
      myMap.geoObjects
      .add(myPlacemark);

      //при перетаскивании метки меняем координаты
      myMap.geoObjects.events.add([
        'dragend'
      ], function (e) {
        var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
          myMap.converter.pageToGlobal(e.get('position')),
          myMap.getZoom()
        );
        mapHidden.value = placemarkPosition;
        getAddress(placemarkPosition);
        ymaps.geocode(placemarkPosition).then(function (res) {
          document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
          $(mapSearch).trigger('keyup');
        })
      });
      // Слушаем клик на карте.
      myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        ymaps.geocode(coords).then(function (res) {
          document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
          $(mapSearch).trigger('keyup');
        })
        addMark(coords)
      });
    } else if (mapSearch.value){
      ymaps.geocode(mapSearch.value, {}).then(function (res){
        var firstGeoObject = res.geoObjects.get(0),
          coordSearch = firstGeoObject.geometry.getCoordinates();

        myMap = new ymaps.Map('map', {
          center: coordSearch,
          zoom: 15,
          controls: ['zoomControl']
        }, {
          searchControlProvider: 'yandex#search',
          suppressMapOpenBlock:true
        });
        myPlacemark = new ymaps.GeoObject({
          geometry: {
            type: "Point",
            coordinates: coordSearch
          },
        }, {
          iconLayout: 'default#image',
          iconImageHref: imagePin,
          iconImageSize: [36, 54],
          draggable: true
        });

        mapHidden.value = coordSearch;
        //добавляем метку на карту
        myMap.geoObjects
        .add(myPlacemark);

        //при перетаскивании метки меняем координаты
        myMap.geoObjects.events.add([
          'dragend'
        ], function (e) {
          var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
            myMap.converter.pageToGlobal(e.get('position')),
            myMap.getZoom()
          );
          mapHidden.value = placemarkPosition;
          getAddress(placemarkPosition);
          ymaps.geocode(placemarkPosition).then(function (res) {
            document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
            $(mapSearch).trigger('keyup');
          })
        });
        // Слушаем клик на карте.
        myMap.events.add('click', function (e) {
          var coords = e.get('coords');
          ymaps.geocode(coords).then(function (res) {
            document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
            $(mapSearch).trigger('keyup');
          })
          addMark(coords)
        });
      })
    } else {
      myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 15,
        controls: ['zoomControl']
      }, {
        searchControlProvider: 'yandex#search',
        suppressMapOpenBlock:true
      });
      // myPlacemark = new ymaps.GeoObject({
      //     geometry: {
      //         type: "Point",
      //         coordinates: [55.753994, 37.622093]
      //     },
      // }, {
      //     iconLayout: 'default#image',
      //     iconImageHref: imagePin,
      //     iconImageSize: [36, 54],
      //     draggable: true
      // });
      // // //добавляем метку на карту
      // myMap.geoObjects
      //     .add(myPlacemark);

      // //при перетаскивании метки меняем координаты
      // myMap.geoObjects.events.add([
      //     'dragend'
      // ], function (e) {
      //     var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
      //         myMap.converter.pageToGlobal(e.get('position')),
      //         myMap.getZoom()
      //     );
      //     mapHidden.value = placemarkPosition;
      //     getAddress(placemarkPosition);
      //     ymaps.geocode(placemarkPosition).then(function (res) {
      //         document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
      //         $(mapSearch).trigger('keyup');
      //     })
      // });
      // // Слушаем клик на карте.
      // myMap.events.add('click', function (e) {
      //     var coords = e.get('coords');
      //     ymaps.geocode(coords).then(function (res) {
      //         document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
      //         $(mapSearch).trigger('keyup');
      //     })
      //     addMark(coords)
      // });
    }


    suggestView.events.add("select", function(e){
      ymaps.geocode(e.get('item').value, {}).then(function (res){
        var firstGeoObject = res.geoObjects.get(0),
          // Координаты геообъекта.
          coords = firstGeoObject.geometry.getCoordinates(),
          // Область видимости геообъекта.
          bounds = firstGeoObject.properties.get('boundedBy');
        oldAddress = e.get('item').value;
        addMark(coords);

        myMap.setBounds(bounds, {
          checkZoomRange: true
        });
      })
    })

    drawButton.forEach(function (item) {
      item.addEventListener('click', buttonClick)
    })

    function buttonClick (event) {
      event.preventDefault();
      drawButton.forEach(function (item) {
        item.classList.remove('active');
      })
      this.classList.add('active');
      if(this.classList.contains('mapPolygon')){
        addPolygon();
        checkMenuIcon();
      }
      if(this.classList.contains('mapLineBroken')){
        addLineBroken();
        checkMenuIcon();
      }
      if(this.classList.contains('mapLine')){
        addLine();
        checkMenuIcon();
      }
      if(this.classList.contains('mapPin')){
        addPin();
        checkMenuIcon();
      }
    }

    function checkMenuIcon() {
      drawButton.forEach(function (item) {
        if(!item.classList.contains('active')) {
          item.classList.add('disabled');
        }
      })
    }

    function addPin() {
      myPlacemark = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [55.753994, 37.622093]
        },
      }, {
        iconLayout: 'default#image',
        iconImageHref: imagePin,
        iconImageSize: [36, 54],
        draggable: true
      });
      // Добавляем многоугольник на карту.
      myMap.geoObjects.add(myPlacemark);

      //при перетаскивании метки меняем координаты
      myMap.geoObjects.events.add([
        'dragend'
      ], function (e) {
        var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
          myMap.converter.pageToGlobal(e.get('position')),
          myMap.getZoom()
        );
        mapHidden.value = placemarkPosition;
        getAddress(placemarkPosition);
        ymaps.geocode(placemarkPosition).then(function (res) {
          document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
          $(mapSearch).trigger('keyup');
        })
      });

      // Слушаем клик на карте.
      myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        ymaps.geocode(coords).then(function (res) {
          document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
          $(mapSearch).trigger('keyup');
        })
        addMark(coords)
      });
    }

    function addPolygon() {
      var myPolygon = new ymaps.Polygon([], {}, {
        editorDrawingCursor: "crosshair",
        editorMaxPoints: 5,
        strokeColor: '#0000FF',
        strokeWidth: 5
      });
      var coordsPolygon;
      // Добавляем многоугольник на карту.
      myMap.geoObjects.add(myPolygon);

      // В режиме добавления новых вершин меняем цвет обводки многоугольника.
      var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
      stateMonitor.add("drawing", function (newValue) {
        coordsPolygon = myPolygon.geometry.getCoordinates();
        if(coordsPolygon[0]){
          coordsPolygon[0].forEach(function(item, index) {
            var hello = "coords";
            var div = index + hello;
            var div = document.createElement('input');
            div.name = 'user-coords[]';
            div.type = 'hidden';
            div.value = item;
            document.querySelector('.coordsFigure').append(div);
          })
          var zoomPolygon = document.createElement('input');
          zoomPolygon.name = 'zoom';
          zoomPolygon.type = 'hidden';
          zoomPolygon.value = myMap.getZoom();
          document.querySelector('.coordsFigure').append(zoomPolygon);
          var centerPolygon = document.createElement('input');
          centerPolygon.name = 'center';
          centerPolygon.type = 'hidden';
          centerPolygon.value = myMap.getCenter();
          document.querySelector('.coordsFigure').append(centerPolygon);
        }
        myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
      });
      myPolygon.events.add('click', function () {
        console.log('polygon clicked');
      });

      stateMonitor.add('beforedrag', function () {
        console.log('polygon clicked');
      });

      // Включаем режим редактирования с возможностью добавления новых вершин.
      myPolygon.editor.startDrawing();

      // setTimeout(function(){getAddress(myPolygon.geometry.getCoordinates());},5000)
    }

    function addLineBroken() {
      var myPolyline = new ymaps.Polyline([], {}, {
        strokeColor: "#00000088",
        strokeWidth: 4,
        editorMaxPoints: 6,
        // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
        editorMenuManager: function (items) {
          items.push({
            title: "Удалить линию",
            onClick: function () {
              myMap.geoObjects.remove(myPolyline);
            }
          });
          return items;
        }
      });
      myMap.geoObjects.add(myPolyline);
      myPolyline.editor.startDrawing();
      //setTimeout(function(){alert(myPolyline.geometry.getCoordinates());},4000)
    }

    function addLine() {
      var myPolyline = new ymaps.Polyline([], {}, {
        strokeColor: "#00000088",
        strokeWidth: 2,
        editorMaxPoints: 2,
        editorMenuManager: function (items) {
          items.push({
            title: "Удалить линию",
            onClick: function () {
              myMap.geoObjects.remove(myPolyline);
            }
          });
          return items;
        }
      });
      myMap.geoObjects.add(myPolyline);
      myPolyline.editor.startDrawing();
    }

    function addMark(coords) {
      mapHidden.value = coords;
      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      }
      // Если нет – создаем.
      else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add('dragend', function () {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    }

    // Создание метки.
    function createPlacemark(coords) {
      return new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: coords
        },
      }, {
        iconLayout: 'default#image',
        iconImageHref: imagePin,
        iconImageSize: [36, 54],
        draggable: true
      });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {

      ymaps.geocode(coords).then(function (res) {
        firstGeoObject = res.geoObjects.get(0);
        myPlacemark.properties
        .set({
          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ].filter(Boolean).join(', '),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine()
        });
      });
    }
  }

})();

'use strict';

(function () {
  var container = document.querySelectorAll('.js-like-counter');
  var likesContainerClass ='js_likes_container';

  if (container.length) {
    container.forEach(function (element) {
      element.addEventListener('click', onBtnClick);
    });
  }

  function onBtnClick(evt) {
    var target = evt.currentTarget;

    if (target.parentElement.querySelector('.liked')) {
      return;
    }

    var counter = target.querySelector('span');
    var value = parseInt(counter.textContent, 10);

    if (target.classList.contains('liked')) {
      target.classList.remove('liked');
      value -= 1;
      counter.textContent = value;
      checkLikedClassFromAdjacentElement(target);
    } else {
      target.classList.add('liked');
      value++;
      counter.textContent = value;
      checkLikedClassFromAdjacentElement(target);
    }
  }

  function checkLikedClassFromAdjacentElement(el) {
    var parent = el.parentElement;
    if (parent.classList.contains(likesContainerClass)) {
      if (parent.querySelector('button:not(.liked)')) {
        parent.querySelectorAll('button').forEach(function (btn) {
          btn.removeEventListener('click', onBtnClick)
        });
      }
    }
  }
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
  var $mapBlock = $('#improvement-map');

  if (!$mapBlock.length>0) return;

  ymaps.ready(init);

  function init () {
    var myMap = new ymaps.Map($mapBlock[0], {
        center: [55.76, 37.64],
        controls: [],
        zoom: 15
      }, {
        searchControlProvider: 'yandex#search',
      }),
      objectManager = new ymaps.ObjectManager({
        // пока objectManager не нужен, но оставлю
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
      });

    // Создадим пользовательский макет ползунка масштаба.
    var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map-buttons'>" +
      "<div id='zoom-in'></div>" +
      "<div id='zoom-out'></div>" +
      "</div>", {

      // Переопределяем методы макета, чтобы выполнять дополнительные действия
      // при построении и очистке макета.
      build: function () {
        // Вызываем родительский метод build.
        ZoomLayout.superclass.build.call(this);

        // Привязываем функции-обработчики к контексту и сохраняем ссылки
        // на них, чтобы потом отписаться от событий.
        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

        // Начинаем слушать клики на кнопках макета.
        $('#zoom-in').bind('click', this.zoomInCallback);
        $('#zoom-out').bind('click', this.zoomOutCallback);
      },

      clear: function () {
        // Снимаем обработчики кликов.
        $('#zoom-in').unbind('click', this.zoomInCallback);
        $('#zoom-out').unbind('click', this.zoomOutCallback);

        // Вызываем родительский метод clear.
        ZoomLayout.superclass.clear.call(this);
      },

      zoomIn: function () {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
      },

      zoomOut: function () {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
      }
    }),
    zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

    // Создадим пользовательский макет геолокации.
    var UserLocationLayout = ymaps.templateLayoutFactory.createClass("<div>" +
      "<div id='user-location'></div>", {

      // Переопределяем методы макета, чтобы выполнять дополнительные действия
      // при построении и очистке макета.
      build: function () {
        // Вызываем родительский метод build.
        UserLocationLayout.superclass.build.call(this);

        // Привязываем функции-обработчики к контексту и сохраняем ссылки
        // на них, чтобы потом отписаться от событий.
        this.getLocation = ymaps.util.bind(this.userLocation, this);

        // Начинаем слушать клики на кнопках макета.
        $('#user-location').bind('click', this.getLocation);
      },

      clear: function () {
        // Снимаем обработчики кликов.
        $('#user-location').unbind('click', this.getLocation);

        // Вызываем родительский метод clear.
        UserLocationLayout.superclass.clear.call(this);
      },

      userLocation: function () {
        var geolocation = ymaps.geolocation;
        geolocation.get({
          provider: 'browser',
          mapStateAutoApply: true
        }).then(function (result) {
          result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
          myMap.geoObjects.add(result.geoObjects);
        });
      },
    });
    var locationControl = new ymaps.control.GeolocationControl({options: {layout: UserLocationLayout}});

    if(window.innerWidth >= 400) {
      myMap.controls.add(zoomControl, {
        float: 'none',
        position: {
          right: '8px',
          top: '244px',
        }
      });

      myMap.controls.add(locationControl, {
        float: 'none',
        position: {
          right: '8px',
          top: '324px',
        }
      });
    }

    var balloonOffset = [];

    if(window.innerWidth < 400) {
      balloonOffset = [-5, 32]
    } else {
      balloonOffset = [43, -27]
    }

    var clusterer = new ymaps.Clusterer({
        // Зададим массив, описывающий иконки кластеров разного размера.
        clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon"><span>{{ properties.geoObjects.length }}</span></div>'),
        // Чтобы метка была кликабельной, переопределим ее активную область.
        clusterIconShape: {
          type: 'Rectangle',
          coordinates: [[0, 0], [49, 49]]
        }
    });

    myMap.events.add('balloonopen', function (e) {
          var target = e.get('target');
          target.options.set({
                iconImageHref: 'img/pin-hover.svg',
          });
    });

    myMap.events.add('balloonclose', function (e) {
          var target = e.get('target');
          target.options.set({
                iconImageHref: 'img/pin.svg',
          });
    });

    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover right">' +
      '<button type="button" aria-label="Закрыть информацию" class="close"></button>' +
      '<div class="arrow"></div>' +
      '<div class="popover-inner">' +
      '$[[options.contentLayout observeSize minWidth=300 maxWidth=300 maxHeight=500]]' +
      '</div>' +
      '</div>', {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = $('.popover', this.getParentElement());

          this.applyElementOffset();

          this._$element.find('.close')
            .on('click', $.proxy(this.onCloseClick, this));
        },

        /**
         * Удаляет содержимое макета из DOM.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
         * @function
         * @name clear
         */
        clear: function () {
          this._$element.find('.close')
            .off('click');

          this.constructor.superclass.clear.call(this);
        },

        /**
         * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onSublayoutSizeChange
         */
        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if(!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();

          this.events.fire('shapechange');
        },

        /**
         * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name applyElementOffset
         */
        applyElementOffset: function () {
          if(window.innerWidth < 400) {
            this._$element.css({
              top: 0
            });
          } else {
            this._$element.css({
              top: -(this._$element[0].offsetHeight/2)
            });
          }
        },

        /**
         * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onCloseClick
         */
        onCloseClick: function (e) {
          e.preventDefault();

          this.events.fire('userclose');
        },

        /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape: function () {
          if(!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          var position = this._$element.position();

          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
            [position.left, position.top], [
              position.left + this._$element[0].offsetWidth + 200,
              position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
            ]
          ]));
        },

        /**
         * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
         * @function
         * @private
         * @name _isElement
         * @param {jQuery} [element] Элемент.
         * @returns {Boolean} Флаг наличия.
         */
        _isElement: function (element) {
          return element && element[0] && element.find('.arrow')[0];
        }
      });

    // var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    //   '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
    //   '<div class="popover-content">$[properties.balloonContent]</div>'
    // );
    var dataLink = $mapBlock.data('link');

    ymaps.geoXml.load(dataLink)
      .then(function (res) {
        var myObjects = res.geoObjects.toArray();
        if(myObjects.length > 0) {
          myMap.setCenter([myObjects[0].geometry._coordinates[0], myObjects[0].geometry._coordinates[1]])
        }
        for (var i=0; i< myObjects.length; i++) {
          if(!myObjects[i].geometry._coordPath) {
            myObjects[i].options.set({
              balloonLayout: MyBalloonLayout,
              // balloonContentLayout: MyBalloonContentLayout,
              iconLayout: 'default#image',
              iconImageHref: 'img/pin.svg',
              iconImageSize: [28, 40],
              hideIconOnBalloonOpen: false,
              balloonPanelMaxMapArea: 0,
              balloonOffset: balloonOffset
            })
            clusterer.add(myObjects[i]);
          } else {
            myMap.geoObjects.add(myObjects[i]);
          }
        }
        myMap.geoObjects.add(clusterer);
        if (res.mapState) {
          res.mapState.applyToMap(myMap);
        }
        else {
          myMap.setBounds(res.geoObjects.getBounds());
        }
      });
  }
})();

'use strict';


(function () {
  var toggle = document.querySelector('.js-moderator-comments');

  if (toggle) {
    var container = toggle.parentElement;

    var setContainerHeight = function () {
      var containerHeight = container.scrollHeight;
      container.style.height = containerHeight + 'px';
    };

    var checkContainerHeight = window.debounce(function () {
      container.style.height = 'auto';
      container.style.height = container.scrollHeight + 'px';
    }, 150);

    toggle.addEventListener('click', function () {
      if (!container.classList.contains('comments-tab--opened')) {
        container.classList.add('comments-tab--opened');
        setContainerHeight();
        window.addEventListener('resize', checkContainerHeight);
      } else {
        container.classList.remove('comments-tab--opened');
        container.removeAttribute('style');
        window.removeEventListener('resize', checkContainerHeight);
      }
    });
  }
})();

'use strict';


(function () {
  var selects = document.querySelectorAll('.js-multiple-select');

  var addSelect = function (el) {
    var multipleSelectInstance = new window.SlimSelect({
      select: el,
      showSearch: false,
      showContent: 'down',
      allowDeselectOption: true,
      closeOnSelect: false,
      placeholder: el.dataset.placeholderText ? el.dataset.placeholderText : '',

      allowDeselect: el.dataset.deselect ? true : false,

      afterOpen: function () {
        window.Scrollbar.init(selectContainer.querySelector('.ss-content'), {
          continuousScrolling: false
        });
      },

      beforeOpen: function () {
        calcWidthBasedOnPosition();
      },

      afterClose: function () {
        window.Scrollbar.destroy(selectContainer.querySelector('.ss-content'));
        removeCalculatedWidth();
      },

      onChange: function () {
        selectChangeHandler();
      }
    });

    var selectContainer = multipleSelectInstance.slim.container;

    var selectChangeHandler = function () {
      toggleDeselectAllButton();
      updateCounter();
    };

    var calcWidthBasedOnPosition = function () {
      var COL_WIDTH = 312;
      var menu = selectContainer.querySelector('.ss-content');
      //var {x, width} = menu.getBoundingClientRect();
      var x = menu.getBoundingClientRect().x;
      var width = menu.getBoundingClientRect().width;
      //console.log(width);
      var viewportWidth = window.innerWidth;

      var currentColNumber = getComputedStyle(selectContainer).getPropertyValue('--colNum');
      //console.log(currentColNumber);
      var rightGapWidth = viewportWidth - (x + width);
      //console.log(rightGapWidth);

      if (rightGapWidth >= 16) {
        return;
      }

      if (!rightGapWidth - COL_WIDTH) {
        selectContainer.setAttribute('style', '--colNum:' + (currentColNumber - 1));
        return;
      }

      if (!rightGapWidth - COL_WIDTH * 2) {
        selectContainer.setAttribute('style', '--colNum:' + (currentColNumber - 2));
        return;
      }
    };

    var removeCalculatedWidth = function () {
      selectContainer.removeAttribute('style');
    };

    var createDeselectAllButton = function () {
      var button = document.createElement('button');
      button.classList.add('ss-deselect-all');
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        multipleSelectInstance.set([]);
      });
      return button;
    };

    var toggleDeselectAllButton = function () {
      if (multipleSelectInstance.selected().length) {
        selectContainer.querySelector('.ss-add').classList.remove('ss-empty');
      } else {
        selectContainer.querySelector('.ss-add').classList.add('ss-empty');
      }
    };

    var updateCounter = function () {
      if (multipleSelectInstance.selected().length) {
        selectContainer.querySelector('.ss-plus').textContent = 'Категорий выбрано: ' + multipleSelectInstance.selected().length;
      } else {
        selectContainer.querySelector('.ss-plus').textContent = el.dataset.placeholderText;
      }
    };

    var createArrow = function () {
      var parent = document.createElement('div');
      parent.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.9833 12L8 7.02703L3.01667 12L1.5 10.4865L8 4L14.5 10.4865L12.9833 12Z" fill="#2C8ECC"/></svg>';
      return parent.children[0];
    };

    selectContainer.querySelector('.ss-add').classList.add('ss-empty');
    selectContainer.querySelector('.ss-add').prepend(createDeselectAllButton());
    selectContainer.querySelector('.ss-add').appendChild(createArrow());
    selectContainer.querySelector('.ss-plus').textContent = el.dataset.placeholderText;

    return multipleSelectInstance;
  };

  selects.forEach(function (select) {
    addSelect(select);
  });

  window.addSelect = addSelect;
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
  var panelOffsetBottom = 50;

  var checkPanelHeight = function () {
    var mainContent = document.querySelector('.container--desktop-only');
    var mainContentHeight = mainContent.getBoundingClientRect().height;
    var panelHeight = panel.getBoundingClientRect().height;
    var infoBanner = mainContent.querySelector('.info-banner')
    var infoBannerHeight = 0

    if (infoBanner) {
      infoBannerHeight = infoBanner.getBoundingClientRect().height;
    }

    if (mainContentHeight && panelHeight) {
      mainContent.style.minHeight = panelHeight + panelOffsetBottom + infoBannerHeight + 'px';
    }
  };

  checkPanelHeight();

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
    if (document.querySelector('.proposal-winners__show-map-btn')) {
        var mapBtn = document.querySelector('.proposal-winners__show-map-btn');
        var map = document.querySelector('.proposal-winners__map');
        var closeMapBtn = document.querySelector('.proposal-winners__close-map-btn');

        mapBtn.addEventListener('click', function () {
            map.classList.add('proposal-winners__map--show');
        });

        closeMapBtn.addEventListener('click', function () {
            map.classList.remove('proposal-winners__map--show');
        });
    }
})();

'use strict';
(function () {
  function getCloseBtn() {
    var $btn = document.createElement('button');
    $btn.setAttribute('type', 'button');
    $btn.setAttribute('aria-label', 'удалить загруженное изображение');
    return $btn;
  }

  function addFunctionailtyToCloseBtn($closeBtn, $elToDelete, $inputsContainer) {
    $closeBtn.addEventListener('click', function () {
      $elToDelete.remove();

      if (!isBlankUploadElExist($inputsContainer) && !isMaxAmountOfImagesAchieved($inputsContainer)) {
        addBlankUploadEl($inputsContainer);
      }
    }, {once: true});
  }

  function getPreviewImg(imageUrl) {
    var $previewImg = document.createElement('img');
    $previewImg.setAttribute('src', imageUrl);
    return $previewImg;
  }

  function makeElLoaded($inputsContainer, $imgUploadEl, $previewImg) {
    $imgUploadEl.classList.add('image-loaded');
    var $closeBtn = getCloseBtn();
    addFunctionailtyToCloseBtn($closeBtn, $imgUploadEl, $inputsContainer);
    $imgUploadEl.appendChild($closeBtn);

    if ($previewImg) {
      $imgUploadEl.append($previewImg);
    }
  }

  function isBlankUploadElExist($inputsContainer) {
    return !!$inputsContainer.querySelector('.image-uploads__image-wrapper:not(.image-loaded)');
  }

  function isMaxAmountOfImagesAchieved($inputsContainer) {
    return $inputsContainer.querySelectorAll('.image-uploads__image-wrapper').length === 5;
  }

  function getFileInput(inputName) {
    var $fileInput = document.createElement('input');
    $fileInput.classList.add('visually-hidden');
    $fileInput.setAttribute('type', 'file');
    $fileInput.setAttribute('name', inputName);
    $fileInput.setAttribute('accept', 'image/png, image/jpeg, image/jpg, image/gif');
    $fileInput.setAttribute('accept', 'image/png, image/jpeg, image/jpg, image/gif');
    $fileInput.setAttribute('aria-label', 'user-images');
    return $fileInput;
  }

  function getCaption() {
    var $caption = document.createElement('span');
    $caption.innerHTML = 'Загрузить изображение';
    return $caption;
  }

  function getUploadEl() {
    var $uploadEl = document.createElement('div');
    $uploadEl.classList.add('image-uploads__image-wrapper');
    return $uploadEl;
  }

  function addBlankUploadEl($inputsContainer, inputName) {
    var $uploadEl = getUploadEl();

    var $fileInput = getFileInput(inputName);
    addFunctionailtyToFileInput($fileInput, $uploadEl, inputName);

    var $caption = getCaption();

    $uploadEl.append($fileInput, $caption);

    $inputsContainer.append($uploadEl);
  }

  function addFunctionailtyToFileInput($fileInput, $imgUploadEl, inputName) {
    $fileInput.addEventListener('change', function (e) {
      var $target = e.target;
      var file = $target.files[0];
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var $previewImg = getPreviewImg(reader.result);
        makeElLoaded($inputsContainer, $imgUploadEl, $previewImg);

        if (!isBlankUploadElExist($inputsContainer) && !isMaxAmountOfImagesAchieved($inputsContainer)) {
          addBlankUploadEl($inputsContainer, inputName);
        }
      });

      reader.readAsDataURL(file);
    });
  }


  var $inputsContainer = document.querySelector('.js-upload-image-container');

  if ($inputsContainer) {
    var $imgUploadEls = document.querySelectorAll('.image-uploads__image-wrapper');

    var inputName = ' ';

    if ($imgUploadEls.length > 0) {
      for (var i = 0; i < $imgUploadEls.length; i++) {
        var $input = $imgUploadEls[i].querySelector('input[type="file"]');

        if ($input) {
          var attr = $input.getAttribute('name');

          if (attr) {
            inputName = attr;
            break;
          }
        }
      }
    }

    $imgUploadEls.forEach(function ($imgUploadEl) {
      var $loadedImg = $imgUploadEl.querySelector('img');

      if ($loadedImg) {
        makeElLoaded($inputsContainer, $imgUploadEl);
      } else {
        var $fileInput = $imgUploadEl.querySelector('input[type="file"]');
        addFunctionailtyToFileInput($fileInput, $imgUploadEl, inputName);
      }
    });
  }
})();

'use strict';

function initRangeSlider(rangeSlider) {
  if (!rangeSlider) {
    return;
  }

  var input = document.getElementById(rangeSlider.dataset.input);

  if (input) {
    var min = parseInt(rangeSlider.dataset.min, 10);
    var max = parseInt(rangeSlider.dataset.max, 10);
    var start = input.value ? input.value : max / 2;
    window.noUiSlider.create(rangeSlider, {
      start: start,
      behaviour: 'snap',
      connect: 'lower',
      step: parseInt(rangeSlider.dataset.step, 10),
      range: {
        'min': [min],
        'max': [max]
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

    rangeSlider.noUiSlider.on('update', function (values, handle) {

      var value = values[handle];
      var maxPos = Math.max(values);
      var pips = rangeSlider.querySelectorAll('.noUi-marker-horizontal.noUi-marker-sub');

      input.value = value;

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
  }
}
document.querySelectorAll('.js-poll-range').forEach(function (item) {
  initRangeSlider(item);
});


'use strict';
(function () {
  var $ajaxWrappers = document.querySelectorAll('.js-ajax-wrapper');

  var callback = function (mutationsList) {
    Object.values(mutationsList).forEach(function (mutation) {
      if (mutation.type === 'attributes') {
        var $infoBanners = document.querySelectorAll('.info-banner');

        if ($infoBanners.length > 0) {
          $infoBanners.forEach(function ($infoBanner) {
            window.initInfoBannerToggle($infoBanner);
          });
        }

        var $selects = document.querySelectorAll('.js-ajax-wrapper select');

        if ($selects.length > 0) {
          $selects.forEach(function ($select) {
            if (!$select.getAttribute('data-ssid')) {
              window.addSelect($select);
            }
          });
        }
      }
    });
  };

  var observer = new MutationObserver(callback);

  if ($ajaxWrappers.length > 0) {
    $ajaxWrappers.forEach(function ($ajaxWrapper) {
      observer.observe($ajaxWrapper, {attributes: true, childList: true, subtree: true});
    });
  }
})();

'use strict';

(function () {
  var targets = document.querySelectorAll('.ss-main.js-multiple-select');

  if (targets.length) {
    targets.forEach(function (target) {
      var elementsList = target.querySelector('.ss-list');

      var mutationObserverConfig = {
        attributes: false,
        childList: true,
        subtree: false
      };

      var removeClasses = function () {
        target.classList.remove('two-column', 'three-column');
      };

      var changeElementsNumberHandler = function () {
        var number = elementsList.querySelectorAll('.ss-option:not(.ss-hide)').length;
        removeClasses();

        if (number > 8 && number <= 15) {
          target.classList.add('two-column');
        }
        if (number > 14 && number <= 21) {
          target.classList.add('three-column');
        }
        if (number > 21) {
          target.classList.add('three-column');
          target.classList.add('fixed-height');
        }
      };

      var observer = new MutationObserver(changeElementsNumberHandler);
      observer.observe(elementsList, mutationObserverConfig);
      changeElementsNumberHandler();

    });
  }
})();

'use strict';

(function () {
  var hideClass = 'js_hide';
  var list = document.querySelector('.js_short_list');
  var listCat = document.querySelector('.js_short_list-category');
  var button = document.querySelector('.js_short_list + .js_show_all');

  if (list && button || listCat && button) {
    // var showedItems = 5;
    var items = list.querySelectorAll('li');

    items.forEach(function (item, index) {
      if (index > 4) {
        item.classList.add(hideClass);
      }
    });

    if (listCat && items.length > 8) {
      button.style.display = 'block';

      items.forEach(function (item, index) {
        if (index > 8) {
          item.classList.add(hideClass);
        } else {
          item.classList.remove(hideClass);
        }
      });
    }

    button.addEventListener('click', function () {
      button.style.display = '';
      items.forEach(function (item) {
        item.classList.remove(hideClass);
        button.classList.add(hideClass);
      });
    });
  }
})();

'use strict';

(function () {
  var otherChecboxes = document.querySelectorAll('[data-id="other-checkbox"]');
  var otherRadios = document.querySelectorAll('[data-id="other-radio"]');
  var hideClass = 'hide';

  if (otherChecboxes) {
    otherChecboxes.forEach(function (el) {
      el.addEventListener('change', function (evt) {
        var textarea = evt.target.parentElement.querySelector('.js-other-textarea');
        var target = evt.target;

        if (target.checked) {
          textarea.classList.remove(hideClass);
        } else {
          textarea.classList.add(hideClass);
        }
      });
    });
  }

  if (otherRadios) {
    var selectedRadio = null;

    var showOtherField = function (el) {
      var textarea = el.parentElement.querySelector('.js-other-textarea');
      if (textarea) {
        // eslint-disable-next-line no-unused-expressions
        el === selectedRadio ? textarea.classList.remove(hideClass) : textarea.classList.add(hideClass);
      }
    };

    var hideAllOtherFields = function (radioButtons) {
      radioButtons.forEach(function (button) {
        showOtherField(button);
      });
    };

    otherRadios.forEach(function (el) {
      var radioName = el.getAttribute('name');
      var radios = document.querySelectorAll('[name="' + radioName + '"]');
      radios.forEach(function (radio) {
        radio.addEventListener('change', function () {
          selectedRadio = radio;
          showOtherField(radio);
          hideAllOtherFields(radios);
        });
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

  function addTableWidth(tables) {
    if (!tables.length) {
      return;
    }

    Array.prototype.forEach.call(tables, function (table) {
      var minWidth = table.scrollWidth;
      var style = 'min-width: ' + minWidth + 'px;';
      table.style = style;
    });
  }

  function initTableContainerScroll(tableContainers) {
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
  }

  function initTableScroll(tableBodys) {
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
  }

  window.initTable = function () {
    addTableWidth(document.querySelectorAll('.table-fixed table'));
    initTableContainerScroll(document.querySelectorAll('.table-fixed'));
    initTableScroll(document.querySelectorAll('.table-fixed tbody'));
  };

  window.initTable();


})();

(function () {

  function initTableHeader(el, header) {
    if (!el && !header) {
      return;
    }

    el.addEventListener('scroll', function () {
      var topContainer = document.querySelector('.table-fixed--all-screen table tr:first-child');
      if (!topContainer) {
        return;
      }
      var top = topContainer.scrollHeight + 16;

      if (el.scrollTop > 50) {
        header.classList.add('table-popup__header--scroll');
        var style = 'top: ' + top + 'px;';
        header.style = style;
      }
      if (el.scrollTop < 50) {
        header.classList.remove('table-popup__header--scroll');
      }
    });
  }

  initTableHeader(document.querySelector('.table-fixed--all-screen table tbody .simplebar-content-wrapper'), document.querySelector('.table-popup__header'));

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
  var textItems = document.querySelectorAll('.js-fit-text');

  if (!textItems.length) {
    return;
  }


  var getFontSize = function (text) {
    return parseInt(getComputedStyle(text).fontSize, 10);
  };

  var getLineHeight = function (text) {
    return parseInt(getComputedStyle(text).lineHeight, 10);
  };


  var fitAllTextItems = function () {
    textItems.forEach(function (text) {
      text.style.fontSize = '';

      var fontSize = getFontSize(text);
      var lineHeight = getLineHeight(text);

      while (text.offsetHeight / lineHeight >= 2) {
        fontSize--;
        text.style.fontSize = fontSize + 'px';
      }
    });
  };

  fitAllTextItems();

  window.addEventListener('resize', function () {
    setTimeout(fitAllTextItems, 50);
  });
})();

'use strict';

(function () {
  var HEIGHT = 54;

  window.openText = function (textContainers) {
    Array.prototype.forEach.call(textContainers, function (textContainer) {
      var btnTextOpen = textContainer.querySelector('.js-text-hidden__btn');
      var btnText = btnTextOpen.querySelector('span');
      var text = textContainer.querySelector('.text-hidden__container');
      var btnContainer = textContainer.querySelector('.text-hidden__btn-wrapper');
      if (!btnTextOpen && !text && !btnContainer) {
        return;
      }
      if (text.scrollHeight > HEIGHT) {
        text.classList.add('text-hidden__container--close');
        btnTextOpen.addEventListener('click', function (evt) {
          evt.preventDefault();
          btnTextOpen.classList.toggle('text-hidden__btn--open');
          text.classList.toggle('text-hidden__container--close');
          btnContainer.classList.toggle('text-hidden__btn-wrapper--open');
          btnText.textContent = btnText.textContent === 'Развернуть' ? 'Свернуть' : 'Развернуть';
        });
      } else {
        btnContainer.classList.add('text-hidden__btn-wrapper--hidden');
      }
    });
  };

  var discTextContainers = document.querySelectorAll('.answers__discussion-col.js-text-hidden');
  if (discTextContainers.length) {
    window.openText(discTextContainers);
  }

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
        upBtn.style.bottom = window.innerHeight - cookieBtn.getBoundingClientRect().bottom + (cookieBtn.getBoundingClientRect().height - upBtn.getBoundingClientRect().height) / 2 + 1 + 'px';
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

'use strict';

(function () {
  var widgetCountPage = document.getElementById("widget_count_page");
  var widgetCountAll = document.getElementById("widget_count_all");
  var widgetTimer = document.getElementById("widget_timer");
  var widgetWidthInput = document.getElementById('widget_width_input');
  var widgetPreview = document.querySelector('.widget_block__preview__block');

  var widgetPaginationItemOnPage = 5;
  var widgetPaginationItemAll = 15;
  var widgetTimerValue = 2000;

  var widgetPaginationEl = Math.ceil((widgetPaginationItemAll / widgetPaginationItemOnPage) + 1);

  if (!widgetCountPage && !widgetCountAll && !widgetTimer && !widgetPreview) {
    return;
  }

  var mySwiper = null;
  var i = 1;

  var paginationSlider = function() {
    $('.swiper-pagination').pagination({
      items: widgetPaginationItemAll,
      itemsOnPage: widgetPaginationItemOnPage,
      displayedPages: 3,
      edges: 1,
      cssStyle: '',
      currentPage: 1,
      prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
      nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
      onPageClick: function(pageNumber, event) {
        mySwiper.slideTo(pageNumber - 1,400,false);
      },
    });
  }

  
  var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    autoplay: {
      delay: widgetTimerValue,
    },
    watchOverflow: true,
    grabCursor: true,
    loop: true,
    allowTouchMove:false,
    hashNavigation: false,
    on: {
      init: function () {
        paginationSlider();
      },
      slideChangeTransitionStart: function () {
          $('.swiper-pagination').pagination({
            items: widgetPaginationItemAll,
            itemsOnPage: widgetPaginationItemOnPage,
            displayedPages: 3,
            edges: 1,
            cssStyle: '',
            currentPage: i++,
            prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
            nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
            onPageClick: function(pageNumber, event) {
              mySwiper.slideTo(pageNumber - 1,400,false);
            },
          });   
        if(i === widgetPaginationEl){
          i = 1;
        }
      }
    },
  });

  
  var mySwiper = document.querySelector('.swiper-container').swiper;


  var error = document.createElement("div");
  error.classList.add('error');

  if(widgetCountPage) {
    widgetCountPage.addEventListener('focusout',function(event){

      if(event.srcElement.value === ''){
        return;
      }

      i = 1;

      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        this.style.border = '1px solid #e3e8ee';

        widgetPaginationItemOnPage = Number(event.srcElement.value);
        widgetPaginationEl = Math.ceil((widgetPaginationItemAll / widgetPaginationItemOnPage) + 1);

        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
        var mySwiper = new Swiper('.swiper-container', {
          speed: 400,
          autoplay: {
            delay: widgetTimerValue,
          },
          watchOverflow: true,
          grabCursor: true,
          loop: true,
          allowTouchMove:false,
          hashNavigation: false,
          on: {
            init: function () {
              paginationSlider();
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: i++,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
             
              if(i === widgetPaginationEl){
                i = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;

      } else {
        this.parentElement.append(error);
        this.style.border = '1px solid #F3A8A8';
        error.innerHTML = "Количество элементов на странице не может быть 0";} 

    });
  }

  if(widgetCountAll) {
    widgetCountAll.addEventListener('focusout',function(event){

      if(event.srcElement.value === ''){
        return;
      }
      i = 1;

      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        this.style.border = '1px solid #e3e8ee';

        widgetPaginationItemAll = Number(event.srcElement.value);
        widgetPaginationEl = Math.ceil((widgetPaginationItemAll / widgetPaginationItemOnPage) + 1);

        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
        var mySwiper = new Swiper('.swiper-container', {
          speed: 400,
          autoplay: {
            delay: widgetTimerValue,
          },
          watchOverflow: true,
          grabCursor: true,
          loop: true,
          allowTouchMove:false,
          hashNavigation: false,
          on: {
            init: function () {
              paginationSlider();
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: i++,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
             
              if(i === widgetPaginationEl){
                i = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;
      } else  {
        this.parentElement.append(error);
        this.style.border = '1px solid #F3A8A8';
        error.innerHTML = "Общее количество элементов не может быть 0";
      } 
    });
  }

  if(widgetTimer) {
    widgetTimer.addEventListener('focusout',function(event){

      if(event.srcElement.value === ''){
        return;
      }
      i = 1;

      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        this.style.border = '1px solid #e3e8ee';
        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
        widgetTimerValue = event.srcElement.value;
        var mySwiper = new Swiper('.swiper-container', {
          speed: 400,
          autoplay: {
            delay: widgetTimerValue,
          },
          watchOverflow: true,
          grabCursor: true,
          loop: true,
          allowTouchMove:false,
          hashNavigation: false,
          on: {
            init: function () {
              paginationSlider();
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: i++,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
             
              if(i === widgetPaginationEl){
                i = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;
      } else {
        this.parentElement.append(error);
        this.style.border = '1px solid #F3A8A8';
        error.innerHTML = "Время не может быть пустым";} 
    });
  }

  if(widgetWidthInput) {
    widgetWidthInput.addEventListener('focusout',function(event){
      if(event.srcElement.value === ''){
        return
      }

      i = 1;

      if(event.srcElement.value >= 320){
        widgetPreview.style.width = event.srcElement.value + 'px';
        error.remove();
        this.style.border = '1px solid #e3e8ee';

        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
        var mySwiper = new Swiper('.swiper-container', {
          speed: 400,
          autoplay: {
            delay: widgetTimerValue,
          },
          watchOverflow: true,
          grabCursor: true,
          loop: true,
          allowTouchMove:false,
          hashNavigation: false,
          on: {
            init: function () {
              paginationSlider();
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: i++,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
             
              if(i === widgetPaginationEl){
                i = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;
      } else {
        this.parentElement.append(error);
        this.style.border = '1px solid #F3A8A8';
        error.innerHTML = "Ширина должна быть не менее 320px";
      }
    });
  }


})();

'use strict';

(function () {
  var WidgetGetCode = document.querySelector('.js-widget-open');
  var WidgetPopup = document.querySelector('.widget-popup');
  
  if(WidgetGetCode){
    WidgetGetCode.addEventListener('click',function(){
      WidgetPopup.classList.add('popup--shown');
    });
  }

})();

'use strict';
(function () {
  var Scrollbar = window.Scrollbar;
  var widgetSelectType = document.querySelector('#widget-select-type');
  var widgetSelectLevel = document.querySelector('#widget-select-level');
  var widgetSelectProjectCategory = document.querySelector('#widget-select-project-category');
  var widgetSelectPreview = document.querySelector('#widget_block-preview-select');
  var widgetClassAdd = document.querySelector('.widget_block__selected_preview');

  var arr;
  var obj;

  var addSelectLevel = function (el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
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

  var addSelectType = function (el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
      onChange: function (el) {
        arr = new Array;
        obj = new Object;
        for(var i = 0;i < el.length;i++){
          obj = {};
          obj['text'] = el[i].value;
          arr.push(obj);
        }
        if(arr.length > 1){
          widgetClassAdd.classList.add('ss-arrow-show');
        } else {
          widgetClassAdd.classList.remove('ss-arrow-show');
        }
        addSelectPreview(widgetSelectPreview);
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

  function addSelectPreview(el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
      placeholder: 'Тип виджета',
      data: arr,
      afterOpen: function () {
        Scrollbar.init(document.querySelector('.form-select .ss-list'), {
          continuousScrolling: false
        });
      },
    });

    //select.set(arr)

    if (!select) {
      return;
    }
    Scrollbar.init(document.querySelector('.form-select .ss-main .ss-content .ss-list'), {
      continuousScrolling: false
    });
  };

  if (widgetSelectType) {
    addSelectType(widgetSelectType);
  }

  if (widgetSelectLevel) {
    addSelectLevel(widgetSelectLevel);
  }

  if (widgetSelectPreview) {
    addSelectPreview(widgetSelectPreview);
  }

  if (widgetSelectProjectCategory) {
    addSelectLevel(widgetSelectProjectCategory);
  }

})();
