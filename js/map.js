'use strict';

(function () {
  var MAX_PIN = 5;

  var MAIN_PIN_PARAMS = {
    width: 66, // px
    height: 66, // px
    heightMark: 22 // px
  };

  var LIMITS_COORDS = {
    minY: 100 - MAIN_PIN_PARAMS.height / 2 - MAIN_PIN_PARAMS.heightMark,
    maxY: 500 - MAIN_PIN_PARAMS.height / 2 - MAIN_PIN_PARAMS.heightMark,
    minX: 0 + MAIN_PIN_PARAMS.width / 2,
    maxX: 1200 - MAIN_PIN_PARAMS.width / 2
  };

  var similarListButtons = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var filterdForm = document.querySelector('.map__filters');
  var serverData = null;


  var cleanPins = function () {
    var mapPin = document.querySelector('.map__pins');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      mapPin.removeChild(pins[i]);
    }
  };

  var drawFilteredPins = function () {
    cleanPins();
    window.card.removeCard();
    var data = window.filterData(serverData);

    drawPin(data);
  };

  filterdForm.addEventListener('change', function () {
    window.utils.debounce(drawFilteredPins);
  });

  var drawPin = function (pins) {
    if (!serverData) {
      serverData = pins;
    }

    var fragment = document.createDocumentFragment();

    var slicedPins = (pins.length > MAX_PIN) ? pins.slice(0, MAX_PIN) : pins;

    slicedPins.forEach(function (pin) {
      var pinElem = window.pin.render(pin);
      fragment.appendChild(pinElem);
    });

    similarListButtons.appendChild(fragment);
  };

  var pinMouseupHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.backend.load(drawPin, window.backend.errorHandler);
    mainPin.removeEventListener('mouseup', pinMouseupHandler);
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
        coordTop = limits.minY;
      } else
      if (coordTop > limits.maxY) {
        coordTop = limits.maxY;
      } else
      if (coordLeft < limits.minX) {
        coordLeft = limits.minX;
      } else
      if (coordLeft > limits.maxX) {
        coordLeft = limits.maxX;
      }

      mainPin.style.left = coordLeft + 'px';
      mainPin.style.top = coordTop + 'px';

      window.form.setAdress(coordLeft, coordTop + MAIN_PIN_PARAMS.height / 2 + MAIN_PIN_PARAMS.heightMark);
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('mouseup', pinMouseupHandler);
})();
