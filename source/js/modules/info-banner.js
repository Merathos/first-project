'use strict';
(function () {
  var initInfoBannerToggle = function (banner) {
    var bannerText = banner.querySelector('.info-banner__text');
    var bannerToggleTextButton = banner.querySelector('.info-banner__button');

    if (bannerText && bannerToggleTextButton && !banner.classList.contains('info-banner_enough-lines_true') && !banner.classList.contains('info-banner_enough-lines_false')) {

      var textSpan = bannerToggleTextButton.querySelector('.info-banner-button__text');
      var changeButtonText = function () {
        if (bannerToggleTextButton.classList.contains('opened')) {
          textSpan.textContent = 'Свернуть';
        } else {
          textSpan.textContent = 'Развернуть';
        }
      };
      // Количество строк текста
      var bannerTextHeight = bannerText.getBoundingClientRect().height;
      var bannerTextLineHeight = +getComputedStyle(
          bannerText
      ).lineHeight.replace('px', '');
      var bannerTextLines = Math.ceil(
          bannerTextHeight / bannerTextLineHeight
      );

      // Максимально допустимое количество строк
      var maxLinesAmount = 3;

      // Если в блоке есть заголовок, то максимальное количество строк отличается по макету, но в ТЗ речь про 3 при любых условиях
      if (banner.querySelector('.info-banner__title')) {
        maxLinesAmount = 2;
      }

      if (bannerTextLines > maxLinesAmount) {
        banner.classList.add('info-banner_enough-lines_true');

        bannerToggleTextButton.addEventListener('click', function (e) {
          e.currentTarget.classList.toggle('opened');
          bannerText.classList.toggle('opened');
          changeButtonText();
        });
      } else {
        banner.classList.add('info-banner_enough-lines_false');
        changeButtonText();
      }
    }
  };

  var infoBanner = document.querySelectorAll('.info-banner');

  if (infoBanner.length > 0) {
    infoBanner.forEach(function (banner) {
      initInfoBannerToggle(banner);
    });
  }

  window.initInfoBannerToggle = initInfoBannerToggle;
})();
