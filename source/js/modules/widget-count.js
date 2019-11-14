'use strict';

(function () {
  var widgetCountPage = document.getElementById("widget_count_page");
  var widgetCountAll = document.getElementById("widget_count_all");
  var widgetTimer = document.getElementById("widget_timer");
  var widgetWidthInput = document.getElementById('widget_width_input');
  var widgetPreview = document.querySelector('.widget_block__preview__block');

  var widgetPaginationItemOnPage = 5;
  var widgetPaginationItemAll = 15;
  var widgetTimerValue = 2000;

  var widgetPaginationEl = Math.ceil((widgetPaginationItemAll / widgetPaginationItemOnPage) + 1);

  if (!widgetCountPage && !widgetCountAll && !widgetTimer && !widgetPreview) {
    return;
  }

  var mySwiper = null;
  var i = 1;

  var paginationSlider = function() {
    $('.swiper-pagination').pagination({
      items: widgetPaginationItemAll,
      itemsOnPage: widgetPaginationItemOnPage,
      displayedPages: 3,
      edges: 1,
      cssStyle: '',
      currentPage: 1,
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
      },
      slideChangeTransitionStart: function () {
          $('.swiper-pagination').pagination({
            items: widgetPaginationItemAll,
            itemsOnPage: widgetPaginationItemOnPage,
            displayedPages: 3,
            edges: 1,
            cssStyle: '',
            currentPage: i++,
            prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
            nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
            onPageClick: function(pageNumber, event) {
              mySwiper.slideTo(pageNumber - 1,400,false);
            },
          });   
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

      if(event.srcElement.value === ''){
        return;
      }

      i = 1;

      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        this.style.border = '1px solid #e3e8ee';

        widgetPaginationItemOnPage = Number(event.srcElement.value);
        widgetPaginationEl = Math.ceil((widgetPaginationItemAll / widgetPaginationItemOnPage) + 1);

        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
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
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: i++,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
             
              if(i === widgetPaginationEl){
                i = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;

      } else {
        this.parentElement.append(error);
        this.style.border = '1px solid #F3A8A8';
        error.innerHTML = "Количество элементов на странице не может быть 0";} 

    });
  }

  if(widgetCountAll) {
    widgetCountAll.addEventListener('focusout',function(event){

      if(event.srcElement.value === ''){
        return;
      }
      i = 1;

      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        this.style.border = '1px solid #e3e8ee';

        widgetPaginationItemAll = Number(event.srcElement.value);
        widgetPaginationEl = Math.ceil((widgetPaginationItemAll / widgetPaginationItemOnPage) + 1);

        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
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
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: i++,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
             
              if(i === widgetPaginationEl){
                i = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;
      } else  {
        this.parentElement.append(error);
        this.style.border = '1px solid #F3A8A8';
        error.innerHTML = "Общее количество элементов не может быть 0";
      } 
    });
  }

  if(widgetTimer) {
    widgetTimer.addEventListener('focusout',function(event){

      if(event.srcElement.value === ''){
        return;
      }
      i = 1;

      if(event.srcElement.value > 0 && event.srcElement.value != '') {
        error.remove();
        this.style.border = '1px solid #e3e8ee';
        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
        widgetTimerValue = event.srcElement.value;
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
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: i++,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
             
              if(i === widgetPaginationEl){
                i = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;
      } else {
        this.parentElement.append(error);
        this.style.border = '1px solid #F3A8A8';
        error.innerHTML = "Время не может быть пустым";} 
    });
  }

  if(widgetWidthInput) {
    widgetWidthInput.addEventListener('focusout',function(event){
      if(event.srcElement.value === ''){
        return
      }

      i = 1;

      if(event.srcElement.value >= 320){
        widgetPreview.style.width = event.srcElement.value + 'px';
        error.remove();
        this.style.border = '1px solid #e3e8ee';

        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.destroy(true,true);
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
            },
            slideChangeTransitionStart: function () {
              $('.swiper-pagination').pagination({
                items: widgetPaginationItemAll,
                itemsOnPage: widgetPaginationItemOnPage,
                displayedPages: 3,
                edges: 1,
                cssStyle: '',
                currentPage: i++,
                prevText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-prev"></use></svg>',
                nextText: '<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><use xlink:href="img/sprite.svg#icon-paginator-next"></use></svg>',
                onPageClick: function(pageNumber, event) {
                  mySwiper.slideTo(pageNumber - 1,400,false);
                },
              });
             
              if(i === widgetPaginationEl){
                i = 1;
              }
            }
          },
        });
        var mySwiper = document.querySelector('.swiper-container').swiper;
      } else {
        this.parentElement.append(error);
        this.style.border = '1px solid #F3A8A8';
        error.innerHTML = "Ширина должна быть не менее 320px";
      }
    });
  }


})();
