'use strict';


(function () {
  var panel = document.querySelector('.js-project-page__panel');

  if (!panel) {
    return;
  }


  panel.classList.add('project-page__panel--js');

  (function () {
    return new window.Sticky('.js-project-page__panel');
  })();
})();
