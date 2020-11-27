'use strict';

(function () {
  var $mapBlock = $('#map');

  if (!$mapBlock) return;

  ymaps.ready(init);

  function init () {
    var myMap = new ymaps.Map($mapBlock[0], {
        center: [55.76, 37.64],
        zoom: 10
      }, {
        searchControlProvider: 'yandex#search'
      }),
      objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
      });

    var iconSize = [];

    if(window.innerWidth < 768) {
      iconSize = [38, 54]
    } else {
      iconSize = [40, 58]
    }

    myMap.geoObjects.add(objectManager);

    $.ajax({
      url: 'json/map-pins.json'
    }).done(function(data) {
      var clusterer = new ymaps.Clusterer({
        // Зададим массив, описывающий иконки кластеров разного размера.
        clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon"><span>{{ properties.geoObjects.length }}</span></div>'),
        // Чтобы метка была кликабельной, переопределим ее активную область.
        clusterIconShape: {
          type: 'Rectangle',
          coordinates: [[0, 0], [49, 49]]
        }
      });

      var geoObjects = [];

      for (var i = 0; i < data.features.length; i++) {
        geoObjects[i] = new ymaps.Placemark(data.features[i].geometry.coordinates, {
          // Зададим содержимое заголовка балуна.
          balloonContentHeader: '<div class="map-popup">',
          //   '<span class="description">Сеть кинотеатров</span>',
          // // Зададим содержимое основной части балуна.
          balloonContentBody: '<div class="map-popup__top-wrapper">' +
            '<p>' + data.features[i].text + '</p>' +
            '</div>',
          // Зададим содержимое нижней части балуна.
          balloonContentFooter: '<div class="map-popup__bottom-wrapper">' +
            '<p class="map-popup__likes"><span>' + data.features[i].likes + '</span>' +
            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\n' +
            '<g clip-path="url(#clip0)">\n' +
            '<path d="M1.45833 20H3.54167C4.34583 20 5 19.3458 5 18.5417V18.2367C6.26 18.8783 9.12167 20 13.7758 20H15.1092C17.0408 20 18.6808 18.6183 19.0083 16.715L19.9417 11.2983C20.14 10.1425 19.8208 8.9675 19.0675 8.0725C18.315 7.17917 17.2117 6.66667 16.0425 6.66667H12.2625C12.4983 6.03333 12.7342 5.11 12.7342 3.95833C12.7342 0.8275 10.9625 0 10.0258 0C8.29583 0 8.15083 1.61333 8.15083 3.125C8.15083 4.97 6.08167 6.50333 4.98917 7.185C4.93333 6.43167 4.30917 5.83333 3.54167 5.83333H1.45833C0.654167 5.83333 0 6.4875 0 7.29167V18.5417C0 19.3458 0.654167 20 1.45833 20ZM9.40084 3.125C9.40084 1.25 9.71833 1.25 10.0258 1.25C10.6125 1.25 11.4842 1.97167 11.4842 3.95833C11.4842 5.805 10.7608 6.93667 10.7558 6.945C10.6283 7.13667 10.6158 7.38333 10.725 7.58667C10.8333 7.79 11.0458 7.91667 11.2758 7.91667H16.0425C16.8425 7.91667 17.5967 8.26667 18.1117 8.8775C18.6275 9.48917 18.8458 10.2942 18.71 11.085L17.7767 16.5017C17.5525 17.8033 16.4308 18.7492 15.1092 18.7492H13.7758C8.10667 18.75 5.26667 16.9767 5 16.8008V8.62583C5.69417 8.2575 9.40084 6.14917 9.40084 3.125ZM1.25 7.29167C1.25 7.17667 1.34333 7.08333 1.45833 7.08333H3.54167C3.65667 7.08333 3.75 7.17667 3.75 7.29167V18.5417C3.75 18.655 3.655 18.75 3.54167 18.75H1.45833C1.34333 18.75 1.25 18.6567 1.25 18.5417V7.29167Z" />\n' +
            '</g>\n' +
            '<defs>\n' +
            '<clipPath id="clip0">\n' +
            '<rect width="20" height="20" fill="white"/>\n' +
            '</clipPath>\n' +
            '</defs>\n' +
            '</svg>' +
            '</p>' +
            '<a href="' + data.features[i].link + '" class="map-popup__details-btn"><span>Подробнее</span>' +
            '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M4 12.9833L8.97297 8L4 3.01667L5.51351 1.5L12 8L5.51351 14.5L4 12.9833Z"/>\n' +
            '</svg>' +
            '</a>' +
            '</div>'+
            '</div>',
        },{
            iconLayout: 'default#image',
            iconImageHref: 'img/pin.png',
            iconImageSize: iconSize,
            hideIconOnBalloonOpen: false,
            // balloonOffset: ballonOffset
        });
      }

      clusterer.add(geoObjects);
      myMap.geoObjects.add(clusterer);

      myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
      });
    }).fail(function (e) {
      console.log(e)
    });
  }
})();
