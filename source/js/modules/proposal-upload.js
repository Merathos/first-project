'use strict';

var initImgUpload = function () {
  function hideImgInput($inputsContainer) {
    var $imgUploadInputs = document.querySelectorAll('.image-uploads__image-wrapper input[type="file"]');
    if ($imgUploadInputs.length > 0) {
      $imgUploadInputs.forEach(function (el) {
        if(isMaxAmountOfImagesAchieved($inputsContainer)) {
          el.parentNode.remove()
        }
      })
    }
  }

  function getCloseBtn() {
    var $btn = document.createElement('button');
    $btn.setAttribute('type', 'button');
    $btn.setAttribute('aria-label', 'удалить загруженное изображение');
    return $btn;
  }

  function addFunctionailtyToCloseBtn($closeBtn, $elToDelete, $inputsContainer) {
    $closeBtn.addEventListener('click', function () {
      $elToDelete.remove();

      if (!isBlankUploadElExist($inputsContainer) && !isMaxAmountOfImagesAchieved($inputsContainer)) {
        addBlankUploadEl($inputsContainer);
      }
    }, {once: true});
  }

  function getPreviewImg(imageUrl) {
    var $previewImg = document.createElement('img');
    $previewImg.setAttribute('src', imageUrl);
    return $previewImg;
  }

  function makeElLoaded($inputsContainer, $imgUploadEl, $previewImg) {
    $imgUploadEl.classList.add('image-loaded');
    var $closeBtn = getCloseBtn();
    addFunctionailtyToCloseBtn($closeBtn, $imgUploadEl, $inputsContainer);
    $imgUploadEl.appendChild($closeBtn);

    if ($previewImg) {
      $imgUploadEl.append($previewImg);
    }
  }

  function isBlankUploadElExist($inputsContainer) {
    return !!$inputsContainer.querySelector('.image-uploads__image-wrapper:not(.image-loaded)');
  }

  function isMaxAmountOfImagesAchieved($inputsContainer) {
    return $inputsContainer.querySelectorAll('.image-uploads__image-wrapper').length >= 5;
  }

  function getFileInput(inputName) {
    var $fileInput = document.createElement('input');
    $fileInput.classList.add('visually-hidden');
    $fileInput.setAttribute('type', 'file');
    $fileInput.setAttribute('name', inputName);
    $fileInput.setAttribute('accept', 'image/png, image/jpeg, image/jpg, image/gif');
    $fileInput.setAttribute('accept', 'image/png, image/jpeg, image/jpg, image/gif');
    $fileInput.setAttribute('aria-label', 'user-images');
    return $fileInput;
  }

  function getCaption() {
    var $caption = document.createElement('span');
    $caption.innerHTML = 'Загрузить изображение';
    return $caption;
  }

  function getUploadEl() {
    var $uploadEl = document.createElement('div');
    $uploadEl.classList.add('image-uploads__image-wrapper');
    return $uploadEl;
  }

  function addBlankUploadEl($inputsContainer, inputName) {
    var $uploadEl = getUploadEl();

    var $fileInput = getFileInput(inputName);
    addFunctionailtyToFileInput($fileInput, $uploadEl, inputName);

    var $caption = getCaption();

    $uploadEl.append($fileInput, $caption);

    $inputsContainer.append($uploadEl);
  }

  function addFunctionailtyToFileInput($fileInput, $imgUploadEl, inputName) {
    $fileInput.addEventListener('change', function (e) {
      var $target = e.target;
      var file = $target.files[0];
      var reader = new FileReader();


      reader.addEventListener('load', function () {
        var $previewImg = getPreviewImg(reader.result);
        makeElLoaded($inputsContainer, $imgUploadEl, $previewImg);

        if (!isBlankUploadElExist($inputsContainer) && !isMaxAmountOfImagesAchieved($inputsContainer)) {
          addBlankUploadEl($inputsContainer, inputName);
        }
      });

      reader.readAsDataURL(file);
    });
  }

  var $inputsContainer = document.querySelector('.js-upload-image-container');

  if ($inputsContainer) {
    var $imgUploadEls = document.querySelectorAll('.image-uploads__image-wrapper');

    var inputName = ' ';

    if ($imgUploadEls.length > 0) {
      for (var i = 0; i < $imgUploadEls.length; i++) {
        var $input = $imgUploadEls[i].querySelector('input[type="file"]');

        if ($input) {
          var attr = $input.getAttribute('name');

          if (attr) {
            inputName = attr;
            break;
          }
        }
      }
    }

    hideImgInput($inputsContainer);

    $imgUploadEls.forEach(function ($imgUploadEl) {
      var $loadedImg = $imgUploadEl.querySelector('img');

      if ($loadedImg) {
        makeElLoaded($inputsContainer, $imgUploadEl);
      } else {
        var $fileInput = $imgUploadEl.querySelector('input[type="file"]');
        addFunctionailtyToFileInput($fileInput, $imgUploadEl, inputName);
      }
    });
  }
}

initImgUpload();
