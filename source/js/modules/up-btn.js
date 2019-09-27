'use strict';


(function () {
  var upBtn = document.querySelector('.page-body__up-btn');

  if (!upBtn) {
    return;
  }


  var onUpBtnClick = function (evt) {
    evt.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  upBtn.addEventListener('click', onUpBtnClick);
})();
