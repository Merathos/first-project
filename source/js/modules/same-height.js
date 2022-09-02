'use strict';


(function () {
  var blocks = document.querySelectorAll('.js-same-height');

  if (blocks.length > 0) {
    var maxHeight = 0;
    blocks.forEach(function (el) {
      if (el.clientHeight > maxHeight) {
        maxHeight = el.clientHeight
      }
    })
    blocks.forEach(function (el) {
      el.style.height = maxHeight + 'px';
    })
  }
})();
