'use strict';

(function () {
  var rangeSlider = document.querySelector('js-poll-range');
  if (!rangeSlider) {
    return;
  }

  window.noUiSlider.create(rangeSlider, {
    start: [5],
    behaviour: 'snap',
    connect: 'lower',
    step: 1,
    range: {
      'min': [1],
      'max': [10]
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

  rangeSlider.noUiSlider.on('update', function (values) {
    var maxPos = Math.max(values);
    var pips = rangeSlider.querySelectorAll('.noUi-marker-horizontal.noUi-marker-sub');

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

})();
