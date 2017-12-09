'use strict';

(function () {
  var NOTICE_QUANTITY = 8;
  var similarListButtons = document.querySelector('.map__pins');
  // var mainPin = document.querySelector('.map__pin--main');

  window.data.mainPin.addEventListener('mouseup', function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    var fragment = document.createDocumentFragment();

    var drawPins = function (pinNumber) {
      for (var i = 0; i < pinNumber; i++) {
        var pin = window.pin.renderNoticeBtn(window.data.getNoticesArr(NOTICE_QUANTITY)[i]);
        fragment.appendChild(pin);
      }
    };
    drawPins(NOTICE_QUANTITY);

    similarListButtons.appendChild(fragment);
  });
})();

// var CardParam = {
//   MIN_PRICE: 1000,
//   MAX_PRICE: 1000000,
//   MIN_ROOMS: 1,
//   MAX_ROOMS: 5,
//   MIN_GUESTS: 1,
//   MAX_GUESTS: 10,
//   TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
//   TYPES_OF_APART: ['flat', 'house', 'bungalo'],
//   TIMES: ['12:00', '13:00', '14:00'],
//   FEATURES_OF_APART: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
// };

// var PinParams = {
//   MIN_X: 300,
//   MAX_X: 900,
//   MIN_Y: 100,
//   MAX_Y: 500
// };

// var NOTICE_QUANTITY = 8;
// var ESC = 27;

// var mapElement = document.querySelector('.map');
// var mapFilter = window.data.mapElement.querySelector('.map__filters-container');
// var similarListButtons = document.querySelector('.map__pins');
// var similarNoticeButton = document.querySelector('template').content.querySelector('.map__pin');
// var similarNoticeCard = document.querySelector('template').content.querySelector('article.map__card');
// var btnMain = document.querySelector('.map__pin--main');

// var renderAvatar = function (i) {
//   return i <= 9 ? '0' + i : i;
// };

// var getRandomNum = function (min, max) {
//   var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
//   return randomNum;
// };

// var shuffleArray = function (arr) {
//   var newArr = [];
//   var copyArr = arr.slice();
//   while (copyArr.length > 0) {
//     var RandomArray = getRandomNum(0, copyArr.length - 1);
//     var current = copyArr.splice(RandomArray, 1)[0];
//     newArr.push(current);
//   }
//   return newArr;
// };

// var getRandomArrLength = function (arr) {
//   var length = getRandomNum(0, arr.length - 1);
//   return length;
// };

// var getRandomArr = function (array, length) {
//   var randomArray = [];

//   while (randomArray.length < length) {
//     var value = array[getRandomNum(0, array.length - 1)];
//     if (randomArray.indexOf(value) !== -1) {
//       continue;
//     } else {
//       randomArray.push(value);
//     }
//   }

//   return randomArray;
// };

// var getNotice = function (i) {
//   var titleArr = shuffleArray(CardParam.TITLES);
//   var locationX = getRandomNum(PinParams.MIN_X, PinParams.MAX_X);
//   var locationY = getRandomNum(PinParams.MIN_Y, PinParams.MAX_Y);

//   var notice = {
//     author: {
//       avatar: 'img/avatars/user' + renderAvatar(i + 1) + '.png'
//     },
//     offer: {
//       title: titleArr[i],
//       address: locationX + ', ' + locationY,
//       price: getRandomNum(CardParam.MIN_PRICE, CardParam.MAX_PRICE),
//       type: CardParam.TYPES_OF_APART[getRandomNum(0, CardParam.TYPES_OF_APART.length - 1)],
//       rooms: getRandomNum(CardParam.MIN_ROOMS, CardParam.MAX_ROOMS),
//       guests: getRandomNum(CardParam.MIN_GUESTS, CardParam.MAX_GUESTS),
//       checkin: CardParam.TIMES[getRandomNum(0, CardParam.TIMES.length - 1)],
//       checkout: CardParam.TIMES[getRandomNum(0, CardParam.TIMES.length - 1)],
//       features: getRandomArr(CardParam.FEATURES_OF_APART, getRandomArrLength(CardParam.FEATURES_OF_APART)),
//       description: '',
//       photos: []
//     },
//     location: {
//       x: locationX,
//       y: locationY
//     }
//   };
//   return notice;
// };

