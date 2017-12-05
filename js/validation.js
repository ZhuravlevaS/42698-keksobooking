'use strict';

// Валидация формы
var form = document.querySelector('.notice__form');
var titleInput = form.querySelector('#title');
var priceInput = form.querySelector('#price');
var timeInSelect = form.querySelector('#timein');
var timeOutSelect = form.querySelector('#timeout');
var TypeOfApartSelect = form.querySelector('#type');
var PriceInput = form.querySelector('#price');
var RoomNumberSelect = form.querySelector('#room_number');
var CapacitySelect = form.querySelector('#capacity');


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

// проверка минимального кол-ва символов для EDGE
titleInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Имя должно состоять минимум из 30 символов');
  } else {
    target.setCustomValidity('');
  }
});

priceInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value < 0) {
    target.setCustomValidity('Цена должна быть больше 0');
  } else if (target.value > 1000000) {
    target.setCustomValidity('Цена должна быть меньше или равно 1 000 000');
  } else {
    target.setCustomValidity('');
  }
});

timeInSelect.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value) {
    var value = '"' + target.value + '"' + ']';
    timeOutSelect.querySelector('[selected]').removeAttribute('selected');
    timeOutSelect.querySelector('[value = ' + value).setAttribute('selected', 'selected');
  }
});

timeOutSelect.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value) {
    var value = '"' + target.value + '"' + ']';
    timeInSelect.querySelector('[selected]').removeAttribute('selected');
    timeInSelect.querySelector('[value = ' + value).setAttribute('selected', 'selected');
  }
});

TypeOfApartSelect.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value === 'flat') {
    PriceInput.setAttribute('min', '1000');
  } if (target.value === 'bungalo') {
    PriceInput.setAttribute('min', '0');
  } if (target.value === 'house') {
    PriceInput.setAttribute('min', '5000');
  } if (target.value === 'palace') {
    PriceInput.setAttribute('min', '10000');
  }
});

RoomNumberSelect.addEventListener('input', function (evt) {
  var target = evt.target;
  var cleanDisabled = function () {
    var desabledOptions = CapacitySelect.querySelectorAll('option[disabled]');
    if (desabledOptions) {
      for (var i = 0; i < desabledOptions.length; i++) {
        CapacitySelect.querySelector('option[disabled]').removeAttribute('disabled', 'disabled');
      }
    }
  };
  // var value = '"' + target.value + '"' + ']';
  if (target.value === '1') {
    CapacitySelect.querySelector('[selected]').removeAttribute('selected');
    CapacitySelect.querySelector('[value = "1"]').setAttribute('selected', 'selected');
    cleanDisabled();
    var notNeedOptionsValue1 = CapacitySelect.querySelectorAll('option:not([value = "1"])');

    for (var i = 0; i < notNeedOptionsValue1.length; i++) {
      notNeedOptionsValue1[i].setAttribute('disabled', 'disabled');
    }

  } if (target.value === '2') {
    CapacitySelect.querySelector('[selected]').removeAttribute('selected');
    CapacitySelect.querySelector('[value = "2"]').setAttribute('selected', 'selected');
    cleanDisabled();
    var notNeedOptionsValue2 = CapacitySelect.querySelectorAll('option[value = "2"] ~ option');

    for (var q = 0; q < notNeedOptionsValue2.length; q++) {
      notNeedOptionsValue2[q].setAttribute('disabled', 'disabled');
    }
  } if (target.value === '3') {
    CapacitySelect.querySelector('[selected]').removeAttribute('selected');
    CapacitySelect.querySelector('[value = "3"]').setAttribute('selected', 'selected');
    cleanDisabled();
    var notNeedOptionsValue3 = CapacitySelect.querySelectorAll('option[value = "3"] ~ option');

    for (var w = 0; w < notNeedOptionsValue3.length; w++) {
      notNeedOptionsValue3[w].setAttribute('disabled', 'disabled');
    }
  } if (target.value === '100') {
    CapacitySelect.querySelector('[selected]').removeAttribute('selected');
    CapacitySelect.querySelector('[value = "0"]').setAttribute('selected', 'selected');
    cleanDisabled();
    var notNeedOptionsValue0 = CapacitySelect.querySelectorAll('option:not([value = "0"])');

    for (var e = 0; e < notNeedOptionsValue0.length; e++) {
      notNeedOptionsValue0[e].setAttribute('disabled', 'disabled');
    }
  }
});
