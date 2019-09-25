'use strict';


(function () {
  var filter = document.querySelector('.filter');


  if (!filter) {
    return;
  }


  var openBtn = filter.querySelector('.filter__open-btn');
  // var body = filter.querySelector('.filter__body');

  var onOpenBtnClick = function (evt) {
    filter.classList.toggle('filter--open');

    evt.currentTarget.textContent =
      filter.classList.contains('filter--open') ?
        'Скрыть фильтры'
        :
        'Фильтры';
  };


  filter.classList.add('filter--js');

  openBtn.addEventListener('click', onOpenBtnClick);
})();
