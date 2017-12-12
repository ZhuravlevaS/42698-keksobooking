'use strict';

(function () {
  var NOTICE_QUANTITY = 8;

  var MAIN_PIN_PARAMS = {
    width: 65, // px
    height: 65, // px
    heightMark: 22 // px
  };

  var LIMITS_COORDS = {
    minY: 100 + MAIN_PIN_PARAMS.height / 2,
    maxY: 500 - MAIN_PIN_PARAMS.height / 2,
    minX: 0 + MAIN_PIN_PARAMS.width / 2,
    maxX: 1200 - MAIN_PIN_PARAMS.width / 2
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

      var coordTop = mainPin.offsetTop - shift.y;
      var coordLeft = mainPin.offsetLeft - shift.x;

      var limits = {
        minY: LIMITS_COORDS.minY,
        maxY: LIMITS_COORDS.maxY,
        minX: LIMITS_COORDS.minX,
        maxX: LIMITS_COORDS.maxX,
      };

      if (coordTop < limits.minY) {
        coordTop = limits.minY + 'px';
      } else
      if (coordTop > limits.maxY) {
        coordTop = limits.maxY + 'px';
      } else
      if (coordLeft < limits.minX) {
        coordLeft = limits.minX + 'px';
      } else
      if (coordLeft > limits.maxX) {
        coordLeft = limits.maxX + 'px';
      }

      mainPin.style.left = coordLeft + 'px';
      mainPin.style.top = coordTop + 'px';

      window.form.setAdress(window.pin.getMainPinCoords().left, (window.pin.getMainPinCoords().top + MAIN_PIN_PARAMS.height / 2 + MAIN_PIN_PARAMS.heightMark));
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

