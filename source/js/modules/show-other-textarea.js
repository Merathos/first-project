'use strict';

(function() {
  var otherChecboxes = document.querySelectorAll('[data-id="other-checkbox"]');
  var hideClass = 'hide';

  if (otherChecboxes) {
    otherChecboxes.forEach(function(el) {
      el.addEventListener('change', function(evt) {
        var textarea = evt.target.parentElement.querySelector('.js-other-textarea');
        var target = evt.target;

        if (target.checked) {
          textarea.classList.remove(hideClass);
        } else {
          textarea.classList.add(hideClass);
        }
      });
    } );
  }
})();
