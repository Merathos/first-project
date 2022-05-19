'use strict';

(function () {
  var popup = document.querySelector('.js-application-popup');

  if (!popup) {
    return;
  }

  var onDocumentClick = function (evt) {
    if (evt.target.classList.contains('js-application-link')) {
      evt.preventDefault();

      window.openPopup(popup);
    }
  };

  document.addEventListener('click', onDocumentClick);
})();
