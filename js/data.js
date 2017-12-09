'use strict';

(function () {

  var renderAvatar = function (i) {
    return i <= 9 ? '0' + i : i;
  };

  var getNotice = function (i) {
    var titleArr = window.utils.shuffleArray(window.Card.CardParam.TITLES);
    var locationX = window.utils.getRandomNum(window.Pin.PinParams.MIN_X, window.Pin.PinParams.MAX_X);
    var locationY = window.utils.getRandomNum(window.Pin.PinParams.MIN_Y, window.Pin.PinParams.MAX_Y);

    var notice = {
      author: {
        avatar: 'img/avatars/user' + renderAvatar(i + 1) + '.png'
      },
      offer: {
        title: titleArr[i],
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomNum(window.Card.CardParam.MIN_PRICE, window.Card.CardParam.MAX_PRICE),
        type: window.Card.CardParam.TYPES_OF_APART[window.utils.getRandomNum(0, window.Card.CardParam.TYPES_OF_APART.length - 1)],
        rooms: window.utils.getRandomNum(window.Card.CardParam.MIN_ROOMS, window.Card.CardParam.MAX_ROOMS),
        guests: window.utils.getRandomNum(window.Card.CardParam.MIN_GUESTS, window.Card.CardParam.MAX_GUESTS),
        time: window.Card.CardParam.TIMES[window.utils.getRandomNum(0, window.Card.CardParam.TIMES.length - 1)],
        features: window.utils.getRandomArr(window.Card.CardParam.FEATURES_OF_APART, window.utils.getRandomArrLength(window.Card.CardParam.FEATURES_OF_APART)),
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

  window.data = {
    getNoticesArr: function (length) {
      var notices = [];
      for (var i = 0; i < length; i++) {
        notices.push(getNotice(i));
      }
      return notices;
    }
  };
})();
