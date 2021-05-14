'use strict';


(function () {
  var map = document.querySelector('.landscaping-form__section.map-section'),
    mapHidden = document.querySelector('#map-hidden'),
    mapSearch = document.querySelector('#map-search'),
    mapBlock = document.querySelector('#map'),
    userCoords = document.querySelector('#user-coords'),
    drawButton = document.querySelectorAll('.mapMenuIcon'),
    mapMenu = document.querySelector('.mapMenu');

  if (!mapBlock) {
    return;
  }
  var imagePin = mapBlock.getAttribute('data-icon');

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
          zoom: 15,
          controls: ['zoomControl']
        }, {
          searchControlProvider: 'yandex#search',
          suppressMapOpenBlock:true
        });
        myPlacemark = new ymaps.GeoObject({
          geometry: {
            type: "Point",
            coordinates: coordSearch
          },
        }, {
          iconLayout: 'default#image',
          iconImageHref: imagePin,
          iconImageSize: [36, 54],
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
        zoom: 15,
        controls: ['zoomControl']
      }, {
        searchControlProvider: 'yandex#search',
        suppressMapOpenBlock:true
      });
      myPlacemark = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: coordHidden
        },
      }, {
        iconLayout: 'default#image',
        iconImageHref: imagePin,
        iconImageSize: [36, 54],
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
          zoom: 15,
          controls: ['zoomControl']
        }, {
          searchControlProvider: 'yandex#search',
          suppressMapOpenBlock:true
        });
        myPlacemark = new ymaps.GeoObject({
          geometry: {
            type: "Point",
            coordinates: coordSearch
          },
        }, {
          iconLayout: 'default#image',
          iconImageHref: imagePin,
          iconImageSize: [36, 54],
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
        zoom: 15,
        controls: ['zoomControl']
      }, {
        searchControlProvider: 'yandex#search',
        suppressMapOpenBlock:true
      });
      // myPlacemark = new ymaps.GeoObject({
      //     geometry: {
      //         type: "Point",
      //         coordinates: [55.753994, 37.622093]
      //     },
      // }, {
      //     iconLayout: 'default#image',
      //     iconImageHref: imagePin,
      //     iconImageSize: [36, 54],
      //     draggable: true
      // });
      // // //добавляем метку на карту
      // myMap.geoObjects
      //     .add(myPlacemark);

      // //при перетаскивании метки меняем координаты
      // myMap.geoObjects.events.add([
      //     'dragend'
      // ], function (e) {
      //     var placemarkPosition = myMap.options.get('projection').fromGlobalPixels(
      //         myMap.converter.pageToGlobal(e.get('position')),
      //         myMap.getZoom()
      //     );
      //     mapHidden.value = placemarkPosition;
      //     getAddress(placemarkPosition);
      //     ymaps.geocode(placemarkPosition).then(function (res) {
      //         document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
      //         $(mapSearch).trigger('keyup');
      //     })
      // });
      // // Слушаем клик на карте.
      // myMap.events.add('click', function (e) {
      //     var coords = e.get('coords');
      //     ymaps.geocode(coords).then(function (res) {
      //         document.querySelector('#map-search').value = res.geoObjects.get(0).getAddressLine();
      //         $(mapSearch).trigger('keyup');
      //     })
      //     addMark(coords)
      // });
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

    drawButton.forEach(function (item) {
      item.addEventListener('click', buttonClick)
    })

    function buttonClick (event) {
      event.preventDefault();
      drawButton.forEach(function (item) {
        item.classList.remove('active');
      })
      this.classList.add('active');
      if(this.classList.contains('mapPolygon')){
        addPolygon();
        checkMenuIcon();
      }
      if(this.classList.contains('mapLineBroken')){
        addLineBroken();
        checkMenuIcon();
      }
      if(this.classList.contains('mapLine')){
        addLine();
        checkMenuIcon();
      }
      if(this.classList.contains('mapPin')){
        addPin();
        checkMenuIcon();
      }
    }

    function checkMenuIcon() {
      drawButton.forEach(function (item) {
        if(!item.classList.contains('active')) {
          item.classList.add('disabled');
        }
      })
    }

    function addPin() {
      myPlacemark = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [55.753994, 37.622093]
        },
      }, {
        iconLayout: 'default#image',
        iconImageHref: imagePin,
        iconImageSize: [36, 54],
        draggable: true
      });
      // Добавляем многоугольник на карту.
      myMap.geoObjects.add(myPlacemark);

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

    function addPolygon() {
      var myPolygon = new ymaps.Polygon([], {}, {
        editorDrawingCursor: "crosshair",
        editorMaxPoints: 5,
        strokeColor: '#0000FF',
        strokeWidth: 5
      });
      var coordsPolygon;
      // Добавляем многоугольник на карту.
      myMap.geoObjects.add(myPolygon);

      // В режиме добавления новых вершин меняем цвет обводки многоугольника.
      var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
      stateMonitor.add("drawing", function (newValue) {
        coordsPolygon = myPolygon.geometry.getCoordinates();
        if(coordsPolygon[0]){
          coordsPolygon[0].forEach(function(item, index) {
            var hello = "coords";
            var div = index + hello;
            var div = document.createElement('input');
            div.name = 'user-coords[]';
            div.type = 'hidden';
            div.value = item;
            document.querySelector('.coordsFigure').append(div);
          })
          var zoomPolygon = document.createElement('input');
          zoomPolygon.name = 'zoom';
          zoomPolygon.type = 'hidden';
          zoomPolygon.value = myMap.getZoom();
          document.querySelector('.coordsFigure').append(zoomPolygon);
          var centerPolygon = document.createElement('input');
          centerPolygon.name = 'center';
          centerPolygon.type = 'hidden';
          centerPolygon.value = myMap.getCenter();
          document.querySelector('.coordsFigure').append(centerPolygon);
        }
        myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
      });
      myPolygon.events.add('click', function () {
        console.log('polygon clicked');
      });

      stateMonitor.add('beforedrag', function () {
        console.log('polygon clicked');
      });

      // Включаем режим редактирования с возможностью добавления новых вершин.
      myPolygon.editor.startDrawing();

      // setTimeout(function(){getAddress(myPolygon.geometry.getCoordinates());},5000)
    }

    function addLineBroken() {
      var myPolyline = new ymaps.Polyline([], {}, {
        strokeColor: "#00000088",
        strokeWidth: 4,
        editorMaxPoints: 6,
        // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
        editorMenuManager: function (items) {
          items.push({
            title: "Удалить линию",
            onClick: function () {
              myMap.geoObjects.remove(myPolyline);
            }
          });
          return items;
        }
      });
      myMap.geoObjects.add(myPolyline);
      myPolyline.editor.startDrawing();
      //setTimeout(function(){alert(myPolyline.geometry.getCoordinates());},4000)
    }

    function addLine() {
      var myPolyline = new ymaps.Polyline([], {}, {
        strokeColor: "#00000088",
        strokeWidth: 2,
        editorMaxPoints: 2,
        editorMenuManager: function (items) {
          items.push({
            title: "Удалить линию",
            onClick: function () {
              myMap.geoObjects.remove(myPolyline);
            }
          });
          return items;
        }
      });
      myMap.geoObjects.add(myPolyline);
      myPolyline.editor.startDrawing();
    }

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
        iconLayout: 'default#image',
        iconImageHref: imagePin,
        iconImageSize: [36, 54],
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
