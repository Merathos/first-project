'use strict';


(function () {
  var filterVote = document.querySelector('.filter-vote');

  if (!filterVote) {
    return;
  }


  var deselectLabel = '<button type="button"><span class="visually-hidden">Сбросить фильтр по голосам</span><svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 1L11 11M11 1L1 11" stroke-width="2"/></svg></button>';


  var addSelect = function () {
    return new window.SlimSelect({
      select: '.filter-vote select',
      showSearch: false,
      allowDeselect: true,
      placeholder: 'Голосовал',

      deselectLabel: deselectLabel
    });
  };


  addSelect();
})();
