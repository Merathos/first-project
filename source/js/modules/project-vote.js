'use strict';

(function () {
  var vote = document.querySelector('.project-page__vote');

  if (!vote) {
    return;
  }


  vote.classList.add('project-page__vote--js');

  new Sticky('.project-page__vote');
})();
