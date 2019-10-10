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

  var popupCommentAdd = document.querySelector('.comment-popup--add');
  var btnsCommentAdd = document.querySelectorAll('[data-target="comment-add"]');

  if (!popupCommentAdd && !btnsCommentAdd.length) {
    return;
  }

  modal(btnsCommentAdd, popupCommentAdd);

  var popupCommentEdit = document.querySelector('.comment-popup--edit');
  var btnsCommentEdit = document.querySelectorAll('[data-target="comment-edit"]');

  if (!popupCommentEdit && !btnsCommentEdit.length) {
    return;
  }

  modal(btnsCommentEdit, popupCommentEdit);

  var popupCommentYour = document.querySelector('.comment-popup--your');
  var btnsCommentYour = document.querySelectorAll('[data-target="comment-your"]');

  if (!popupCommentYour && !btnsCommentYour.length) {
    return;
  }

  modal(btnsCommentYour, popupCommentYour);
})();
