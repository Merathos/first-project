'use strict';

var openAkordeon = function (btn) {
  var parent = btn.closest('.proposal__project');
  var projectText = parent.querySelector('.proposal__project-text');
  var projectGallery = parent.querySelector('.proposal__gallery');
  var projectMark = parent.querySelector('.proposal__project-mark');
  var voteBtn = parent.querySelector('.button--update');
  var gallerySlider = parent.querySelector('.js-gallery');
  var gallerySliderInPopup = parent.querySelector('.js-gallery-in-popup');
  var singleImage = parent.querySelector('.js-single-image');

  btn.classList.toggle('opened');
  projectText.classList.toggle('opened');
  if (projectGallery) {
    projectGallery.classList.toggle('opened');
  }
  if (projectMark) {
    projectMark.classList.toggle('opened');
  }
  if (voteBtn) {
    voteBtn.classList.toggle('opened');
  }
  var textSpan = btn.querySelector('.button-details__text');

  if (btn.classList.contains('opened')) {
    textSpan.textContent = 'Свернуть';
  } else {
    textSpan.textContent = 'Подробнее';
  }

  if (gallerySlider && !gallerySlider.swiper) {
    window.initSlider(gallerySlider);
  }

  if (gallerySliderInPopup && !gallerySliderInPopup.swiper) {
    window.initSliderInPopup(gallerySliderInPopup);
  }

  if (singleImage && !btn.classList.contains('opened')) {
    singleImage.remove();
  }
};

var onOpenAkordeon = function (evt) {
  var projectToggleTextButton = evt.target.closest('.button-details');
  console.log('1')
  if (projectToggleTextButton) {
    openAkordeon(projectToggleTextButton);
  }
};

var initProjectAccordion = function () {
  var projectAkordeon = document.querySelectorAll('.proposal__project');
  if (projectAkordeon.length > 0) {
    projectAkordeon.forEach(function (project) {
      if (project.classList.contains('is-inited')) {
        return;
      }

      var projectText = project.querySelector('.proposal__project-text');

      var projectToggleTextButton = project.querySelector('.button-details');

      if (projectText && projectToggleTextButton) {

        var textSpan = projectToggleTextButton.querySelector('.button-details__text');
        var changeButtonText = function () {
          if (projectToggleTextButton.classList.contains('opened')) {
            textSpan.textContent = 'Свернуть';
          } else {
            textSpan.textContent = 'Подробнее';
          }
        };
        // Количество строк текста
        var projectTextHeight = projectText.getBoundingClientRect().height;
        var projectTextLineHeight = +getComputedStyle(
            projectText
        ).lineHeight.replace('px', '');
        var projectTextLines = Math.ceil(
            projectTextHeight / projectTextLineHeight
        );

        // Максимально допустимое количество строк
        var maxLinesAmount = 3;

        // Если в блоке есть заголовок, то максимальное количество строк отличается по макету, но в ТЗ речь про 3 при любых условиях
        if (project.querySelector('.proposal__project-title')) {
          maxLinesAmount = 2;
        }

        if (projectTextLines > maxLinesAmount) {
          project.classList.add('project_enough-lines_true');

        } else {
          project.classList.add('project_enough-lines_false');
          changeButtonText();
        }

        project.classList.add('is-inited');
      }
    });
  }

  document.addEventListener('click', onOpenAkordeon);
};

(function () {
  initProjectAccordion();
  window.initProjectAccordion = initProjectAccordion;
  window.openAkordeon = openAkordeon;
})();
