// Переключение вкладок в фильтре поиска шин - Параметры - по Марке
'use strict';

(function () {
  var chooseTabs = function () {
    var tabButton = document.querySelectorAll(".proposal__tab");
    var tabItem = document.querySelectorAll(".proposal__tab-item");
    var tabName;

    tabButton.forEach(function (item) {
      item.addEventListener('click', toggleTabs);
    });

    function toggleTabs() {
      tabButton.forEach(function (item) {
        item.classList.remove("proposal__tab--active");
      });
      this.classList.add("proposal__tab--active");
      console.log(this);
      tabName = this.getAttribute("data-tab-name");
      selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
      tabItem.forEach(function (item) {
        if (item.classList.value.includes(tabName)) {
          item.classList.add("proposal__tab-item--active");
        } else {
          item.classList.remove("proposal__tab-item--active");
        }
      });
    }
  };
  chooseTabs();
})();
