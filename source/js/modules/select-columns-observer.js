'use strict';

(function () {
  var targets = document.querySelectorAll('.ss-main.js-multiple-select');

  if (targets.length) {
    targets.forEach(function (target) {
      var elementsList = target.querySelector('.ss-list');

      var mutationObserverConfig = {
        attributes: false,
        childList: true,
        subtree: false
      };

      var removeClasses = function () {
        target.classList.remove('two-column', 'three-column');
      };

      var changeElementsNumberHandler = function () {
        var number = elementsList.children.length;
        removeClasses();

        if (number > 8 && number <= 15) {
          target.classList.add('two-column');
        }
        if (number > 14) {
          target.classList.add('three-column');
        }
      };

      var observer = new MutationObserver(changeElementsNumberHandler);
      observer.observe(elementsList, mutationObserverConfig);
      changeElementsNumberHandler();

    });
  }
})();
