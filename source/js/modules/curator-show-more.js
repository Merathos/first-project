'use strict';

(function () {
  var togglers = document.querySelectorAll('.js-collapse-button');

  if (togglers.length) {
    togglers.forEach(function (toggler) {
      var content = toggler.parentElement.querySelector('.js-collapse-content');
      content.style.setProperty('--height', content.scrollHeight + 'px');
      var text = toggler.querySelector('span');

      var collapseContent = function () {
        if (content.getAttribute('data-collapsed') === 'false') {
          content.setAttribute('data-collapsed', 'true'); // mark the section as "currently collapsed"
          text.textContent = 'Контакты';
          toggler.classList.remove('collapsed');
        } else {
          content.setAttribute('data-collapsed', 'false'); // mark the section as "currently not collapsed"
          text.textContent = 'Свернуть';
          toggler.classList.add('collapsed');
        }
      };
      collapseContent();
      toggler.addEventListener('click', collapseContent);
    });
  }
})();
