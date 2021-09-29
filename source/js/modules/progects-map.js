'use strict';

(function () {
    var myMap,
        map = document.querySelector('#map-progects'),
        userCoords = document.querySelector('#mapProgectsCenter');

    if (!map) {
        return;
    }
    
    var imagePin = map.getAttribute('data-icon');



    ymaps.ready(init);

    function init () {
        if(userCoords.value){
            ymaps.geocode(userCoords.value, {}).then(function (res){
                var firstGeoObject = res.geoObjects.get(0),
                    coordSearch = firstGeoObject.geometry.getCoordinates(),
                    getBounds = firstGeoObject.properties.get('boundedBy'),
                    city = res.geoObjects.get(0).getLocalities().toString().trim(),
                    region = res.geoObjects.get(0).getAdministrativeAreas()[0].toString().trim();

                    if(region !== userCoords.value && region !== '') {
                        ymaps.geocode(region, {}).then(function (res){
                            myMap = new ymaps.Map('map-progects', {
                                center: coordSearch,
                                zoom: 12,
                                controls: ['zoomControl']
                            }, {
                                searchControlProvider: 'yandex#search',
                                suppressMapOpenBlock: true,
                                restrictMapArea: res.geoObjects.get(0).properties.get('boundedBy'),
                            });

                            ymapsManager();
                        })
                    } else {
                        myMap = new ymaps.Map('map-progects', {
                            center: coordSearch,
                            zoom: 12,
                            controls: ['zoomControl']
                        }, {
                            searchControlProvider: 'yandex#search',
                            suppressMapOpenBlock: true,
                            restrictMapArea: getBounds,
                        });

                        ymapsManager();
                    }
            })
        } else {
            myMap = new ymaps.Map('map-progects', {
                center: [55.76, 37.64],
                zoom: 12,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search',
                //suppressMapOpenBlock: true,
                //restrictMapArea: res.geoObjects.get(0).properties.get('boundedBy'),
            });

            ymapsManager();
        }
    }

    function ymapsManager() {
        var objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32,
            clusterDisableClickZoom: true
        });

        myMap.geoObjects.add(objectManager);

        $.ajax({
            url: "json/data.json"
        }).done(function(data) {
            objectManager.add(data);
        });
    }
})();
