'use strict';
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 100;
var MAX_Y = 500;
var NOTICE_QUENTITY = 8;

var mapElemnt = document.querySelector('.map');
var mapFilter = mapElemnt.querySelector('.map__filters-container');
var similarListButtons = document.querySelector('.map__pins');
var similarNoticeButton = document.querySelector('template').content.querySelector('.map__pin');
var similarNoticeCard = document.querySelector('template').content.querySelector('article.map__card');

var avatars = [];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesOfApart = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var featuresOfApart = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [];
var notices = [];

var cleanFeatureList = function () {
  var popupFeatureList = document.querySelector('template').content.querySelector('.popup__features');
  while (popupFeatureList.firstChild) {
    popupFeatureList.removeChild(popupFeatureList.firstChild);
  }
};

cleanFeatureList();

var renderAvatar = function () {
  for (var i = 1; i <= NOTICE_QUENTITY; i++) {
    if (i > 9) {
      avatars.push(i);
    } else {
      avatars.push('0' + i);
    }
  }
};

renderAvatar();

var getRandomNum = function (min, max) {
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
};

var getRandomItem = function (arr) {
  var newArr = [];
  var copyArr = arr.slice();
  while (copyArr.length > 0) {
    var RandomItem = getRandomNum(0, copyArr.length - 1);
    var current = copyArr.splice(RandomItem, 1)[0];
    newArr.push(current);
  }
  return newArr;
};

var getNotice = function () {
  var avatarArr = getRandomItem(avatars);
  var titleArr = getRandomItem(titles);

  for (var i = 0; i < NOTICE_QUENTITY; i++) {
    var locationX = getRandomNum(MIN_X, MAX_X);
    var locationY = getRandomNum(MIN_Y, MAX_Y);

    var notice = {
      author: {
        avatar: 'img/avatars/user' + avatarArr[i] + '.png'
      },
      offer: {
        title: titleArr[i],
        address: locationX + ', ' + locationY,
        price: getRandomNum(MIN_PRICE, MAX_PRICE),
        type: typesOfApart[getRandomNum(0, typesOfApart.length - 1)],
        rooms: getRandomNum(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNum(MIN_GUESTS, MAX_GUESTS),
        checkin: TIMES[getRandomNum(0, TIMES.length - 1)],
        checkout: TIMES[getRandomNum(0, TIMES.length - 1)],
        features: getRandomItem(featuresOfApart).slice(0, getRandomNum(0, featuresOfApart.length - 1)),
        description: '',
        photos: photos
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    notices.push(notice);
  }
};
getNotice();

var renderNoticeBtn = function (notice) {
  var noticeElementBtn = similarNoticeButton.cloneNode(true);
  noticeElementBtn.querySelector('.map__pin img').setAttribute('src', notice.author.avatar);
  noticeElementBtn.style.left = notice.location.x + 'px';
  noticeElementBtn.style.top = notice.location.y + 'px';

  return noticeElementBtn;
};

var renderNoticeCard = function (notice) {
  var noticeElementCard = similarNoticeCard.cloneNode(true);

  noticeElementCard.querySelector('h3').textContent = notice.offer.title;
  noticeElementCard.querySelector('p small').textContent = notice.offer.address;
  noticeElementCard.querySelector('.popup__price').textContent = notice.offer.price + '&#x20bd;/ночь';
  noticeElementCard.querySelector('h4').textContent = notice.offer.type;
  noticeElementCard.querySelector('h4 + p').textContent = notice.offer.rooms + ' комнаты  для ' + notice.offer.guests + ' гостей';
  noticeElementCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;
  noticeElementCard.querySelector('.popup__avatar').removeAttribute('src');
  noticeElementCard.querySelector('.popup__avatar').setAttribute('src', notice.author.avatar);

  var popupFeature = noticeElementCard.querySelector('.popup__features');

  var renderFeature = function () {
    notice.offer.features.forEach(function (featureItem) {
      var li = document.createElement('li');
      popupFeature.appendChild(li).classList.add('feature');
      popupFeature.appendChild(li).classList.add('feature--' + featureItem);
    });
  };
  renderFeature();

  return noticeElementCard;
};

var fragment = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();

for (var l = 0; l < notices.length; l++) {
  fragment.appendChild(renderNoticeBtn(notices[l]));
  fragmentCard.appendChild(renderNoticeCard(notices[l]));
}

similarListButtons.appendChild(fragment);
mapElemnt.insertBefore(fragmentCard, mapFilter);

document.querySelector('.map').classList.remove('map--faded');
