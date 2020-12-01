'use strict';

(function () {
  var $mapBlock = $('#improvement-map');

  if (!$mapBlock) return;

  ymaps.ready(init);

  function init () {
    var myMap = new ymaps.Map($mapBlock[0], {
        center: [55.76, 37.64],
        controls: [],
        zoom: 3
      }, {
        searchControlProvider: 'yandex#search',
      }),
      objectManager = new ymaps.ObjectManager({
        // пока objectManager не нужен, но оставлю
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
      });

    // Создадим пользовательский макет ползунка масштаба.
    var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map-buttons'>" +
      "<div id='zoom-in'></div>" +
      "<div id='zoom-out'></div>" +
      "</div>", {

      // Переопределяем методы макета, чтобы выполнять дополнительные действия
      // при построении и очистке макета.
      build: function () {
        // Вызываем родительский метод build.
        ZoomLayout.superclass.build.call(this);

        // Привязываем функции-обработчики к контексту и сохраняем ссылки
        // на них, чтобы потом отписаться от событий.
        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

        // Начинаем слушать клики на кнопках макета.
        $('#zoom-in').bind('click', this.zoomInCallback);
        $('#zoom-out').bind('click', this.zoomOutCallback);
      },

      clear: function () {
        // Снимаем обработчики кликов.
        $('#zoom-in').unbind('click', this.zoomInCallback);
        $('#zoom-out').unbind('click', this.zoomOutCallback);

        // Вызываем родительский метод clear.
        ZoomLayout.superclass.clear.call(this);
      },

      zoomIn: function () {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
      },

      zoomOut: function () {
        var map = this.getData().control.getMap();
        map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
      }
    }),
    zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

    // Создадим пользовательский макет геолокации.
    var UserLocationLayout = ymaps.templateLayoutFactory.createClass("<div>" +
      "<div id='user-location'></div>", {

      // Переопределяем методы макета, чтобы выполнять дополнительные действия
      // при построении и очистке макета.
      build: function () {
        // Вызываем родительский метод build.
        UserLocationLayout.superclass.build.call(this);

        // Привязываем функции-обработчики к контексту и сохраняем ссылки
        // на них, чтобы потом отписаться от событий.
        this.getLocation = ymaps.util.bind(this.userLocation, this);

        // Начинаем слушать клики на кнопках макета.
        $('#user-location').bind('click', this.getLocation);
      },

      clear: function () {
        // Снимаем обработчики кликов.
        $('#user-location').unbind('click', this.getLocation);

        // Вызываем родительский метод clear.
        UserLocationLayout.superclass.clear.call(this);
      },

      userLocation: function () {
        var geolocation = ymaps.geolocation;
        geolocation.get({
          provider: 'browser',
          mapStateAutoApply: true
        }).then(function (result) {
          result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
          myMap.geoObjects.add(result.geoObjects);
        });
      },
    });
    var locationControl = new ymaps.control.GeolocationControl({options: {layout: UserLocationLayout}});

    myMap.controls.add(zoomControl, {
      float: 'none',
      position: {
        right: '8px',
        top: '244px',
      }
    });

    myMap.controls.add(locationControl, {
      float: 'none',
      position: {
        right: '8px',
        top: '324px',
      }
    });

    // var iconSize = [];
    //
    // if(window.innerWidth < 768) {
    //   iconSize = [38, 54]
    // } else {
    //   iconSize = [28, 40]
    // }

    var clusterer = new ymaps.Clusterer({
        // Зададим массив, описывающий иконки кластеров разного размера.
        clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon"><span>{{ properties.geoObjects.length }}</span></div>'),
        // Чтобы метка была кликабельной, переопределим ее активную область.
        clusterIconShape: {
          type: 'Rectangle',
          coordinates: [[0, 0], [49, 49]]
        }
    });

    myMap.events.add('balloonopen', function (e) {
          var target = e.get('target');
          target.options.set({
                iconImageHref: 'img/pin-hover.svg',
          });
    });

    myMap.events.add('balloonclose', function (e) {
          var target = e.get('target');
          target.options.set({
                iconImageHref: 'img/pin.svg',
          });
    });


    var dataLink = $mapBlock.data('link');

    ymaps.geoXml.load(dataLink)
      .then(function (res) {
        var myObjects = res.geoObjects.toArray();
        for (var i=0; i< myObjects.length; i++) {
          if(!myObjects[i].geometry._coordPath) {
            myObjects[i].options.set({
              iconLayout: 'default#image',
              iconImageHref: 'img/pin.svg',
              iconImageSize: [28, 40],
              hideIconOnBalloonOpen: false,
              balloonPanelMaxMapArea: 0
            })
            clusterer.add(myObjects[i]);
          } else {
            myMap.geoObjects.add(myObjects[i]);
          }
        }
        myMap.geoObjects.add(clusterer);
        if (res.mapState) {
          res.mapState.applyToMap(myMap);
        }
        else {
          myMap.setBounds(res.geoObjects.getBounds());
        }
      });
  }
})();
