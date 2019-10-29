'use strict';

(function () {
  var WidgetGetCode = document.querySelector('.js-widget-open');
  var WidgetPopup = document.querySelector('.widget-popup');
  
  if(WidgetGetCode){
    WidgetGetCode.addEventListener('click',function(){
      WidgetPopup.classList.add('popup--shown');
    });
  }

})();
