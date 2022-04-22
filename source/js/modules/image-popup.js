'use strict';


(function () {
  var popup = document.querySelector('.js-image-popup');

  if (!popup) {
    return;
  }

  var imageContainer = popup.querySelector('.js-image-popup-frame');

  var initializePopup = function (target) {
    imageContainer.innerHTML = '';
    var targetLink = target.closest('.js-image-popup-link');

    var image = document.createElement('img');
    // var sourceImage = target.querySelector('img');

    image.setAttribute('src', targetLink.getAttribute('href'));

    imageContainer.appendChild(image);
  };

  var onDocumentClick = function (evt) {
    if (evt.target.classList.contains('js-image-popup-link')) {
      evt.preventDefault();

      window.openPopup(popup);
      initializePopup(evt.target);
    }
  };

  document.addEventListener('click', onDocumentClick);
})();
