'use strict';

(function () {
  var rangeSlider = document.getElementById('poll-range');
  if (!rangeSlider) {
    return;
  }

  noUiSlider.create(rangeSlider, {
    start: [5],
    behaviour: 'snap',
    connect: 'lower',
    step: 1,
    padding: [1, 0],
    range: {
      'min': [0],
      'max': [10]
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4
    },
    tooltips: true,
    format: wNumb({
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

      if (i <= maxPos - 1) {
        pips[i].classList.add('form-range__accent');
      } else {
        pips[i].classList.remove('form-range__accent');
      }
    }

  });

})();
