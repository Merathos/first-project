'use strict';
(function () {
  var projectAkordeon = document.querySelectorAll('.proposal__project');

  //console.log(projectGallery);
  if (projectAkordeon.length > 0) {
    projectAkordeon.forEach(function (project) {
      var projectText = project.querySelector('.proposal__project-text');
      var projectToggleTextButton = project.querySelector('.button-details');
      //находит галереию в каждом проекте
      var projectGallery = project.querySelector('.proposal__gallery');
      console.log(projectGallery);

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
        console.log(projectTextLines);
        // Максимально допустимое количество строк
        var maxLinesAmount = 3;

        // Если в блоке есть заголовок, то максимальное количество строк отличается по макету, но в ТЗ речь про 3 при любых условиях
        if (project.querySelector('.proposal__project-title')) {
          maxLinesAmount = 2;
        }

        if (projectTextLines > maxLinesAmount) {
          project.classList.add('project_enough-lines_true');

          projectToggleTextButton.addEventListener('click', function (e) {
            e.currentTarget.classList.toggle('opened');
            projectText.classList.toggle('opened');
            projectGallery.classList.toggle('opened');
            changeButtonText();
            //console.log(projectGallery);
          });
        } else {
          project.classList.add('project_enough-lines_false');
          changeButtonText();
        }
      }
    });
  }
})();
