'use strict';


(function () {
  var inputs = document.querySelectorAll('.js-datepicker');

  if (!inputs.length) {
    return;
  }

  inputs.forEach(function (input) {
    var datepicker = new window.Datepicker(input, {
      language: 'ru',
      minDate: new Date(),
      showOtherMonths: true,
      autohide: false,
    });
  });
})();
