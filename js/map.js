'use strict';

(function () {
  var NOTICE_QUANTITY = 8;

  var LIMITS_COORDS = {
    minY: 100,
    maxY: 500,
    minX: 0,
    maxX: 1200
  };

  var MAIN_PIN_PARAMS = {
    width: 65, // px
    height: 65 // px
  };

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

  var pinMouseupHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    drawPin();
    mainPin.removeEventListener('click', pinMouseupHandler);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var height = mainPin.offsetTop - shift.y;
      var width = mainPin.offsetLeft - shift.x;
      var minY = LIMITS_COORDS.minY + MAIN_PIN_PARAMS.height;
      var maxY = LIMITS_COORDS.maxY - MAIN_PIN_PARAMS.height;
      var minX = LIMITS_COORDS.minX + MAIN_PIN_PARAMS.width / 2;
      var maxX = LIMITS_COORDS.maxX - MAIN_PIN_PARAMS.width / 2;

      if (height < minY) {
        mainPin.style.top = minY + 'px';
      } else
      if (height > maxY) {
        mainPin.style.top = maxY + 'px';
      } else
      if (width < minX) {
        mainPin.style.left = minX + 'px';
      } else
      if (width > maxX) {
        mainPin.style.left = maxX + 'px';
      }

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

      window.pin.getMainPinCoords();
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('click', pinMouseupHandler);
})();

