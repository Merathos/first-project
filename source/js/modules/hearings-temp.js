'use strict';

(function () {
    if (document.querySelector('.hearings-result__status-info')) {
        var resultContainer = document.querySelector('.hearings__result');
        var statusInfo = resultContainer.querySelector('.hearings-result__status-info');
        var pollResultTemplate = document.querySelector('#poll-result');

        statusInfo.addEventListener('click', function (evt) {
            evt.preventDefault();
            statusInfo.remove();
            var clone = pollResultTemplate.content.firstElementChild.cloneNode(true);
            resultContainer.append(clone);
        });

    }
})();