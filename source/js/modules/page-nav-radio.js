'use strict';

(function () {
  var links = document.querySelectorAll('a[data-radio]');

  if (links.length) {
    var setChecked = function (attr) {
      var radioInputToCheck = document.querySelector('input#' + attr);
      if (radioInputToCheck) {
        radioInputToCheck.checked = true;
      }
    };

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setChecked(link.getAttribute('data-radio'));
      });
    });
  }
})();
