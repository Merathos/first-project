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

})();
