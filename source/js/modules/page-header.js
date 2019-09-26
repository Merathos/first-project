'use strict';


(function () {
  var header = document.querySelector('.page-header');


  if (!header) {
    return;
  }


  var adjustHeaderAppearance = function () {
    if (window.pageYOffset > 0) {
      header.classList.add('page-header--above-content');
    } else {
      header.classList.remove('page-header--above-content');
    }
  };

  var adjustPageContentTopPadding = function () {
    document.body.style.paddingTop = header.offsetHeight + 'px';
  };

  var onWindowResize = function () {
    adjustPageContentTopPadding();
  };


  header.classList.add('page-header--js');

  adjustHeaderAppearance();
  adjustPageContentTopPadding();


  document.addEventListener('scroll', adjustHeaderAppearance);
  window.addEventListener('resize', onWindowResize);
})();
