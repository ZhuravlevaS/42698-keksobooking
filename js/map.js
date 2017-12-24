'use strict';

(function () {
  var MAX_PIN = 5;
  var MIN_Y = 100;
  var MAX_Y = 500;
  var MIN_X = 0;
  var MAX_X = 1200;

  var MainPinParams = {
    WIDTH: 66, // px
    HEIGHT: 66, // px
    HEIGHT_MARK: 22 // px
  };

  var LimitsCoords = {
    MIN_Y: MIN_Y - MainPinParams.HEIGHT / 2 - MainPinParams.HEIGHT_MARK,
    MAX_Y: MAX_Y - MainPinParams.HEIGHT / 2 - MainPinParams.HEIGHT_MARK,
    MIN_X: MIN_X + MainPinParams.WIDTH / 2,
    MAX_X: MAX_X - MainPinParams.WIDTH / 2
  };

  var similarListButtons = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var filterdForm = document.querySelector('.map__filters');
  var originalNotes = null;


  var cleanPins = function () {
    var mapPin = document.querySelector('.map__pins');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      mapPin.removeChild(pins[i]);
    }
  };

  var drawFilteredPins = function () {
    cleanPins();
    window.card.remove();
    var filteredNotes = window.filterData(originalNotes);

    drawPin(filteredNotes);
  };

  filterdForm.addEventListener('change', function () {
    window.utils.debounce(drawFilteredPins);
  });

  var drawPin = function (pins) {
    if (!originalNotes) {
      originalNotes = pins;
    }

    var fragment = document.createDocumentFragment();

    var slicedPins = (pins.length > MAX_PIN) ? pins.slice(0, MAX_PIN) : pins;

    slicedPins.forEach(function (pin) {
      var pinElement = window.pin.render(pin);
      fragment.appendChild(pinElement);
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

    var mouseMoveHandler = function (moveEvt) {
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
        minY: LimitsCoords.MIN_Y,
        maxY: LimitsCoords.MAX_Y,
        minX: LimitsCoords.MIN_X,
        maxX: LimitsCoords.MAX_X,
      };

      if (coordTop < limits.minY) {
        coordTop = limits.minY;
      }
      if (coordTop > limits.maxY) {
        coordTop = limits.maxY;
      }
      if (coordLeft < limits.minX) {
        coordLeft = limits.minX;
      }
      if (coordLeft > limits.maxX) {
        coordLeft = limits.maxX;
      }

      mainPin.style.left = coordLeft + 'px';
      mainPin.style.top = coordTop + 'px';

      window.form.setAdress(coordLeft, coordTop + MainPinParams.HEIGHT / 2 + MainPinParams.HEIGHT_MARK);
    };


    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  mainPin.addEventListener('mouseup', pinMouseupHandler);
})();
