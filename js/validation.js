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
var buttomFormSubmit = form.querySelector('.form__submit');
var mainPin = document.querySelector('.map__pin--main');


function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

adressInput.value = getCoords(mainPin).top + ', ' + getCoords(mainPin).left;

var TYPE_APARTS_PARAM = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var MAP = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var validate = function () {
  var errorStyle = 'box-shadow: 0 0 4px 1px #ff6547';
  var validHasValue = function (elem) {
    if (!elem.value) {
      elem.style = errorStyle;
    }
  };
  validHasValue(titleInput);
  validHasValue(adressInput);
  var validTrueValue = function () {
    if (priceInput.value < priceInput.getAttribute('min')) {
      priceInput.style = errorStyle;
    }
  };
  validTrueValue();
};

buttomFormSubmit.addEventListener('click', function () {
  validate();
});

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Имя должно состоять минимум из 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

timeInSelect.addEventListener('change', function (evt) {
  var target = evt.target;
  timeOutSelect.value = target.value;
});

timeOutSelect.addEventListener('change', function (evt) {
  var target = evt.target;
  timeInSelect.value = target.value;
});

typeOfApartSelect.addEventListener('change', function (evt) {
  priceInput.setAttribute('min', TYPE_APARTS_PARAM[evt.target.value]);
});

roomNumberSelect.addEventListener('change', function (evt) {
  var target = evt.target;
  var HUNDRED_VALUE_ROOMS = '100';
  var ZERO_VALUE_GUEST = '0';
  var capacityArr = capacitySelect.querySelectorAll('option');
  var ElemMap = target.value;

  if (target.value === HUNDRED_VALUE_ROOMS) {
    capacitySelect.value = ZERO_VALUE_GUEST;
  } else {
    capacitySelect.value = target.value;
  }

  var cleanDisabled = function () {
    var desabledOptions = capacitySelect.querySelectorAll('option[disabled]');
    if (desabledOptions) {
      for (var i = 0; i < desabledOptions.length; i++) {
        capacitySelect.querySelector('option[disabled]').removeAttribute('disabled', 'disabled');
      }
    }
  }; cleanDisabled();
  for (var i = 0; i < capacityArr.length; i++) {
    if (MAP[ElemMap].indexOf(capacityArr[i].value) === -1) {
      capacityArr[i].setAttribute('disabled', 'disabled');
    }
  }
});
