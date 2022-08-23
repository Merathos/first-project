'use strict';

(function () {
  const showMore = document.querySelectorAll('[data-checkbox-show-more]');

  if (showMore.length > 0) {
    showMore.forEach((el) => {
      const collapsed = document.querySelector(`#${el.dataset.checkboxShowMore}`);
      const bsCollapse = new bootstrap.Collapse(collapsed, {
        toggle: false
      })
      el.closest('form').addEventListener('change', (evt) => {
        if (el.checked) {
          bsCollapse.show()
        } else {
          bsCollapse.hide()
        }
      })
    })
  }
})();
