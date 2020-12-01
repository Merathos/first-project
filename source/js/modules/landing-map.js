'use strict';


(function () {
    var map = document.querySelector('.proposal__map.map-section'),
        mapHidden = document.querySelector('#map-hidden'),
        mapSearch = document.querySelector('#map-search'),
        userCoords = document.querySelector('#user-coords');

    if (!map) {
        return;
    }

    ymaps.ready(init);

    function init() {
        var myMap,
            suggestView = new ymaps.SuggestView('map-search'),
            myPlacemark,
            firstGeoObject,
            oldAddress;
        if(userCoords.value){
            ymaps.geocode(userCoords.value, {}).then(function (res){
                var firstGeoObject = res.geoObjects.get(0),
                    coordSearch = firstGeoObject.geometry.getCoordinates();

                myMap = new ymaps.Map('map', {
                    center: coordSearch,
                    zoom: 9,
                    controls: ['zoomControl']
                }, {
                    searchControlProvider: 'yandex#search'
                });
                myPlacemark = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: coordSearch
                    },
                }, {
                    preset: 'islands#blackStretchyIcon',
                    draggable: true
                });

                mapHidden.value = coordSearch;
                //добавляем метку на карту
                myMap.geoObjects
                    .add(myPlacemark);

                //при перетаскивании метки меняем координаты
                myMap.geoObjects.events.add([
                    'dragend'
                ], function (e) {
                    var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
                        myMap.converter.pageToGlobal(e.get('position')),
                        myMap.getZoom()
                    );
                    mapHidden.value = placemarkPosition;
                    getAddress(placemarkPosition);
                    ymaps.geocode(placemarkPosition).then(function (res) {
                        document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                        $(mapSearch).trigger('keyup');
                    })
                });
                // Слушаем клик на карте.
                myMap.events.add('click', function (e) {
                    var coords = e.get('coords');
                    ymaps.geocode(coords).then(function (res) {
                        document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                        $(mapSearch).trigger('keyup');
                    })
                    addMark(coords)
                });
            })
        } else if(mapHidden.value) {
            var coordHidden = mapHidden.value.split(',').map(function(item) {
                return Number(item)
            })
            myMap = new ymaps.Map('map', {
                center: coordHidden,
                zoom: 9,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            });
            myPlacemark = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: coordHidden
                },
            }, {
                preset: 'islands#blackStretchyIcon',
                draggable: true
            });

            ymaps.geocode(coordHidden).then(function (res) {
                document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                $(mapSearch).trigger('keyup');
            })
            //добавляем метку на карту
            myMap.geoObjects
                .add(myPlacemark);

            //при перетаскивании метки меняем координаты
            myMap.geoObjects.events.add([
                'dragend'
            ], function (e) {
                var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
                    myMap.converter.pageToGlobal(e.get('position')),
                    myMap.getZoom()
                );
                mapHidden.value = placemarkPosition;
                getAddress(placemarkPosition);
                ymaps.geocode(placemarkPosition).then(function (res) {
                    document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                    $(mapSearch).trigger('keyup');
                })
            });
            // Слушаем клик на карте.
            myMap.events.add('click', function (e) {
                var coords = e.get('coords');
                ymaps.geocode(coords).then(function (res) {
                    document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                    $(mapSearch).trigger('keyup');
                })
                addMark(coords)
            });
        } else if (mapSearch.value){
            ymaps.geocode(mapSearch.value, {}).then(function (res){
                var firstGeoObject = res.geoObjects.get(0),
                    coordSearch = firstGeoObject.geometry.getCoordinates();

                myMap = new ymaps.Map('map', {
                    center: coordSearch,
                    zoom: 9,
                    controls: ['zoomControl']
                }, {
                    searchControlProvider: 'yandex#search'
                });
                myPlacemark = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: coordSearch
                    },
                }, {
                    preset: 'islands#blackStretchyIcon',
                    draggable: true
                });

                mapHidden.value = coordSearch;
                //добавляем метку на карту
                myMap.geoObjects
                    .add(myPlacemark);

                //при перетаскивании метки меняем координаты
                myMap.geoObjects.events.add([
                    'dragend'
                ], function (e) {
                    var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
                        myMap.converter.pageToGlobal(e.get('position')),
                        myMap.getZoom()
                    );
                    mapHidden.value = placemarkPosition;
                    getAddress(placemarkPosition);
                    ymaps.geocode(placemarkPosition).then(function (res) {
                        document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                        $(mapSearch).trigger('keyup');
                    })
                });
                // Слушаем клик на карте.
                myMap.events.add('click', function (e) {
                    var coords = e.get('coords');
                    ymaps.geocode(coords).then(function (res) {
                        document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                        $(mapSearch).trigger('keyup');
                    })
                    addMark(coords)
                });
            })
        } else {
            myMap = new ymaps.Map('map', {
                center: [55.753994, 37.622093],
                zoom: 9,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            });
            myPlacemark = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [55.753994, 37.622093]
                },
            }, {
                preset: 'islands#blackStretchyIcon',
                draggable: true
            });
            //добавляем метку на карту
            myMap.geoObjects
                .add(myPlacemark);

            //при перетаскивании метки меняем координаты
            myMap.geoObjects.events.add([
                'dragend'
            ], function (e) {
                var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
                    myMap.converter.pageToGlobal(e.get('position')),
                    myMap.getZoom()
                );
                mapHidden.value = placemarkPosition;
                getAddress(placemarkPosition);
                ymaps.geocode(placemarkPosition).then(function (res) {
                    document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                    $(mapSearch).trigger('keyup');
                })
            });
            // Слушаем клик на карте.
            myMap.events.add('click', function (e) {
                var coords = e.get('coords');
                ymaps.geocode(coords).then(function (res) {
                    document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
                    $(mapSearch).trigger('keyup');
                })
                addMark(coords)
            });
        }


        suggestView.events.add("select", function(e){
            ymaps.geocode(e.get('item').value, {}).then(function (res){
                var firstGeoObject = res.geoObjects.get(0),
                    // Координаты геообъекта.
                    coords = firstGeoObject.geometry.getCoordinates(),
                    // Область видимости геообъекта.
                    bounds = firstGeoObject.properties.get('boundedBy');
                oldAddress = e.get('item').value;
                addMark(coords);

                myMap.setBounds(bounds, {
                    checkZoomRange: true
                });
            })
        })

        //Добавление метки
        function addMark(coords) {
            mapHidden.value = coords;
            // Если метка уже создана – просто передвигаем ее.
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
                myPlacemark = createPlacemark(coords);
                myMap.geoObjects.add(myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                myPlacemark.events.add('dragend', function () {
                    getAddress(myPlacemark.geometry.getCoordinates());
                });
            }
            getAddress(coords);
        }

        // Создание метки.
        function createPlacemark(coords) {
            return new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: coords
                },
            }, {
                preset: 'islands#blackStretchyIcon',
                draggable: true
            });
        }

        // Определяем адрес по координатам (обратное геокодирование).
        function getAddress(coords) {

            ymaps.geocode(coords).then(function (res) {
                firstGeoObject = res.geoObjects.get(0);

                myPlacemark.properties
                    .set({
                        // Формируем строку с данными об объекте.
                        iconCaption: [
                            // Название населенного пункта или вышестоящее административно-территориальное образование.
                            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                        ].filter(Boolean).join(', '),
                        // В качестве контента балуна задаем строку с адресом объекта.
                        balloonContent: firstGeoObject.getAddressLine()
                    });
            });
        }
    }

})();
