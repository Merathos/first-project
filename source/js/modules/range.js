'use strict';

function initRangeSlider(rangeSlider) {
  if (!rangeSlider) {
    return;
  }

  var input = document.getElementById(rangeSlider.dataset.input);

  if (input) {
    var min = parseInt(rangeSlider.dataset.min, 10);
    var max = parseInt(rangeSlider.dataset.max, 10);
    var start = input.value ? input.value : max / 2;
    var isRequired = input.dataset.required;
    var inputValueChanged = false;
    var errorField = input.parentNode.querySelector('.error-field');
    window.noUiSlider.create(rangeSlider, {
      start: start,
      behaviour: 'snap',
      connect: 'lower',
      step: parseInt(rangeSlider.dataset.step, 10),
      range: {
        'min': [min],
        'max': [max]
      },
      pips: {
        mode: 'steps',
        stepped: true,
        density: 4
      },
      tooltips: true,
      format: window.wNumb({
        decimals: 0,
      })
    });

    rangeSlider.noUiSlider.on('start', function (values, handle) {
      rangeSlider.classList.remove('slide-disabled');
    });

    rangeSlider.noUiSlider.on('change', function (values, handle) {
      var value = values[handle];
      var maxPos = Math.max(values);
      var pips = rangeSlider.querySelectorAll('.noUi-marker-horizontal.noUi-marker-sub');

      input.value = value;
      input.dispatchEvent(new Event("change"));

      if (!pips) {
        return;
      }

      for (var i = 0; i < pips.length; i++) {

        if (i <= maxPos - 2) {
          pips[i].classList.add('form-range__accent');
        } else {
          pips[i].classList.remove('form-range__accent');
        }
      }

    });

    rangeSlider.addEventListener('click', function (e) {
      rangeSlider.removeAttribute('disabled');
      input.removeAttribute('disabled');
    })
  }
}
document.querySelectorAll('.js-poll-range').forEach(function (item) {
  initRangeSlider(item);
});

