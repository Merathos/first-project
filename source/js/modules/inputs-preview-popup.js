'use strict';

(function () {
  var previews = document.querySelectorAll('.preview-input');
  var popup = document.querySelector('.js-popup');

  if (previews.length && popup) {

    var insertImageSrc = function (source, target) {
      var sourceSrc = source.getAttribute('src');
      if (sourceSrc) {
        target.setAttribute('src', sourceSrc);
      } else {
        target.removeAttribute('src');
      }
    };

    var insertDescription = function (source, target) {
      if (source) {
        var description = source.textContent;
        target.textContent = description;
      } else {
        target.textContent = '';
      }

    };

    previews.forEach(function (preview) {
      var zoomButton = preview.querySelector('.zoom-button');
      var previewSource = preview.querySelector('.preview-input__image-wrapper img');
      var previewDescription = preview.querySelector('.preview-input__description');
      var popupImage = popup.querySelector('.gallery-popup__frame img');
      var popupDescription = popup.querySelector('.gallery-popup__photo-description');

      zoomButton.addEventListener('click', function () {
        insertImageSrc(previewSource, popupImage);
        insertDescription(previewDescription, popupDescription);
        window.openPopup(popup);
      });
    });
  }
})();
