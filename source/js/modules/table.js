'use strict';
(function () {

  function initTableContainerScroll(tableContainers) {
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
  }

  function initTableScroll(tableBodys) {
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
  }

  function initTable() {
    initTableContainerScroll(document.querySelectorAll('.table-fixed'));
    initTableScroll(document.querySelectorAll('.table-fixed tbody'));
  }

  initTable();

})();

(function () {

  function initTableHeader(el, header) {
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
  }

  initTableHeader(document.querySelector('.table-fixed--all-screen table tbody .simplebar-content-wrapper'), document.querySelector('.table-fixed--all-screen table tr:first-child'));

})();
