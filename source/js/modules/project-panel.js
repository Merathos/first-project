'use strict';


(function () {
  var panel = document.querySelector('.project-page__panel');

  if (!panel) {
    return;
  }


  panel.classList.add('project-page__panel--js');

  new Sticky('.project-page__panel');
})();
