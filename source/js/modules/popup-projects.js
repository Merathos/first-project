// 'use strict';

// (function () {
//   //находит в разметке попапа в который будет вставляться блок проектов
//   var popup = document.querySelectorAll('.js-projects-popup');
//   //находит ссылку по которой будет клик
//   var projectsLink = document.querySelector('.js-projects__item-link');

//   if (!popup) {
//     return;
//   }

//   //наверно нужно для очищения после предыдущего открытия
//   var resetProject = function () {
//     designProjects.innerHTML = '';
//   };

//   var initializeProjects = function (target) {
//     var projects = document.querySelector(".proposal__projects")
//   }
//   //находит в попапе div в который будет попадать блок с проектами
//   var designProjects = popup.querySelector('.js-projects-popup__frame');

//   //другая конструкция для открытия попапа
//   // var onDocumentClick = function (evt) {
//   //   if (evt.target.classList.contains('js-projects__item-link')) {
//   //     evt.preventDefault();
//   //     window.openPopup(popup);
//   //     resetProject();
//   //   }
//   // };

//   projectsLink.addEventListener('click', function(evt) {
//     evt.preventDefault();
//     window.openPopup(popup);
//   });

//   document.addEventListener('click', onDocumentClick);
// })();
