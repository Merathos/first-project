'use strict';


(function () {
  var subscribeLink = document.querySelector('.social__link--subscribe, .social__link--unsubscribe');

  if (!subscribeLink) {
    return;
  }

  var linkText = subscribeLink.querySelector('.social__link-text');


  var onSubscribeLinkClick = function (evt) {
    evt.preventDefault();

    if (subscribeLink.classList.contains('social__link--subscribe')) {
      linkText.textContent = 'Отписаться';

      subscribeLink.classList.remove('social__link--subscribe');
      subscribeLink.classList.add('social__link--unsubscribe');
    } else {
      linkText.textContent = 'Подписаться';

      subscribeLink.classList.add('social__link--subscribe');
      subscribeLink.classList.remove('social__link--unsubscribe');
    }
  };


  subscribeLink.addEventListener('click', onSubscribeLinkClick);
})();
