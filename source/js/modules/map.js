'use strict';

(function () {
  var $mapBlock = $('#map');

  if (!$mapBlock) return;

  ymaps.ready(init);

  function init () {
    var myMap = new ymaps.Map($mapBlock[0], {
        center: [55.76, 37.64],
        zoom: 3
      }, {
        searchControlProvider: 'yandex#search'
      }),
      objectManager = new ymaps.ObjectManager({
        // пока objectManager не нужен, но оставлю
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
      });

    // var iconSize = [];
    //
    // if(window.innerWidth < 768) {
    //   iconSize = [38, 54]
    // } else {
    //   iconSize = [40, 58]
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

    var dataLink = $mapBlock.data('link');

    ymaps.geoXml.load(dataLink)
      .then(function (res) {
        var myObjects = res.geoObjects.toArray();
        for (var i=0; i< myObjects.length; i++) {
          clusterer.add(myObjects[i]);
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
