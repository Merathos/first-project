'use strict';


(function () {
  var projectsEls = document.querySelectorAll('.proposal__project');

  if (!projectsEls.length) {
    return;
  }

  var toggleActiveClass = function (e) {
    projectsEls.forEach(function (project) {
      var radioEl = project.querySelector('input[type="radio"]');

      if (radioEl) {
        project.classList.toggle('proposal__project--active', radioEl.checked);
      }
    });
  };

  projectsEls.forEach(function (project) {
    var radioEl = project.querySelector('input[type="radio"]');

    if (radioEl) {
      radioEl.addEventListener('change', toggleActiveClass);
    }
  });

  toggleActiveClass();
})();
