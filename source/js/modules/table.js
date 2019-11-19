'use strict';
(function () {

  function addTableWidth(tables) {
    if (!tables.length) {
      return;
    }

    Array.prototype.forEach.call(tables, function (table) {
      var minWidth = table.scrollWidth;
      var style = 'min-width: ' + minWidth + 'px;';
      table.style = style;
    });
  }

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

  window.initTable = function () {
    addTableWidth(document.querySelectorAll('.table-fixed table'));
    initTableContainerScroll(document.querySelectorAll('.table-fixed'));
    initTableScroll(document.querySelectorAll('.table-fixed tbody'));
  };

  window.initTable();


})();

(function () {

  function initTableHeader(el, header) {
    if (!el && !header) {
      return;
    }

    el.addEventListener('scroll', function () {
      var topContainer = document.querySelector('.table-fixed--all-screen table tr:first-child');
      if (!topContainer) {
        return;
      }
      var top = topContainer.scrollHeight + 16;

      if (el.scrollTop > 50) {
        header.classList.add('table-popup__header--scroll');
        var style = 'top: ' + top + 'px;';
        header.style = style;
      }
      if (el.scrollTop < 50) {
        header.classList.remove('table-popup__header--scroll');
      }
    });
  }

  initTableHeader(document.querySelector('.table-fixed--all-screen table tbody .simplebar-content-wrapper'), document.querySelector('.table-popup__header'));

})();
