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

var elementHtml = document.querySelector('.map__filters-container');
// var similarListCard = document.querySelector('.map');
var similarNoticeCard = document.querySelector('template').content.querySelector('article.map__card');

var similarListButtons = document.querySelector('.map__pins');
var similarNoticeButton = document.querySelector('template').content.querySelector('.map__pin');
var noticeQuantity = 8;

var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesOfApart = ['flat', 'house', 'bungalo'];
var checkinsTime = ['12:00', '13:00', '14:00'];
var checkoutsTime = ['12:00', '13:00', '14:00'];
var featuresOfApart = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [];

var notices = [];


var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

function getRandomItem(arr) {
  var newArr = [];
  var copyArr = arr.slice();
  while (copyArr.length > 0) {
    var RandomItem = randomInteger(0, copyArr.length - 1);
    var current = copyArr.splice(RandomItem, 1)[0];
    newArr.push(current);
  }
  return newArr;
}

function getRandomNum(min, max) {
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

var getNotice = function () {
  var avatarArr = getRandomItem(avatars);
  var titleArr = getRandomItem(titles);

  for (var i = 0; i < noticeQuantity; i++) {
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
        checkin: checkinsTime[getRandomNum(0, checkinsTime.length - 1)],
        checkout: checkoutsTime[getRandomNum(0, checkoutsTime.length - 1)],
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
  noticeElementBtn.querySelector('.map__pin img').removeAttribute('src');
  noticeElementBtn.querySelector('.map__pin img').setAttribute('src', notice.author.avatar);
  noticeElementBtn.style.left = 'notice.location.x';
  noticeElementBtn.style.left = notice.location.x + 'px';
  noticeElementBtn.style.top = '';
  noticeElementBtn.style.top = notice.location.y + 'px';

  return noticeElementBtn;
};

var renderNoticeCard = function (notice) {
  var noticeElementCard = similarNoticeCard.cloneNode(true);

  noticeElementCard.querySelector('h3').textContent = notice.offer.title;
  noticeElementCard.querySelector('p small').textContent = notice.offer.address;
  noticeElementCard.querySelector('.popup__price').textContent = notice.offer.price + '&#x20bd;/ночь';
  noticeElementCard.querySelector('h4').textContent = notice.offer.type;
  noticeElementCard.querySelector('h4 + p').textContent = notice.offer.rooms + ' для ' + notice.offer.guests + ' гостей';
  noticeElementCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;
  noticeElementCard.querySelector('.popup__avatar').removeAttribute('src');
  noticeElementCard.querySelector('.popup__avatar').setAttribute('src', notice.author.avatar);
  // noticeElementCard.querySelector('.popup__features').removeChild('li');

  // notice.offer.features.forEach( function (featureItem) {
  //   noticeElementCard.querySelector('.popup__features').appendChild('li').classList.add('feature feature--' + featureItem);
  // });


  return noticeElementCard;
};

var fragment = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();

for (var l = 0; l < notices.length; l++) {
  fragment.appendChild(renderNoticeBtn(notices[l]));
  fragmentCard.appendChild(renderNoticeCard(notices[l]));
}

similarListButtons.appendChild(fragment);
elementHtml.insertAdjacentHTML('beforebegin', fragmentCard);

document.querySelector('.map').classList.remove('map--faded');
