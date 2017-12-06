'use strict';

// Валидация формы
var form = document.querySelector('.notice__form');
var titleInput = form.querySelector('#title');
var adressInput = form.querySelector('#address');
var priceInput = form.querySelector('#price');
var timeInSelect = form.querySelector('#timein');
var timeOutSelect = form.querySelector('#timeout');
var typeOfApartSelect = form.querySelector('#type');
var roomNumberSelect = form.querySelector('#room_number');
var capacitySelect = form.querySelector('#capacity');
var mainPin = document.querySelector('.map__pin--main');


var HUNDRED_VALUE_ROOMS = '100';
var ZERO_VALUE_GUEST = '0';

adressInput.value = getComputedStyle(mainPin).top + ', ' + getComputedStyle(mainPin).left;

var TYPE_APARTS_PARAM = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var ROOMS_PARAMS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

// var validate = function () {
//   var errorStyle = 'border: 1px solid #ff6547';
//   var validHasValue = function (elem) {
//     if (!elem.value) {
//       elem.style = errorStyle;
//     }
//   };
//   validHasValue(titleInput);
//   validHasValue(adressInput);
//   var validTrueValue = function () {
//     if (priceInput.value < priceInput.getAttribute('min')) {
//       priceInput.style = errorStyle;
//     }
//   };
//   validTrueValue();
// };
// var validHasValue = function (elem, style) {
//   if (!elem.value) {
//     elem.style = style;
//   }
// };

form.addEventListener('invalid', function (evt) {
  var errorStyle = 'border: 1px solid #ff6547';
  var target = evt.target;

  target.style = errorStyle;
});

// titleInput.addEventListener('invalid', function () {
//   if (titleInput.validity.tooShort) {
//     titleInput.setCustomValidity('Имя должно состоять минимум из 30 символов');
//   } else if (titleInput.validity.tooLong) {
//     titleInput.setCustomValidity('Имя не должно превышать 100 символов');
//   } else if (titleInput.validity.valueMissing) {
//     titleInput.setCustomValidity('Обязательное поле');
//   } else {
//     titleInput.setCustomValidity('');
//   }
// });

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
  priceInput.setAttribute('min', TYPE_APARTS_PARAM[evt.target.value]);
});

roomNumberSelect.addEventListener('change', function (evt) {
  var target = evt.target;
  var capacityArr = capacitySelect.querySelectorAll('option');
  var elemMap = target.value;

  if (target.value === HUNDRED_VALUE_ROOMS) {
    capacitySelect.value = ZERO_VALUE_GUEST;
  } else {
    capacitySelect.value = target.value;
  }

  for (var i = 0; i < capacityArr.length; i++) {
    if (ROOMS_PARAMS[elemMap].includes(capacityArr[i].value)) {
      capacityArr[i].removeAttribute('disabled', 'disabled');
    } else {
      capacityArr[i].setAttribute('disabled', 'disabled');
    }
  }
});
