'use strict';

var initFileUploader = function() {
  var blockContainer = document.querySelector('.js-upload-file-container');

  if (blockContainer) {
    var input = blockContainer.querySelector('.js-user-files');
    // var initialInput = input.cloneNode(true);
    // var label = blockContainer.querySelector('label');
    var previewContainer = blockContainer.querySelector('.file-uploads__preview-container');
    var files = [];

    var checkPreviousFiles = function () {
      var prevFiles = previewContainer.querySelectorAll('.file-wrapper');
      prevFiles.forEach(function (item) {
        var child = item.querySelector('span');
        files.push(child);
        renderCloseBtn(item, child);
      });
    };

    var cloneInput = function (fileContainer) {
      var currentInput = blockContainer.querySelector('.js-user-files');
      var newInput = currentInput.cloneNode(true);
      newInput.removeAttribute('id');
      fileContainer.appendChild(newInput);
      if(currentInput.value) {
        currentInput.value ='';
      }
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
          // checkInputVisible();
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
      previewContainer.appendChild(fileContainer);
      cloneInput(fileContainer);
    };

    checkPreviousFiles();
    // checkInputVisible();
    input.addEventListener('change', function () {
      if (input.files.length) {
        input.files.forEach(function (file) {
          files.push(file);
          // checkInputVisible();
          renderPreview(file);
        });
      }
      // input.files = initialInput.files;
    });
  }
};

initFileUploader();
