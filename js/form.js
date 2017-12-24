'use strict';

(function () {
  var ERROR_STYLE = 'border: 1px solid #ff6547';
  var TIME_VALUES = ['12:00', '13:00', '14:00'];
  var APART_TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var PRICES = ['0', '1000', '5000', '10000'];
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', '2', '3', '0'];

  var form = document.querySelector('.notice__form');
  var priceInput = form.querySelector('#price');
  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');
  var typeOfApartSelect = form.querySelector('#type');
  var roomNumberSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var adressInput = document.querySelector('#address');

  var roomsActiveElement = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '0': ['0']
  };

  var validateAdress = function () {
    if (adressInput.value === '') {
      adressInput.style = ERROR_STYLE;
      return true;
    }

    return false;
  };

  form.addEventListener('invalid', function (evt) {
    evt.target.style = ERROR_STYLE;
  }, true);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (validateAdress()) {
      return;
    }

    window.backend.save(new FormData(form), formReset, window.backend.errorHandler);
  });

  var formReset = function () {
    var requiredInputs = form.querySelectorAll('input[required]');

    form.reset();
    priceInput.min = '0';
    [].forEach.call(requiredInputs, function (element) {
      element.style = '';
    });
  };

  var syncValue = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var disableSelect = function (element, value) {
    var options = element.querySelectorAll('option');
    [].forEach.call(options, function (item) {
      item.disabled = !roomsActiveElement[value].includes(item.value);
    });
  };

  var syncValueWithDisabled = function (element, value) {
    element.value = value;
    disableSelect(element, value);
  };

  disableSelect(capacitySelect, capacitySelect.value);
  window.synchronizeFields(timeInSelect, timeOutSelect, TIME_VALUES, TIME_VALUES, syncValue);
  window.synchronizeFields(timeOutSelect, timeInSelect, TIME_VALUES, TIME_VALUES, syncValue);
  window.synchronizeFields(typeOfApartSelect, priceInput, APART_TYPES, PRICES, syncValueWithMin);
  window.synchronizeFields(roomNumberSelect, capacitySelect, ROOMS, GUESTS, syncValueWithDisabled);

  window.form = {
    setAdress: function (left, top) {
      adressInput.value = left + ', ' + top;
    }
  };
})();
