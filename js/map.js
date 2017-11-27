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

var similarListElement = document.querySelector('.map');

var similarListButtons = document.querySelector('.map__pins');
var similarNoticeButton = document.querySelector('template').content.querySelector('.map__pin');
var noticeQuantity = 8;

var avatars = ["01", "02", "03", "04", "05", "06", "07", "08"];
var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var typesOfApart = ["flat", "house", "bungalo"];
var checkinsTime = ["12: 00", "13: 00", "14: 00"];
var checkoutsTime = ["12: 00", "13: 00", "14: 00"];
var featuresOfApart = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = [];

var notices = [];


var randomInteger = function(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function getRandomItem (arr) { 
  var newArr =[];
	var copyArr = arr.slice();
	while (copyArr.length > 0) {
    var RandomItem = randomInteger(0, copyArr.length - 1);
    var current = copyArr.splice(RandomItem, 1)[0];
    newArr.push(current);    
  }
  return newArr;
}

function getRandomNum (min, max) {
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

var GetRandomPrice = function() {
	var RandomPrice = getRandomNum(MIN_PRICE, MAX_PRICE);
	return RandomPrice;
}

var GetRandomRooms = function () {
	var RandomRooms = getRandomNum(MIN_ROOMS, MAX_ROOMS);
	return RandomRooms;
}

var GetRandomGuests = function () {
	var RandomGuests = getRandomNum(MIN_GUESTS, MAX_GUESTS);
	return RandomGuests;
}

var GetLocationX = function () {
	var RandomX = getRandomNum(MIN_X, MAX_X);
	return RandomX;
}

var GetLocationY = function () {
	var RandomY = getRandomNum(MIN_X, MAX_Y);
	return RandomY;
}

var getNotice = function () {
    var avatarArr = getRandomItem(avatars);
    var titleArr = getRandomItem(titles); 
    
  for (var i = 0; i < noticeQuantity; i++) {    
    var locationX = GetLocationX();
    var locationY = GetLocationY();

    var notice = {
      author: {
	      avatar:'img/avatars/user' + avatarArr[i] + '.png'
	    },
      offer: {
        title: titleArr[i],
        address: locationX + ', ' + locationY,
        price: GetRandomPrice(),
        type: typesOfApart[getRandomNum(0, typesOfApart.length - 1)],
        rooms: GetRandomRooms(),
        guests: GetRandomGuests(),
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
    }
    notices.push(notice);
  }   
}
getNotice();	

var renderNotice = function (notice) {
	var noticeElement = similarNoticeButton.cloneNode(true);
  noticeElement.querySelector('.map__pin img').removeAttribute('src');
  noticeElement.querySelector('.map__pin img').setAttribute('src', notice.author.avatar);
  noticeElement.style.left = 'notice.location.x';
  noticeElement.style.left = notice.location.x + 'px';
  noticeElement.style.top = '';
	noticeElement.style.top = notice.location.y + 'px';

	return noticeElement;
};

var prepareHtml = notices.map(function (notice) {
  return renderNotice(notice);
});


var fragment = document.createDocumentFragment();
for (var l = 0; l < notices.length; l++) {
  fragment.appendChild(renderNotice(notices[l]));
}
similarListButtons.appendChild(fragment);

document.querySelector('.map').classList.remove('map--faded');
