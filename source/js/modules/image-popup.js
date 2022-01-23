'use strict';


(function () {
  var popup = document.querySelector('.js-image-popup');

  if (!popup) {
    return;
  }

  var imageContainer = popup.querySelector('.js-image-popup__frame');

  var initializePopup = function (target) {
    imageContainer.innerHTML = '';

    var image = document.createElement('img');
    var sourceImage = target.querySelector('img');

    image.setAttribute('src', sourceImage.getAttribute('src'));

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
