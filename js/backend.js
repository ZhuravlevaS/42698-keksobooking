'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var TIMEOUT = 10000; // 10s

  var StatusesRequest = {
    RESPOND_SUCCESS: 200,
    RESPOND_ERROR_404: 404
  };

  var setup = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusesRequest.RESPOND_SUCCESS) {
        successHandler(xhr.response);
      } else if (xhr.status === StatusesRequest.RESPOND_ERROR_404) {
        errorHandler('Данные не найдены');
      } else {
        errorHandler(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  window.backend = {
    save: function (data, successHandler, errorHandler) {
      var xhr = setup(successHandler, errorHandler);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (successHandler, errorHandler) {
      var xhr = setup(successHandler, errorHandler);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255, 0, 0, 0.5); height: 30px;';
      node.style.position = 'fixed';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '16px';
      node.style.lineHeight = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
