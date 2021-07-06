// 'use strict';
//
// (function () {
//   var targets = document.querySelectorAll('.ss-main.js-multiple-select');
//   console.log(targets)
//
//   if (targets.length) {
//     targets.forEach(function (target) {
//       var elementsList = target.querySelector('.ss-list');
//
//       var mutationObserverConfig = {
//         attributes: false,
//         childList: true,
//         subtree: false
//       };
//
//       var removeClasses = function () {
//         target.classList.remove('two-column', 'three-column');
//       };
//
//       var changeElementsNumberHandler = function () {
//         var number = elementsList.querySelectorAll('.ss-option:not(.ss-hide)').length;
//         removeClasses();
//         console.log(number)
//
//         if (number > 8 && number <= 15) {
//           target.classList.add('two-column');
//         }
//         if (number > 14 && number <= 21) {
//           target.classList.add('three-column');
//         }
//         if (number > 21) {
//           target.classList.add('three-column');
//           target.classList.add('fixed-height');
//         }
//       };
//
//       var observer = new MutationObserver(changeElementsNumberHandler);
//       observer.observe(elementsList, mutationObserverConfig);
//       changeElementsNumberHandler();
//
//     });
//   }
// })();
