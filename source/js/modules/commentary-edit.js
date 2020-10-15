'use strict';

(function () {
    if (document.querySelector('#edit-comment')) {
        var commentsContainer = document.querySelector('.hearings__comments');
        var yourComment = document.querySelector('.your-comment');
        var editTemplate = document.querySelector('#edit-comment-block');
        var editBtn = yourComment.querySelector('#edit-comment');
        var deleteBtn = yourComment.querySelector('#delete-comment');
        var yourText = yourComment.querySelector('.your-comment__text');

        deleteBtn.addEventListener('click', function (evt) {
            evt.preventDefault();
            yourComment.remove();
        });

        editBtn.addEventListener('click', function (evt) {
            evt.preventDefault();
            yourComment.classList.add('visually-hidden');
            var clone = editTemplate.content.firstElementChild.cloneNode(true);
            var commentEditContainer = clone.querySelector('.commentary-add--edit');
            var textareaContainer = clone.querySelector('.commentary-add__textarea');
            var textarea = textareaContainer.querySelector('textarea');
            var errorField = textareaContainer.querySelector('#textarea-error-field');
            var saveBtn = clone.querySelector('#commentary-save');

            clone.querySelector('textarea').value = yourText.innerText;

            textarea.addEventListener('input', function () {
                if (textarea.value.length >= 500) {
                    textareaContainer.classList.add('commentary-add__textarea--warning');
                    errorField.textContent = 'Осталось символов: ' + Math.abs(1000 - textarea.value.length);
                } else {
                    textareaContainer.classList.remove('commentary-add__textarea--warning');
                }

                if (textarea.value.length >= 1000) {
                    textareaContainer.classList.add('commentary-add__textarea--error');
                    errorField.textContent = 'Вы превысили лимит символов на ' + Math.abs(1000 - textarea.value.length);
                } else {
                    textareaContainer.classList.remove('commentary-add__textarea--error');
                }
            });

            saveBtn.addEventListener('click', function () {
                evt.preventDefault();
                if (textarea.value.length > 0 && textarea.value.length < 1000) {
                    yourText.innerText = textarea.value;
                    clone.remove();
                    yourComment.classList.remove('visually-hidden');
                }
            });

            commentsContainer.prepend(clone);
        });
    }
})();