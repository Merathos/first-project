'use strict';


(function () {
  var list = document.querySelector('.projects__list');

  if (!list) {
    return;
  }

  var ellipsis = ellipsis({
    lines: 3
  });

  var titles = list.querySelectorAll('.project-item__title');

  ellipsis.add(titles);
})();
