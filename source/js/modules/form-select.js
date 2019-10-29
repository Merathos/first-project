'use strict';
(function () {
  var Scrollbar = window.Scrollbar;
  var selectItem = document.querySelector('#projects-select');
  var categorySelect = document.querySelector('#category-select');
  var widgetSelectType = document.querySelector('#widget-select-type');
  var widgetSelectLevel = document.querySelector('#widget-select-level');
  var widgetSelectPreview = document.querySelector('#widget_block-preview-select');

  if(widgetSelectType) {
    var global = widgetSelectType.value;
  }

  var addSelect = function (el) {
    var select = new window.SlimSelect({
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

  var addSelectType = function (el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
      onChange: function (el) {
        global = el.value;
        addSelectPreview(widgetSelectPreview);
      },
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

  function addSelectPreview(el) {
    var select = new window.SlimSelect({
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

    select.set(global)

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

  if (widgetSelectType) {
    addSelectType(widgetSelectType);
  }

  if (widgetSelectLevel) {
    addSelect(widgetSelectLevel);
  }

  if (widgetSelectPreview) {
    addSelectPreview(widgetSelectPreview);
  }
  
})();
