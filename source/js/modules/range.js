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

    rangeSlider.noUiSlider.on('update', function (values, handle) {
      var value = values[handle];
      var maxPos = Math.max(values);
      var pips = rangeSlider.querySelectorAll('.noUi-marker-horizontal.noUi-marker-sub');

      if (!errorField.classList.contains('visually-hidden')) {
        errorField.classList.add('visually-hidden');
      }

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

    rangeSlider.noUiSlider.on('change', function (e) {
      inputValueChanged = true;
    })

    var form = input.closest('.form');

    form.addEventListener('submit', function (e) {
      if (isRequired && !inputValueChanged) {
        e.preventDefault();
        errorField.classList.remove('visually-hidden');
        var textPosition = errorField.offsetTop - 150;
        window.scrollTo({ top: textPosition, behavior: 'smooth'});
      }
    })
  }
}
document.querySelectorAll('.js-poll-range').forEach(function (item) {
  initRangeSlider(item);
});

