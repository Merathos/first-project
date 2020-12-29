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
    var infoBanner = mainContent.querySelector('.info-banner')
    var infoBannerHeight = 0

    if (infoBanner) {
      infoBannerHeight = infoBanner.getBoundingClientRect().height;
    }

    if (mainContentHeight && panelHeight) {
      mainContent.style.minHeight = panelHeight + panelOffsetBottom + infoBannerHeight + 'px';
    }
  };

  checkPanelHeight();

  (function () {
    return new window.Sticky('.js-project-page__panel');
  })();


})();
