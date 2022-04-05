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

      if (windowWidth < window.var.resolution.TABLET) {
        if (isInitialized) {
          return;
        }

        init();
      } else {
        destroy();
      }
    }
  };


  if (windowWidth < window.var.resolution.TABLET) {
    init();
  }


  window.addEventListener('resize', onWindowResize);
})();
