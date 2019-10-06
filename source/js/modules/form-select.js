'use strict';
(function () {
  var Scrollbar = window.Scrollbar;
  var selectItem = document.querySelector('#projects-select');
  var categorySelect = document.querySelector('#category-select');
  var voteSelect = document.querySelector('#vote-select');

  var addSelect = function (el) {
    var select = new SlimSelect({
      select: el,
      showSearch: false,
      afterClose: function () {
        Scrollbar.destroy(document.querySelector('.form-select .ss-list'));
      },
      afterOpen: function () {
        Scrollbar.init(document.querySelector('.form-select .ss-list'), {
          continuousScrolling: false
        });
      },
    });

    if (!select) {
      return;
    }
    Scrollbar.init(document.querySelector('.form-select .ss-main .ss-content .ss-list'), {
      continuousScrolling: false
    });
  };

  if (selectItem) {
    addSelect(selectItem);
  }

  if (categorySelect) {
    addSelect(categorySelect);
  }

  if (voteSelect) {
    addSelect(voteSelect);
  }

})();
