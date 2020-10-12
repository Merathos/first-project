'use strict';

(function () {
  var container = document.querySelectorAll('.js-like-counter');

  if (container.length) {
    container.forEach(function (element) {
      var counter = element.querySelector('span');
      element.addEventListener('click', function () {
        var value = parseInt(counter.textContent, 10);

        if (element.classList.contains('liked')) {
          element.classList.remove('liked');
          value -= 1;
          counter.textContent = value;
        } else {
          element.classList.add('liked');
          value++;
          counter.textContent = value;
        }
      });
    });
  }
})();
