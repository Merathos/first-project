'use strict';

(function () {
  var togglers = document.querySelectorAll('.js-collapse-button');
  var collapsedContents = document.querySelectorAll('.js-collapse-content');

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      // eslint-disable-next-line no-invalid-this
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
      if (immediate && !timeout) {
        func.apply(context, args);
      }
    };
  }

  if (collapsedContents.length) {
    var setWidthVariable = debounce(function () {
      collapsedContents.forEach(function (el) {
        el.style.setProperty('--height', el.scrollHeight + 'px');
      });
    }, 250);

    setWidthVariable();
    window.addEventListener('resize', function () {
      setWidthVariable();
    });
  }

  if (togglers.length) {
    togglers.forEach(function (toggler) {
      var content = toggler.parentElement.querySelector('.js-collapse-content');
      var text = toggler.querySelector('span');
      if(content) {
        var collapseContent = function () {
          if (content.getAttribute('data-collapsed') === 'false') {
            content.setAttribute('data-collapsed', 'true');
            text.textContent = 'Контакты';
            toggler.classList.remove('collapsed');
          } else {
            content.setAttribute('data-collapsed', 'false');
            text.textContent = 'Свернуть';
            toggler.classList.add('collapsed');
          }
        };
        collapseContent();
        toggler.addEventListener('click', collapseContent);
      }
    });
  }
})();
