'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var priceInput = form.querySelector('#price');
  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');
  var typeOfApartSelect = form.querySelector('#type');
  var roomNumberSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var adressInput = document.querySelector('#address');

  var ERROR_STYLE = 'border: 1px solid #ff6547';

  var typeApartsParams = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var roomsActiveElem = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var roomsValue = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': '0'
  };

  form.addEventListener('invalid', function (evt) {
    evt.target.style = ERROR_STYLE;
  }, true);

  var syncValue = function (elem, evt) {
    elem.value = evt.target.value;
  };

  timeInSelect.addEventListener('change', function (evt) {
    syncValue(timeOutSelect, evt);
  });

  timeOutSelect.addEventListener('change', function (evt) {
    syncValue(timeInSelect, evt);
  });

  typeOfApartSelect.addEventListener('change', function (evt) {
    priceInput.setAttribute('min', typeApartsParams[evt.target.value]);
  });

  roomNumberSelect.addEventListener('change', function (evt) {
    var capacityArr = capacitySelect.querySelectorAll('option');

    capacitySelect.value = roomsValue[evt.target.value];

    capacityArr.forEach(function (elem) {
      elem.disabled = !roomsActiveElem[evt.target.value].includes(elem.value);
    });
  });

  window.form = {
    putAdressValue: function () {
      adressInput.value = window.pin.getMainPinCoords();
    }
  };
})();
