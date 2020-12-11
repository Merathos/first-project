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

    if (mainContentHeight && panelHeight && mainContentHeight <= panelHeight) {
      mainContent.style.minHeight = panelHeight + panelOffsetBottom + 'px';
    }
  };

  checkPanelHeight();

  (function () {
    return new window.Sticky('.js-project-page__panel');
  })();


})();
