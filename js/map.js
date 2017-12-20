'use strict';

(function () {
  var ACTIVE_PIN = 5;

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
  var filterForm = document.querySelector('.map__filters');

  var PRICE_ELEMS = {
    low: 10000,
    high: 50000
  };

  var filter = {
  };

  var copyPins = function (arr) {
    window.serverData = arr.slice();
  };

  var checkPrice = function (filterValue, data) {
    switch (filterValue) {
      case 'low':
        return data < PRICE_ELEMS.low;
      case 'middle':
        return data < PRICE_ELEMS.high && data >= PRICE_ELEMS.low;
      case 'high':
        return data >= PRICE_ELEMS.high;
      default:
        return false;
    }
  };

  var checkFeatures = function (filterValue, data) {
    return filterValue.every(function (feature) {
      return data.indexOf(feature) > -1;
    });

  };


  filterForm.addEventListener('change', function (evt) {
    var name = evt.target.getAttribute('name');

    if (evt.target.value === 'any') {
      delete filter[name.slice(8)];
    } else if (name !== 'features') {
      var keyForData = name.slice(8);

      filter[keyForData] = evt.target.value;
    } else {
      if (!filter.features) {
        filter.features = [evt.target.value];
      } else if (filter.features && filter.features.indexOf(evt.target.value) === -1) {
        filter.features.push(evt.target.value);
      } else {
        filter.features.splice(filter.features.indexOf(evt.target.value), 1);

        if (!filter.features.length) {
          delete filter.features;
        }
      }
    }

    if (!Object.keys(filter)) {
      window.utils.debounce(drawFilteredPins(window.serverData));
      return;
    }

    var filteredData = window.serverData.filter(function (data) {
      var currentHouse = data.offer;

      var isFitsFilter = Object.keys(filter).every(function (keyName) {
        if (keyName === 'price') {
          return checkPrice(filter[keyName], currentHouse[keyName]);
        } else if (keyName === 'features') {
          return checkFeatures(filter[keyName], currentHouse[keyName]);
        }
        return currentHouse[keyName].toString() === filter[keyName];
      });

      return isFitsFilter;
    });
    window.utils.debounce(drawFilteredPins(filteredData));
  });

  var drawFilteredPins = function (data) {
    window.pin.cleanPins();
    drawPin(data);
  };


  var drawPin = function (pins) {
    if (!window.serverData) {
      copyPins(pins);
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ACTIVE_PIN && i < pins.length; i++) {
      var pin = window.pin.render(pins[i]);
      fragment.appendChild(pin);
    }

    similarListButtons.appendChild(fragment);
  };

  var pinMouseupHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.backend.load(drawPin, window.backend.errorHandler);
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

  mainPin.addEventListener('click', pinMouseupHandler);
})();
