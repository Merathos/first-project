'use strict';


(function () {
  const showMore = document.querySelectorAll('[data-checkbox-show-more]');

  if (showMore.length > 0) {
    showMore.forEach((el) => {
      el.addEventListener('change', (evt) => {
        if (evt.target.checked) {
          console.log(el)
          console.log(el.dataset)
          console.log(el.dataset.checkboxShowMore)
          console.log(document.querySelector(`#${el.dataset.checkboxShowMore}`))
        }
      })
    })
  }
})();