// var getNoticesArr = function (length) {
//   var notices = [];
//   for (var i = 0; i < length; i++) {
//     notices.push(getNotice(i));
//   }
//   return notices;
// };

// var removeElementFromMap = function (elem) {
//   if (elem) {
//     mapElement.removeChild(elem);
//   }
// };

// var removeClass = function (elem, className) {
//   if (elem) {
//     elem.classList.remove(className);
//   }
// };

// var renderNoticeBtn = function (notice) {
//   var noticeElementBtn = similarNoticeButton.cloneNode(true);
//   noticeElementBtn.querySelector('.map__pin img').setAttribute('src', notice.author.avatar);
//   noticeElementBtn.style.left = notice.location.x + 'px';
//   noticeElementBtn.style.top = notice.location.y + 'px';
//   noticeElementBtn.addEventListener('click', function (evt) {
//     if (noticeElementBtn.classList.contains('map__pin--active')) {
//       return;
//     }

//     var target = evt.target;
//     var card = mapElement.querySelector('.map__card');
//     var buttonActive = mapElement.querySelector('.map__pin--active');
//     var fragmentCard = document.createDocumentFragment();

//     removeElementFromMap(card);
//     fragmentCard.appendChild(renderNoticeCard(notice));
//     mapElement.insertBefore(fragmentCard, mapFilter);
//     document.addEventListener('keydown', closeCardByKey);

//     removeClass(buttonActive, 'map__pin--active');

//     if (target.tagName === 'IMG') {
//       target.parentElement.classList.add('map__pin--active');
//     } else {
//       target.classList.add('map__pin--active');
//     }

//   });
//   return noticeElementBtn;
// };


// var renderNoticeCard = function (notice) {
//   var noticeElementCard = similarNoticeCard.cloneNode(true);

//   noticeElementCard.querySelector('h3').textContent = notice.offer.title;
//   noticeElementCard.querySelector('p small').textContent = notice.offer.address;
//   noticeElementCard.querySelector('.popup__price').innerHTML = notice.offer.price + ' &#x20bd;/ночь';
//   noticeElementCard.querySelector('h4').textContent = notice.offer.type;
//   noticeElementCard.querySelector('h4 + p').textContent = notice.offer.rooms + ' комнаты  для ' + notice.offer.guests + ' гостей';
//   noticeElementCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;
//   noticeElementCard.querySelector('.popup__avatar').setAttribute('src', notice.author.avatar);

//   var popupFeature = noticeElementCard.querySelector('.popup__features');
//   var buttonActive = mapElement.querySelector('.map__pin--active');

//   var renderFeature = function () {
//     notice.offer.features.forEach(function (featureItem) {
//       var li = document.createElement('li');
//       popupFeature.appendChild(li).classList.add('feature', 'feature--' + featureItem);
//     });
//   };
//   renderFeature();

//   noticeElementCard.querySelector('.popup__close').addEventListener('click', function () {
//     mapElement.removeChild(noticeElementCard);
//     removeClass(buttonActive, 'map__pin--active');
//   });

//   return noticeElementCard;
// };

// var closeCardByKey = function (evt) {
//   if (evt.keyCode === ESC) {
//     var card = window.data.mapElement.querySelector('.map__card');
//     var buttonActive = window.data.mapElement.querySelector('.map__pin--active');
//     window.data.mapElement.removeChild(card);
//     window.data.removeClass(buttonActive, 'map__pin--active');
//     document.removeEventListener('keydown', closeCardByKey);
//   }
// };

// btnMain.addEventListener('mouseup', function () {
//   document.querySelector('.map').classList.remove('map--faded');
//   document.querySelector('.notice__form').classList.remove('notice__form--disabled');
//   var fragment = document.createDocumentFragment();

//   var drawPins = function (pinNumber) {
//     for (var i = 0; i < pinNumber; i++) {
//       var pin = window.pin.renderNoticeBtn(window.data.getNoticesArr(NOTICE_QUANTITY)[i]);
//       fragment.appendChild(pin);
//     }
//   };
//   drawPins(NOTICE_QUANTITY);

//   similarListButtons.appendChild(fragment);
// });
