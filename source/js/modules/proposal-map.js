'use strict';


(function () {
    if (document.querySelector('.proposal-winners__show-map-btn')) {
        var mapBtn = document.querySelector('.proposal-winners__show-map-btn');
        var map = document.querySelector('.proposal-winners__map');
        var closeMapBtn = document.querySelector('.map-popup__close-btn');

        mapBtn.addEventListener('click', function () {
            map.classList.add('proposal-winners__map--show');
        });

        closeMapBtn.addEventListener('click', function () {
            map.classList.remove('proposal-winners__map--show');
        });
    }
})();