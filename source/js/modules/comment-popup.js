'use strict';


(function () {

  var modal = function (btns, popup) {
    Array.prototype.forEach.call(btns, function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();

        window.openPopup(popup);
        var textsHidden = popup.querySelectorAll('.js-text-hidden');
        if (textsHidden.length) {
          window.openText(textsHidden);
        }

        window.initTable();
      });
    });
  };

  var popupCommentAdd = document.querySelector('.js-comment-popup--add');
  var btnsCommentAdd = document.querySelectorAll('.js-comment-add');

  if (popupCommentAdd && btnsCommentAdd.length) {
    modal(btnsCommentAdd, popupCommentAdd);
  }

  var popupCommentEdit = document.querySelector('.js-comment-popup--edit');
  var btnsCommentEdit = document.querySelectorAll('.js-comment-edit');

  if (popupCommentEdit && btnsCommentEdit.length) {
    modal(btnsCommentEdit, popupCommentEdit);
  }

  var popupCommentYour = document.querySelector('.js-comment-popup--your');
  var btnsCommentYour = document.querySelectorAll('.js-comment-your');

  if (popupCommentYour && btnsCommentYour.length) {
    modal(btnsCommentYour, popupCommentYour);
  }

  var popupTable = document.querySelector('.js-table-popup');
  var btnsTable = document.querySelectorAll('.js-table');

  if (popupTable && btnsTable.length) {
    modal(btnsTable, popupTable);
  }

  var popupCommentTable = document.querySelector('.js-comment-popup--table');
  var btnsCommentTable = document.querySelectorAll('.js-comment-table');

  if (popupCommentTable && btnsCommentTable.length) {
    modal(btnsCommentTable, popupCommentTable);
  }

})();
