'use strict';

(function () {
  var container = document.querySelectorAll('.js-like-counter');
  var likesContainerClass ='js_likes_container';

  if (container.length) {
    container.forEach(function (element) {
      element.addEventListener('click', onBtnClick);
    });
  }

  function onBtnClick(evt) {
    var target = evt.currentTarget;

    if (target.parentElement.querySelector('.liked')) {
      return;
    }

    var counter = target.querySelector('span');
    var value = parseInt(counter.textContent, 10);

    if (target.classList.contains('liked')) {
      target.classList.remove('liked');
      value -= 1;
      counter.textContent = value;
      checkLikedClassFromAdjacentElement(target);
    } else {
      target.classList.add('liked');
      value++;
      counter.textContent = value;
      checkLikedClassFromAdjacentElement(target);
    }
  }

  function checkLikedClassFromAdjacentElement(el) {
    var parent = el.parentElement;
    if (parent.classList.contains(likesContainerClass)) {
      if (parent.querySelector('button:not(.liked)')) {
        parent.querySelectorAll('button').forEach(function (btn) {
          btn.removeEventListener('click', onBtnClick)
        });
      }
    }
  }
})();
