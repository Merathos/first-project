"use strict";

(function () {
  var previewTemplate = document.querySelector("#upload-img");
  var uploadInput = document.querySelector("#images");
  var previewContainer = document.querySelector(
    ".landscaping-form__img-container"
  );
  var form = document.querySelector(".landscaping-form");
  var submitBtn = document.querySelector(".landscaping-form__submit-btn");

  var onFileUpload = function () {
    return function () {
      var files = Array.from(uploadInput.files);
      files.forEach(function (el) {
        if (el.type.match("image")) {
          var picReader = new FileReader();
          picReader.addEventListener("load", function (evt) {
            var picFile = evt.target;
            var clone = previewTemplate.content.firstElementChild.cloneNode(
              true
            );
            clone.querySelector("img").src = picFile.result;
            previewContainer.prepend(clone);
          });
        }
        picReader.readAsDataURL(el);
      });
    };
  };

  uploadInput.addEventListener("change", onFileUpload());
  previewContainer.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("landscaping-form__remove-img")) {
      evt.target.parentNode.remove();
    }
  });
})();
