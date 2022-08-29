'use strict';

(function () {
  var showMore = document.querySelectorAll('[data-checkbox-show-more]');

  if (showMore.length > 0) {
    showMore.forEach(function (el) {
      var collapsed = document.querySelector('#' + el.dataset.checkboxShowMore);
      var bsCollapse = new bootstrap.Collapse(collapsed, {
        toggle: false
      })
      el.closest('form').addEventListener('change', function(evt) {
        if (el.checked) {
          bsCollapse.show()
        } else {
          bsCollapse.hide()
        }
      })
    })
  }
})();
