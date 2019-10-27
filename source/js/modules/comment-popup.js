'use strict';


(function () {

  var modal = function (btns, popup) {
    Array.prototype.forEach.call(btns, function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();

        window.openPopup(popup);
      });
    });
  };

  var popupCommentAdd = document.querySelector('.js-comment-popup--add');
  var btnsCommentAdd = document.querySelectorAll('.js-comment-add');

  if (!popupCommentAdd && !btnsCommentAdd.length) {
    return;
  }

  modal(btnsCommentAdd, popupCommentAdd);

  var popupCommentEdit = document.querySelector('.js-comment-popup--edit');
  var btnsCommentEdit = document.querySelectorAll('.js-comment-edit');

  if (!popupCommentEdit && !btnsCommentEdit.length) {
    return;
  }

  modal(btnsCommentEdit, popupCommentEdit);

  var popupCommentYour = document.querySelector('.js-comment-popup--your');
  var btnsCommentYour = document.querySelectorAll('.js-comment-your');

  if (!popupCommentYour && !btnsCommentYour.length) {
    return;
  }

  modal(btnsCommentYour, popupCommentYour);

  var popupTable = document.querySelector('.js-table-popup');
  var btnsTable = document.querySelectorAll('.js-table');

  if (!popupTable && !btnsTable.length) {
    return;
  }

  modal(btnsTable, popupTable);

  var popupCommentTable = document.querySelector('.js-comment-popup--table');
  var btnsCommentTable = document.querySelectorAll('.js-comment-table');

  if (!popupCommentTable && !btnsCommentTable.length) {
    return;
  }

  modal(btnsCommentTable, popupCommentTable);

})();
