'use strict';


(function () {
  var toggle = document.querySelector('.js-moderator-comments');

  if (toggle) {
    var container = toggle.parentElement;

    var setContainerHeight = function () {
      var containerHeight = container.scrollHeight;
      container.style.height = containerHeight + 'px';
    };

    var checkContainerHeight = window.debounce(function () {
      container.style.height = 'auto';
      container.style.height = container.scrollHeight + 'px';
    }, 150);

    toggle.addEventListener('click', function () {
      if (!container.classList.contains('comments-tab--opened')) {
        container.classList.add('comments-tab--opened');
        setContainerHeight();
        window.addEventListener('resize', checkContainerHeight);
      } else {
        container.classList.remove('comments-tab--opened');
        container.removeAttribute('style');
        window.removeEventListener('resize', checkContainerHeight);
      }
    });
  }
})();
