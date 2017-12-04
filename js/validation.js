'use strict';

// Валидация формы
var form = document.querySelector('.notice__form');
var titleInput = form.querySelector('#title');
var priceInput = form.querySelector('#price');

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

