'use strict';

(function () {
  var link = document.querySelector('[data-modal="projects-period"]');
  var showClass = 'modal--active';
  var isCrop = false;
  var maxSymbols = 350;

  var modal;
  var close;
  var body;

  if (!link) {
    return;
  }

  function cropText(blocks) {
    blocks.forEach(function(block) {
      var text = block.textContent;
      if (text.length > maxSymbols) {
        block.textContent = text.slice(0, maxSymbols) + '...';
      }
    });
  }

  function onLinkClick(evt) {
    evt.preventDefault();

    modal = document.querySelector('.modal--' + link.dataset.modal);
    close = modal.querySelector('.modal__close-btn');
    body = document.querySelector('body');

    modal.classList.add(showClass);
    body.style.overflow = 'hidden';

    if (!isCrop) {
      cropText(modal.querySelectorAll('.modal__content-text'));
    }

    isCrop = true;

    document.addEventListener('click', closeModalHandler);
    close.addEventListener('click', closeModalHandler);
  }

  function closeModalHandler(evt) {
    var target = evt.target;

    if (
      target !== link &&
      !target.closest('.modal--' + link.dataset.modal + ' .modal__content') &&
       modal.classList.contains(showClass) ||
       target.closest('.modal__close-btn')
      ) {
      modal.classList.remove(showClass);
      body.style.overflow = '';

      document.removeEventListener('click', closeModalHandler);
      close.removeEventListener('click', closeModalHandler);
    }
  }

  link.addEventListener('click', onLinkClick);
})();
