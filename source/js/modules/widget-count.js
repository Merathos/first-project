'use strict';

(function () {
  var widgetCountPage = document.getElementById("widget_count_page");
  var widgetCountAll = document.getElementById("widget_count_all");
  var widgetTimer = document.getElementById("widget_timer");
  var widgetInput = document.querySelector('.widget_block__input_bottom');

  var widgetPaginationItemOnPage = 5;
  var widgetPaginationItemAll = 15;
  var widgetTimerValue = 2000;

  var widgetPaginationEl = (widgetPaginationItemAll / widgetPaginationItemOnPage) + 1;

  if (!widgetCountPage && !widgetCountAll && !widgetTimer) {
    return;
  }

  var mySwiper = null;
  var i = 0;
  var q = 0;

  var paginationSlider = function() {
    $('.swiper-pagination').pagination({
      items: widgetPaginationItemAll,
      itemsOnPage: widgetPaginationItemOnPage,
      displayedPages: 3,
      edges: 1,
      cssStyle: '',
      currentPage: i,
      prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
      nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
      onPageClick: function(pageNumber, event) {
        mySwiper.slideTo(pageNumber - 1,400,false);
      },
    });
  }
  
  var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    autoplay: {
      delay: widgetTimerValue,
    },
    watchOverflow: true,
    grabCursor: true,
    loop: true,
    allowTouchMove:false,
    hashNavigation: false,
    on: {
      init: function () {
        paginationSlider();
        // WidgetTimerDelay();
      },
      slideChangeTransitionStart: function () {
        paginationSlider();
        i++;        
        if(i === widgetPaginationEl){
          i = 1;
        }
      }
    },
  });

  
  var mySwiper = document.querySelector('.swiper-container').swiper;


  var error = document.createElement("div");
  error.classList.add('error');

  if(widgetCountPage) {
    widgetCountPage.addEventListener('focusout',function(event){
      widgetInput.append(error);
      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        widgetPaginationItemOnPage = Number(event.srcElement.value);
        paginationSlider();
        widgetPaginationEl = (widgetPaginationItemAll / widgetPaginationItemOnPage) + 1;
      } else {widgetInput.append(error);error.innerHTML = "Количество элементов на странице не может быть 0";} 
    });
  }

  if(widgetCountAll) {
    widgetCountAll.addEventListener('focusout',function(event){
      widgetInput.append(error);
      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        widgetPaginationItemAll = Number(event.srcElement.value);
        paginationSlider();
        widgetPaginationEl = (widgetPaginationItemAll / widgetPaginationItemOnPage) + 1;
      } else  {widgetInput.append(error);error.innerHTML = "Количество элементов на странице не может быть 0";} 
    });
  }

  if(widgetTimer) {
    widgetTimer.addEventListener('focusout',function(event){
      widgetInput.append(error);
      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
        var mySwiper = new Swiper('.swiper-container', {
          speed: 400,
          autoplay: {
            delay: event.srcElement.value,
          },
          watchOverflow: true,
          grabCursor: true,
          loop: true,
          allowTouchMove:false,
          hashNavigation: false,
          on: {
            init: function () {
              paginationSlider();
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: q,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
      
              q++;        
              if(q === widgetPaginationEl){
                q = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;
      } else {widgetInput.append(error);error.innerHTML = "Время не может быть пустым";} 
    });
  }


})();
