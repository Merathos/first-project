'use strict';
(function () {
  var tableContainers = document.querySelectorAll('.table-fixed');

  if (!tableContainers.length) {
    return;
  }
  var scroll = null;

  Array.prototype.forEach.call(tableContainers, function (tableContainer) {
    scroll = new window.SimpleBar(tableContainer, {
      autoHide: false
    });
    return scroll;
  });

})();

(function () {
  var tableBodys = document.querySelectorAll('.table-fixed tbody');

  if (!tableBodys.length) {
    return;
  }

  var scroll = null;

  Array.prototype.forEach.call(tableBodys, function (tableBody) {
    scroll = new window.SimpleBar(tableBody, {
      autoHide: false
    });
    return scroll;
  });

})();

(function () {
  var el = document.querySelector('.table-fixed--all-screen table tbody .simplebar-content-wrapper');
  var header = document.querySelector('.table-fixed--all-screen table tr:first-child');

  if (!el && !header) {
    return;
  }

  el.addEventListener('scroll', function () {

    if (el.scrollTop > 50) {
      header.classList.add('table-fixed__header--scroll');
    }
    if (el.scrollTop < 50) {
      header.classList.remove('table-fixed__header--scroll');
    }
  });

})();
