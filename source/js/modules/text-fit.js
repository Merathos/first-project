'use strict';


(function () {
  var textItems = document.querySelectorAll('.js-fit-text');

  if (!textItems.length) {
    return;
  }


  var getFontSize = function (text) {
    return parseInt(getComputedStyle(text).fontSize, 10);
  };

  var getLineHeight = function (text) {
    return parseInt(getComputedStyle(text).lineHeight, 10);
  };


  var fitAllTextItems = function () {
    textItems.forEach(function (text) {
      text.style.fontSize = '';

      var fontSize = getFontSize(text);
      var lineHeight = getLineHeight(text);

      while (text.offsetHeight / lineHeight >= 2) {
        fontSize--;
        text.style.fontSize = fontSize + 'px';
      }
    });
  };

  fitAllTextItems();

  window.addEventListener('resize', function () {
    setTimeout(fitAllTextItems, 50);
  });
})();
