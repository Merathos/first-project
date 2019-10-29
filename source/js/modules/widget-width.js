'use strict';

(function () {
  var widgetWidthInput = document.getElementById('widget_width_input');
  var widgetPreview = document.querySelector('.widget_block__preview__block');
  var widgetInput = document.querySelector('.widget_block__input_bottom');

  var error = document.createElement("div");
  error.classList.add('error');

  if (!widgetPreview && !widgetInput) {
    return;
  }

  if(widgetWidthInput) {
    widgetWidthInput.addEventListener('focusout',function(event){
      if(event.srcElement.value === ''){
        return
      }
      if(event.srcElement.value >= 320){
        widgetPreview.style.width = event.srcElement.value + 'px';
        error.remove();
      } else {
        widgetInput.append(error);
        error.innerHTML = "Ширина должна быть не менее 320px";
      }
    });
  }

})();
