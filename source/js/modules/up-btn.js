'use strict';


(function () {
  var upBtn = document.querySelector('.js-page-body__up-btn');
  var container = document.querySelector('footer .container');

  if (!upBtn) {
    return;
  }


  var cookieBtn = document.querySelector('.js-cookie__button');


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

      if (cookieBtn) {
        upBtn.style.bottom = window.innerHeight - cookieBtn.getBoundingClientRect().bottom + 'px';
      }
    };

    var onWindowResize = function () {
      adjustUpBtnPosition();
    };

    adjustUpBtnPosition();

    window.addEventListener('resize', onWindowResize);
  }


  var onDocumentClick = function (evt) {
    if ((evt.target.classList.contains('js-special-popup__btn-size') || evt.target.classList.contains('js-special-popup__reset')) && cookieBtn) {
      var cookieBtnHeight = cookieBtn.offsetHeight;
      var cookieBtnBottom = window.innerHeight - cookieBtn.getBoundingClientRect().bottom;

      upBtn.style.height = cookieBtnHeight + 'px';
      upBtn.style.width = cookieBtnHeight + 'px';
      upBtn.style.bottom = cookieBtnBottom + 'px';
    }
  };


  upBtn.addEventListener('click', onUpBtnClick);

  document.addEventListener('click', onDocumentClick);
})();
