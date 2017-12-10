'use strict';

(function () {
  var NOTICE_QUANTITY = 8;
  var similarListButtons = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var getNoticesArr = function (length) {
    var notices = [];
    for (var i = 0; i < length; i++) {
      notices.push(window.data.getNotice(i));
    }
    return notices;
  };

  var drawPin = function () {
    var fragment = document.createDocumentFragment();
    var noticesArr = getNoticesArr(NOTICE_QUANTITY);

    for (var i = 0; i < NOTICE_QUANTITY; i++) {
      var pin = window.pin.render(noticesArr[i]);
      fragment.appendChild(pin);
    }

    similarListButtons.appendChild(fragment);
  };

  mainPin.addEventListener('mouseup', function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    drawPin();
  });
})();
