'use strict';


(function () {
  var forms = document.querySelectorAll('form');

  if(forms.length === 0) {
    return
  }

  var toggleSubmitBtn = function(arr, btn) {
    var filteredArray = arr.filter(function(elem) {
      return elem.checked
    });

    if (filteredArray.length === arr.length) {
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  }

  forms.forEach(function (form) {
    var requiredFields = Array.from(form.querySelectorAll('.js-required'));
    var submitBtn = form.querySelector('[type="submit"]');

    if(requiredFields.length === 0) {
      return
    }

    toggleSubmitBtn(requiredFields, submitBtn);

    requiredFields.forEach(function (field) {
      field.addEventListener('change', function (e) {
        toggleSubmitBtn(requiredFields, submitBtn)
      })
    })
  })
})();

