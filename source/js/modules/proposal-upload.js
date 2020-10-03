'use strict';
(function () {
  var container = document.querySelector('.js-upload-image-container');

  if (container) {
    var input = container.querySelector('input[name="user-images"]');
    var label = container.querySelector('label[for="user-images"]');
    var images = [];
    var MAX_IMAGES = 5;

    // прячет инпут когда загружено максимальное количество файлов //
    var checkInputVisible = function () {
      if (images.length === MAX_IMAGES) {
        label.classList.add('visually-hidden');
      } else {
        label.classList.remove('visually-hidden');
      }
    };

    // ограничивает возможность выбора более 5ти файлов за один раз //
    var limitFilesNumber = function () {
      var tempList = new DataTransfer();
      for (var i = 0; i < MAX_IMAGES; i++) {
        tempList.items.add(input.files[i]);
      }
      input.files = tempList.files;
    };

    // перезаписывает список файлов //
    var checkFilesList = function () {
      var list = new DataTransfer();
      images.forEach(function (image) {
        list.items.add(image);
      });
      input.files = list.files;
    };

    // рендерит кнопку закрытия и добавляет её в контейнер //
    var renderCloseBtn = function (btnContainer, file) {
      var button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('aria-label', 'удалить загруженное изображение');
      btnContainer.appendChild(button);
      button.addEventListener('click', function () {
        btnContainer.remove();
        var index = images.indexOf(file);
        if (index > -1) {
          images.splice(index, 1);
          checkInputVisible();
          checkFilesList();
        }
      });
    };

    // отрисовывает превью и добавляет его в контейнер //
    var renderPreview = function (imageUrl, file) {
      var imgContainer = document.createElement('div');
      var preview = document.createElement('img');
      renderCloseBtn(imgContainer, file);
      imgContainer.appendChild(preview);
      preview.setAttribute('src', imageUrl);
      container.appendChild(imgContainer);
    };

    // работа приложения //
    input.addEventListener('change', function () {
      if (input.files.length) {

        if (input.files.length > MAX_IMAGES) {
          limitFilesNumber();
        }

        input.files.forEach(function (file) {
          if (images.length > MAX_IMAGES - 1) {
            return;
          }
          images.push(file);
          checkInputVisible();
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            renderPreview(reader.result, file);
          });
          reader.readAsDataURL(file);
        });
      }
      checkFilesList();
    });
  }
})();
