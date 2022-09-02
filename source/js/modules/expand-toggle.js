'use strict';

(function () {
  var parents = document.querySelectorAll('.js-expand-parent');

  if (parents.length === 0) {
    return;
  }

  parents.forEach(function (parent) {
    var totalHeight = 0;
    var toggle = parent.querySelector('.js-expand-toggle');
    var content = parent.querySelector('.js-expand-content');
    // var contentPadding = parseInt(window.getComputedStyle(content).getPropertyValue("padding-top")) + parseInt(window.getComputedStyle(content).getPropertyValue("padding-bottom"));
    var contentChildren = content.children;
    var toggleText = toggle.querySelector('span');

    contentChildren.forEach(function (child) {
      totalHeight = totalHeight + child.clientHeight + parseInt(window.getComputedStyle(child).getPropertyValue("margin-top")) + parseInt(window.getComputedStyle(child).getPropertyValue("margin-bottom"));
    });

    var onToggleClick = function () {
      toggleText.textContent = '';
      parent.classList.toggle('is-open');
      parent.classList.contains('is-open') ? content.style.maxHeight = totalHeight + 'px' : content.style.maxHeight = 0;

      toggleText.textContent = parent.classList.contains('is-open') ? 'Свернуть' : 'Развернуть';
    };

    toggle.addEventListener('click', onToggleClick);
  })

})();
