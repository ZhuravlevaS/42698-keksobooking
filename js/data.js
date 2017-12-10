'use strict';

(function () {

  var renderAvatar = function (i) {
    return i <= 9 ? '0' + i : i;
  };

  var NoticeParam = {
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
      var titleArr = window.utils.shuffleArray(NoticeParam.TITLES);
      var locationX = window.utils.getRandomNum(NoticeParam.MIN_X, NoticeParam.MAX_X);
      var locationY = window.utils.getRandomNum(NoticeParam.MIN_Y, NoticeParam.MAX_Y);

      var notice = {
        author: {
          avatar: 'img/avatars/user' + renderAvatar(i + 1) + '.png'
        },
        offer: {
          title: titleArr[i],
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomNum(NoticeParam.MIN_PRICE, NoticeParam.MAX_PRICE),
          type: NoticeParam.TYPES_OF_APART[window.utils.getRandomNum(0, NoticeParam.TYPES_OF_APART.length - 1)],
          rooms: window.utils.getRandomNum(NoticeParam.MIN_ROOMS, NoticeParam.MAX_ROOMS),
          guests: window.utils.getRandomNum(NoticeParam.MIN_GUESTS, NoticeParam.MAX_GUESTS),
          time: NoticeParam.TIMES[window.utils.getRandomNum(0, NoticeParam.TIMES.length - 1)],
          features: window.utils.getRandomArr(NoticeParam.FEATURES_OF_APART, window.utils.getRandomArrLength(NoticeParam.FEATURES_OF_APART)),
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
