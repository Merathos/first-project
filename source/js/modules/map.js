'use strict';

(function () {
  var $mapBlock = $('#improvement-map');

  if (!$mapBlock.length>0) return;

  ymaps.ready(init);

  function init () {
    var myMap = new ymaps.Map($mapBlock[0], {
        center: [55.76, 37.64],
        controls: [],
        zoom: 15
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

    if(window.innerWidth >= 400) {
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
    }

    var balloonOffset = [];

    if(window.innerWidth < 400) {
      balloonOffset = [-5, 32]
    } else {
      balloonOffset = [43, -27]
    }

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

    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover right">' +
      '<button type="button" aria-label="Закрыть информацию" class="close"></button>' +
      '<div class="arrow"></div>' +
      '<div class="popover-inner">' +
      '$[[options.contentLayout observeSize minWidth=300 maxWidth=300 maxHeight=500]]' +
      '</div>' +
      '</div>', {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = $('.popover', this.getParentElement());

          this.applyElementOffset();

          this._$element.find('.close')
            .on('click', $.proxy(this.onCloseClick, this));
        },

        /**
         * Удаляет содержимое макета из DOM.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
         * @function
         * @name clear
         */
        clear: function () {
          this._$element.find('.close')
            .off('click');

          this.constructor.superclass.clear.call(this);
        },

        /**
         * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onSublayoutSizeChange
         */
        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if(!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();

          this.events.fire('shapechange');
        },

        /**
         * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name applyElementOffset
         */
        applyElementOffset: function () {
          if(window.innerWidth < 400) {
            this._$element.css({
              top: 0
            });
          } else {
            this._$element.css({
              top: -(this._$element[0].offsetHeight/2)
            });
          }
        },

        /**
         * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onCloseClick
         */
        onCloseClick: function (e) {
          e.preventDefault();

          this.events.fire('userclose');
        },

        /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape: function () {
          if(!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          var position = this._$element.position();

          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
            [position.left, position.top], [
              position.left + this._$element[0].offsetWidth + 200,
              position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
            ]
          ]));
        },

        /**
         * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
         * @function
         * @private
         * @name _isElement
         * @param {jQuery} [element] Элемент.
         * @returns {Boolean} Флаг наличия.
         */
        _isElement: function (element) {
          return element && element[0] && element.find('.arrow')[0];
        }
      });

    // var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    //   '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
    //   '<div class="popover-content">$[properties.balloonContent]</div>'
    // );
    var dataLink = $mapBlock.data('link');

    ymaps.geoXml.load(dataLink)
      .then(function (res) {
        var myObjects = res.geoObjects.toArray();
        if(myObjects.length > 0) {
          myMap.setCenter([myObjects[0].geometry._coordinates[0], myObjects[0].geometry._coordinates[1]])
        }
        for (var i=0; i< myObjects.length; i++) {
          if(!myObjects[i].geometry._coordPath) {
            myObjects[i].options.set({
              balloonLayout: MyBalloonLayout,
              // balloonContentLayout: MyBalloonContentLayout,
              iconLayout: 'default#image',
              iconImageHref: 'img/pin.svg',
              iconImageSize: [28, 40],
              hideIconOnBalloonOpen: false,
              balloonPanelMaxMapArea: 0,
              balloonOffset: balloonOffset
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
