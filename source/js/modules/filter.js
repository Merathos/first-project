'use strict';


(function () {

    var initJsFilter = function (filter) {
        if (!filter) {
            return;
        }
        var openBtn = filter.querySelector('.js-filter__open-btn');

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
    };

  var filter = document.querySelector('.js-filter');

  initJsFilter(filter);

  window.initJsFilter = initJsFilter;
})();
