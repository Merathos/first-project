'use strict'
;(function () {
  var infoBanner = document.querySelectorAll('.info-banner')

  if (infoBanner.length > 0) {
    infoBanner.forEach(function (banner) {
      var bannerText = banner.querySelector('.info-banner__text')
      var bannerToggleTextButton = banner.querySelector('.info-banner__button')

      if (bannerText && bannerToggleTextButton) {
        bannerToggleTextButton.addEventListener('click', function (e) {
          e.currentTarget.classList.toggle('opened')
          bannerText.classList.toggle('opened')
        })
      }
    })
  }
})()
