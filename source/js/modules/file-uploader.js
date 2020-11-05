'use strict';
(function () {
  var container = document.querySelector('.js-upload-file-container');

  if (container) {
    var input = container.querySelector('input[name="user-files"]');
    var label = container.querySelector('label[for="user-files"]');
    var files = [];
    var MAX_FILES_NUMBER = 5;

    var checkInputVisible = function () {
      if (files.length === MAX_FILES_NUMBER) {
        label.classList.add('visually-hidden');
      } else {
        label.classList.remove('visually-hidden');
      }
    };

    var limitFilesNumber = function () {
      var tempList = new DataTransfer();
      for (var i = 0; i < MAX_FILES_NUMBER; i++) {
        tempList.items.add(input.files[i]);
      }
      input.files = tempList.files;
    };

    var checkFilesList = function () {
      var list = new DataTransfer();
      files.forEach(function (file) {
        list.items.add(file);
      });
      input.files = list.files;
    };

    var renderCloseBtn = function (btnContainer, file) {
      var button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('aria-label', 'удалить загруженные данные');
      btnContainer.appendChild(button);
      button.addEventListener('click', function () {
        btnContainer.remove();
        var index = files.indexOf(file);
        if (index > -1) {
          files.splice(index, 1);
          checkInputVisible();
          checkFilesList();
        }
      });
    };

    var renderPreview = function (file) {
      var fileContainer = document.createElement('div');
      fileContainer.classList.add('file-wrapper');
      var fileTitle = document.createElement('span');
      fileTitle.textContent = file.name;
      fileContainer.appendChild(fileTitle);
      renderCloseBtn(fileContainer, file);
      container.insertBefore(fileContainer, container.querySelector('label'));
    };

    input.addEventListener('change', function () {
      if (input.files.length) {

        if (input.files.length > MAX_FILES_NUMBER) {
          limitFilesNumber();
        }

        input.files.forEach(function (file) {
          if (files.length > MAX_FILES_NUMBER - 1) {
            return;
          }
          files.push(file);
          checkInputVisible();
          renderPreview(file);
        });
      }
      checkFilesList();
    });
  }
})();
