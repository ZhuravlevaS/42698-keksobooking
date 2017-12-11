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

  var pinMouseupHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    drawPin();
    mainPin.removeEventListener('click', pinMouseupHandler);
  };

  mainPin.addEventListener('click', pinMouseupHandler);


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: parseInt((getComputedStyle(evt.target.parentElement).left), 10),
      y: parseInt((getComputedStyle(evt.target.parentElement).top), 10)
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

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    getMainPinCoords: function () {
      var topCoordOfAddress = parseInt((getComputedStyle(mainPin).top), 10);
      var leftCoordOfAddress = parseInt((getComputedStyle(mainPin).left), 10);

      var coordinates = topCoordOfAddress + ', ' + leftCoordOfAddress;
      return coordinates;
    }
  };
})();

