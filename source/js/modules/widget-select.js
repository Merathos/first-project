'use strict';
var initSelects = function () {
  var Scrollbar = window.Scrollbar;
  var selectsTypeType = document.querySelectorAll('.js-select-type');
  var selectsTypeLevel = document.querySelectorAll('.js-select-level');
  var selectsTypePreview = document.querySelectorAll('.js-select-preview');

  var arr;
  var obj;

  var addSelectLevel = function (el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
      afterOpen: function () {
        Scrollbar.init(document.querySelector('.form-select-custom .ss-list'), {
          continuousScrolling: false
        });
      },
    });

    if (!select) {
      return;
    }
    Scrollbar.init(document.querySelector('.form-select-custom .ss-main .ss-content .ss-list'), {
      continuousScrolling: false
    });
  };

  var addSelectType = function (el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
      onChange: function (elem) {
        arr = new Array;
        obj = new Object;
        for(var i = 0;i < elem.length;i++){
          obj = {};
          obj['text'] = elem[i].value;
          arr.push(obj);
        }
        var secondSelect = document.querySelector('[data-second-select=' + el.dataset.select + ']');
        if(arr.length > 1){
          secondSelect.classList.add('ss-arrow-show');
        } else {
          secondSelect.classList.remove('ss-arrow-show');
        }
        addSelectPreview(secondSelect.querySelector('.js-select-preview'));
      },
      afterOpen: function () {
        Scrollbar.init(document.querySelector('.form-select-custom .ss-list'), {
          continuousScrolling: false
        });
      },
    });

    if (!select) {
      return;
    }
    Scrollbar.init(document.querySelector('.form-select-custom .ss-main .ss-content .ss-list'), {
      continuousScrolling: false
    });
  };

  var addSelectPreview = function (el) {
    var select = new window.SlimSelect({
      select: el,
      showSearch: false,
      placeholder: 'Тип виджета',
      data: arr,
      afterOpen: function () {
        Scrollbar.init(document.querySelector('.form-select-custom .ss-list'), {
          continuousScrolling: false
        });
      },
    });

    //select.set(arr)

    if (!select) {
      return;
    }
    Scrollbar.init(document.querySelector('.form-select-custom .ss-main .ss-content .ss-list'), {
      continuousScrolling: false
    });
  };

  if (selectsTypeLevel.length> 0) {
    selectsTypeLevel.forEach(function (el) {
      addSelectLevel(el);
    })
  }

  if (selectsTypeType.length> 0) {
    selectsTypeType.forEach(function (el) {
      addSelectType(el);
    })
  }

  if (selectsTypePreview.length> 0) {
    selectsTypePreview.forEach(function (el) {
      addSelectPreview(el)
    })
  }
}

initSelects();
