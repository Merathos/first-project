'use strict';


(function () {
  var toggle = document.querySelector('.js-moderator-comments');

  if (toggle) {
    var container = toggle.parentElement;
    var containerHeight = container.scrollHeight;

    toggle.addEventListener('click', function () {
      if (!container.classList.contains('comments-tab--opened')) {
        container.classList.add('comments-tab--opened');
        container.style.height = containerHeight + 'px';
      } else {
        container.classList.remove('comments-tab--opened');
        container.removeAttribute('style');
      }
    });
  }
})();
