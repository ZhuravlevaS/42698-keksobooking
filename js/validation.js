'use strict';

// Валидация формы
var form = document.querySelector('.notice__form');
var adressInput = form.querySelector('#address');
var priceInput = form.querySelector('#price');
var timeInSelect = form.querySelector('#timein');
var timeOutSelect = form.querySelector('#timeout');
var typeOfApartSelect = form.querySelector('#type');
var roomNumberSelect = form.querySelector('#room_number');
var capacitySelect = form.querySelector('#capacity');
var mainPin = document.querySelector('.map__pin--main');

var ERROR_STYLE = 'border: 1px solid #ff6547';

adressInput.value = getComputedStyle(mainPin).top + ', ' + getComputedStyle(mainPin).left;

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
  var target = evt.target;

  target.style = ERROR_STYLE;
}, true);

var syncValue = function (elem, evt) {
  var target = evt.target;
  elem.value = target.value;
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
  var target = evt.target;
  var targetValue = target.value;
  var capacityArr = capacitySelect.querySelectorAll('option');

  capacitySelect.value = roomsValue[targetValue];

  capacityArr.forEach(function (elem) {
    elem.disabled = !roomsActiveElem[targetValue].includes(elem.value);
  });
});
