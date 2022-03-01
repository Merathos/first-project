'use strict';
var toggleActiveClass = function (els) {
  els.forEach(function (project) {
    var radioEl = project.querySelector('input[type="radio"]');

    if (radioEl) {
      project.classList.toggle('proposal__project--active', radioEl.checked);
    }
  });
};

var initProposalProjects = function () {
  var projectsEls = document.querySelectorAll('.proposal__project');

  if (!projectsEls.length) {
    return;
  }

  toggleActiveClass(projectsEls);

  var proposalForm = document.querySelector('.proposal form');

  if (proposalForm && !proposalForm.classList.contains('is-inited')) {
    proposalForm.addEventListener('change', function (e) {
      toggleActiveClass(e.currentTarget.querySelectorAll('.proposal__project'));
      // window.initProjectAccordion();
      var toggleButton = e.target.closest('.proposal__project').querySelector('.button-details');
      for (var i = 0; i < projectsEls.length; i++) {
        var buttonDetails = projectsEls[i].querySelector('.button-details');
        if (buttonDetails.classList.contains('opened')) {
          window.openAkordeon(buttonDetails);
        }
      }
      window.openAkordeon(toggleButton);
      // console.log(e.target.closest('.proposal__project'));
    });

    proposalForm.classList.add('is-inited');
  }
};

(function () {
  initProposalProjects();
  window.initProposalProjects = initProposalProjects;
})();
