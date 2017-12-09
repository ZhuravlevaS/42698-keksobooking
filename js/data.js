'use strict';

(function () {

  var CardParam = {
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 5,
    MIN_GUESTS: 1,
    MAX_GUESTS: 10,
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPES_OF_APART: ['flat', 'house', 'bungalo'],
    TIMES: ['12:00', '13:00', '14:00'],
    FEATURES_OF_APART: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };

  var PinParams = {
    MIN_X: 300,
    MAX_X: 900,
    MIN_Y: 100,
    MAX_Y: 500
  };

  var renderAvatar = function (i) {
    return i <= 9 ? '0' + i : i;
  };

  var getRandomNum = function (min, max) {
    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
  };

  var shuffleArray = function (arr) {
    var newArr = [];
    var copyArr = arr.slice();
    while (copyArr.length > 0) {
      var RandomArray = getRandomNum(0, copyArr.length - 1);
      var current = copyArr.splice(RandomArray, 1)[0];
      newArr.push(current);
    }
    return newArr;
  };

  var getRandomArrLength = function (arr) {
    var length = getRandomNum(0, arr.length - 1);
    return length;
  };

  var getRandomArr = function (array, length) {
    var randomArray = [];

    while (randomArray.length < length) {
      var value = array[getRandomNum(0, array.length - 1)];
      if (randomArray.indexOf(value) !== -1) {
        continue;
      } else {
        randomArray.push(value);
      }
    }

    return randomArray;
  };

  var getNotice = function (i) {
    var titleArr = shuffleArray(CardParam.TITLES);
    var locationX = getRandomNum(PinParams.MIN_X, PinParams.MAX_X);
    var locationY = getRandomNum(PinParams.MIN_Y, PinParams.MAX_Y);

    var notice = {
      author: {
        avatar: 'img/avatars/user' + renderAvatar(i + 1) + '.png'
      },
      offer: {
        title: titleArr[i],
        address: locationX + ', ' + locationY,
        price: getRandomNum(CardParam.MIN_PRICE, CardParam.MAX_PRICE),
        type: CardParam.TYPES_OF_APART[getRandomNum(0, CardParam.TYPES_OF_APART.length - 1)],
        rooms: getRandomNum(CardParam.MIN_ROOMS, CardParam.MAX_ROOMS),
        guests: getRandomNum(CardParam.MIN_GUESTS, CardParam.MAX_GUESTS),
        time: CardParam.TIMES[getRandomNum(0, CardParam.TIMES.length - 1)],
        features: getRandomArr(CardParam.FEATURES_OF_APART, getRandomArrLength(CardParam.FEATURES_OF_APART)),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return notice;
  };

  // var getNoticesArr = function (length) {
  //   var notices = [];
  //   for (var i = 0; i < length; i++) {
  //     notices.push(getNotice(i));
  //   }
  //   return notices;
  // };

  window.data = {
    getNoticesArr: function (length) {
      var notices = [];
      for (var i = 0; i < length; i++) {
        notices.push(getNotice(i));
      }
      return notices;
    },
    mapElement: document.querySelector('.map'),
    removeClass: function (elem, className) {
      if (elem) {
        elem.classList.remove(className);
      }
    },
    ESC: 27,
    mainPin: document.querySelector('.map__pin--main')
  };
})();
