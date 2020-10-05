'use strict';

(function () {
  var container = document.querySelector('.js-like-counter');

  if (container) {
    var counter = container.querySelector('span');

    container.addEventListener('click', function () {
      var value = parseInt(counter.textContent, 10);
      if (container.classList.contains('project-vote__like-counter--liked')) {
        container.classList.remove('project-vote__like-counter--liked');
        value -= 1;
        counter.textContent = value;
      } else {
        container.classList.add('project-vote__like-counter--liked');
        value++;
        counter.textContent = value;
      }
    });
  }
})();
