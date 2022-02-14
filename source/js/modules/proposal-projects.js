'use strict';


(function () {
  var projectsEls = document.querySelectorAll('.proposal__project');

  if (!projectsEls.length) {
    return;
  }

  var toggleActiveClass = function (els) {
    els.forEach(function (project) {
      var radioEl = project.querySelector('input[type="radio"]');

      if (radioEl) {
        project.classList.toggle('proposal__project--active', radioEl.checked);
      }
    });
  };

  toggleActiveClass(projectsEls);

  var proposalForm = document.querySelector('.proposal form');

  if (proposalForm) {
    proposalForm.addEventListener('change', function (e) {
      toggleActiveClass(e.currentTarget.querySelectorAll('.proposal__project'));
    });
  }
})();
