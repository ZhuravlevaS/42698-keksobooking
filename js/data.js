'use strict';

(function () {

  var getImageSource = function (i) {
    var userNumber = i <= 9 ? '0' + i : i;

    return 'img/avatars/user' + userNumber + '.png';
  };

  var Params = {
    MIN_X: 300,
    MAX_X: 900,
    MIN_Y: 100,
    MAX_Y: 500,
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


  window.data = {
    getNotice: function (i) {
      var titleArr = window.utils.shuffleArray(Params.TITLES);
      var locationX = window.utils.getRandomNum(Params.MIN_X, Params.MAX_X);
      var locationY = window.utils.getRandomNum(Params.MIN_Y, Params.MAX_Y);

      var notice = {
        author: {
          avatar: getImageSource(i + 1)
        },
        offer: {
          title: titleArr[i],
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomNum(Params.MIN_PRICE, Params.MAX_PRICE),
          type: Params.TYPES_OF_APART[window.utils.getRandomNum(0, Params.TYPES_OF_APART.length - 1)],
          rooms: window.utils.getRandomNum(Params.MIN_ROOMS, Params.MAX_ROOMS),
          guests: window.utils.getRandomNum(Params.MIN_GUESTS, Params.MAX_GUESTS),
          time: Params.TIMES[window.utils.getRandomNum(0, Params.TIMES.length - 1)],
          features: window.utils.getRandomArr(Params.FEATURES_OF_APART, window.utils.getRandomArrLength(Params.FEATURES_OF_APART)),
          description: '',
          photos: []
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
      return notice;
    }
  };
})();
