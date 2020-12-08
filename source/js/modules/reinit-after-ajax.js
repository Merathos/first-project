'use strict';
(function () {
  var $ajaxWrappers = document.querySelectorAll('.js-ajax-wrapper');

  var callback = function (mutationsList) {
    Object.values(mutationsList).forEach(function (mutation) {
      if (mutation.type === 'attributes') {
        var $infoBanners = document.querySelectorAll('.info-banner');

        if ($infoBanners.length > 0) {
          $infoBanners.forEach(function ($infoBanner) {
            window.initInfoBannerToggle($infoBanner);
          });
        }
      }
    });
  };

  var observer = new MutationObserver(callback);

  if ($ajaxWrappers.length > 0) {
    $ajaxWrappers.forEach(function ($ajaxWrapper) {
      observer.observe($ajaxWrapper, {attributes: true, childList: true, subtree: true});
    });
  }
})();
