'use strict';

(function () {

  var renderAvatar = function (i) {
    return i <= 9 ? '0' + i : i;
  };

  var getNotice = function (i) {
    var titleArr = window.utils.shuffleArray(window.renderCard.CardParam.TITLES);
    var locationX = window.utils.getRandomNum(window.renderPin.PinParams.MIN_X, window.renderPin.PinParams.MAX_X);
    var locationY = window.utils.getRandomNum(window.renderPin.PinParams.MIN_Y, window.renderPin.PinParams.MAX_Y);

    var notice = {
      author: {
        avatar: 'img/avatars/user' + renderAvatar(i + 1) + '.png'
      },
      offer: {
        title: titleArr[i],
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomNum(window.renderCard.CardParam.MIN_PRICE, window.renderCard.CardParam.MAX_PRICE),
        type: window.renderCard.CardParam.TYPES_OF_APART[window.utils.getRandomNum(0, window.renderCard.CardParam.TYPES_OF_APART.length - 1)],
        rooms: window.utils.getRandomNum(window.renderCard.CardParam.MIN_ROOMS, window.renderCard.CardParam.MAX_ROOMS),
        guests: window.utils.getRandomNum(window.renderCard.CardParam.MIN_GUESTS, window.renderCard.CardParam.MAX_GUESTS),
        time: window.renderCard.CardParam.TIMES[window.utils.getRandomNum(0, window.renderCard.CardParam.TIMES.length - 1)],
        features: window.utils.getRandomArr(window.renderCard.CardParam.FEATURES_OF_APART, window.utils.getRandomArrLength(window.renderCard.CardParam.FEATURES_OF_APART)),
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
