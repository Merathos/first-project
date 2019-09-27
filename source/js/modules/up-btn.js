'use strict';


(function () {
  var upBtn = document.querySelector('.page-body__up-btn');
  var container = document.querySelector('footer .container');

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


  if (container) {
    var adjustUpBtnPosition = function () {
      if (container.getBoundingClientRect().right + upBtn.offsetWidth < document.documentElement.clientWidth) {
        upBtn.style.left = container.getBoundingClientRect().right - parseInt(getComputedStyle(container).paddingRight, 10) + 16 + 'px';
        upBtn.style.right = '';
      } else {
        upBtn.style.left = '';
        upBtn.style.right = '16px';
      }
    };

    var onWindowResize = function () {
      adjustUpBtnPosition();
    };

    adjustUpBtnPosition();

    window.addEventListener('resize', onWindowResize);
  }


  upBtn.addEventListener('click', onUpBtnClick);
})();
