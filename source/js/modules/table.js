'use strict';
(function () {
  var Scrollbar = window.Scrollbar;
  var tableContainer = document.querySelector('.table-fixed');

  if (!tableContainer) {
    return;
  }

  Scrollbar.init(tableContainer, {
    continuousScrolling: false
  });

  var table = tableContainer.querySelector('.table-fixed__table tbody');
  Scrollbar.init(table, {
    continuousScrolling: false
  });

  var tablePopup = document.querySelector('.table-fixed--all-screen .table-fixed__table tbody');
  if (!tablePopup) {
    return;
  }

  Scrollbar.init(tablePopup, {
    continuousScrolling: false
  });

  var tableCommentPopup = document.querySelector('.table-fixed--popup');
  if (!tableCommentPopup) {
    return;
  }

  Scrollbar.init(tableCommentPopup, {
    continuousScrolling: false
  });

})();
