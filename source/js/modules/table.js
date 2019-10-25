'use strict';
(function () {
  var Scrollbar = window.Scrollbar;
  var tableContainer = document.querySelector('.table-fixed');

  if (!tableContainer) {
    return;
  }

  Scrollbar.init(tableContainer, {
    continuousScrolling: false,
    alwaysShowTracks: true
  });

  window.addEventListener('scroll', function () {
    document.querySelector('.table-fixed--all-screen .table-fixed__header').classList.add('table-fixed__header--scroll');
  });
})();
