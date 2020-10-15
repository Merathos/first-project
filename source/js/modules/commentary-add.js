'use strict';

(function () {
    if (document.querySelector('.commentary-add')) {
        var textareaContainer = document.querySelector('.commentary-add__textarea');
        var textarea = textareaContainer.querySelector('textarea');
        var errorField = textareaContainer.querySelector('#textarea-error-field');

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
    }
})();