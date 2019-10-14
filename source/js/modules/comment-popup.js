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
})();
