'use strict';

function initRangeSlider(rangeSlider) {
  if (!rangeSlider) {
    return;
  }

  var input = document.getElementById(rangeSlider.dataset.input);
  if (input) {
    var min = parseInt(rangeSlider.dataset.min);
    var max = parseInt(rangeSlider.dataset.max);
    var start = input.value ? input.value : max / 2;
    window.noUiSlider.create(rangeSlider, {
      start: start,
      behaviour: 'snap',
      connect: 'lower',
      step: parseInt(rangeSlider.dataset.step),
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

    rangeSlider.noUiSlider.on('update', function (values, handle) {

      var value = values[handle];
      var maxPos = Math.max(values);
      var pips = rangeSlider.querySelectorAll('.noUi-marker-horizontal.noUi-marker-sub');

      input.value = value;

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
  }
}
document.querySelectorAll('.js-poll-range').forEach(function (item) {
  initRangeSlider(item);
});

