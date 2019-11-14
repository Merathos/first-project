'use strict';
(function () {
  var Scrollbar = window.Scrollbar;
  var widgetSelectType = document.querySelector('#widget-select-type');
  var widgetSelectLevel = document.querySelector('#widget-select-level');
  var widgetSelectPreview = document.querySelector('#widget_block-preview-select');
  var widgetClassAdd = document.querySelector('.widget_block__selected_preview');

  var arr;
  var obj;

  var addSelectLevel = function (el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
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
        arr = new Array;
        obj = new Object;
        for(var i = 0;i < el.length;i++){
          obj = {};
          obj['text'] = el[i].value;
          arr.push(obj);
        }
        if(arr.length > 1){
          widgetClassAdd.classList.add('ss-arrow-show');
        } else {
          widgetClassAdd.classList.remove('ss-arrow-show');
        }
        addSelectPreview(widgetSelectPreview);
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
      placeholder: 'Тип виджета',
      data: arr,
      afterOpen: function () {
        Scrollbar.init(document.querySelector('.form-select .ss-list'), {
          continuousScrolling: false
        });
      },
    });

    //select.set(arr)

    if (!select) {
      return;
    }
    Scrollbar.init(document.querySelector('.form-select .ss-main .ss-content .ss-list'), {
      continuousScrolling: false
    });
  };

  if (widgetSelectType) {
    addSelectType(widgetSelectType);
  }

  if (widgetSelectLevel) {
    addSelectLevel(widgetSelectLevel);
  }

  if (widgetSelectPreview) {
    addSelectPreview(widgetSelectPreview);
  }
  
})();
