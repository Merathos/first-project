'use strict';


(function () {
  var list = document.querySelector('.projects-list');

  if (!list) {
    return;
  }

  var ellipsis = new window.Ellipsis({
    lines: 3
  });

  var titles = list.querySelectorAll('.project-item__title');

  ellipsis.add(titles);
})();
