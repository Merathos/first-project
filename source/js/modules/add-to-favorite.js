'use strict';

(function () {
  var buttonsFavorite = document.querySelectorAll('.js-button-favorive');

  if (!buttonsFavorite) {
    return;
  }

  var activeClass = 'button-star--active';

  function favoriteClickHanler(evt) {
    var target = evt.target;

    target.classList.toggle(activeClass);
  }

  buttonsFavorite.forEach(function(button) {
    button.addEventListener('click', favoriteClickHanler);
  });
})();
