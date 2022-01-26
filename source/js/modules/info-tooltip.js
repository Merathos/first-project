'use strict';

var tooltipsInit = function () {
  var tooltips = document.querySelectorAll('.info-tooltip');

  if (!tooltips.length) {
    return;
  }


  var OFFSET = 20;


  var showTooltip = function (evt) {
    var label = evt.target.closest('.info-tooltip');

    if (label) {
      label.classList.add('shown');

      var tooltip = label.querySelector('.info-tooltip__text');
      var tooltipRect = tooltip.getBoundingClientRect();

      if (tooltipRect.left <= OFFSET) {
        tooltip.style.left = -(label.getBoundingClientRect().left - OFFSET) + 'px';

        tooltip.classList.add('info-tooltip__text--side-close');
        return;
      }

      if (tooltipRect.right >= document.documentElement.clientWidth - OFFSET) {
        tooltip.style.right = -(document.documentElement.clientWidth - label.getBoundingClientRect().right - OFFSET) + 'px';

        tooltip.classList.add('info-tooltip__text--side-close');
        return;
      }
    }
  };


  var hideTooltip = function (evt) {
    var label = evt.target.closest('.info-tooltip');

    if (label) {
      label.classList.remove('shown');

      var tooltip = label.querySelector('.info-tooltip__text');

      tooltip.classList.remove('info-tooltip__text--side-close');
      tooltip.style = '';
    }
  };


  document.addEventListener('mouseover', showTooltip);
  document.addEventListener('mouseout', hideTooltip);

  document.addEventListener('focusin', showTooltip);
  document.addEventListener('focusout', hideTooltip);
}

tooltipsInit();
