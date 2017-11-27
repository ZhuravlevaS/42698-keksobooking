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
var similarNoticeButton = document.querySelector('template');
var noticeQuantity = 8;

var avatars = ["01", "02", "03", "04", "05", "06", "07", "08"];
var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var typesOfApart = ["flat", "house", "bungalo"];
var checkinsTime = ["12: 00", "13: 00", "14: 00"];
var checkoutsTime = ["12: 00", "13: 00", "14: 00"];
var featuresOfApart = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = [];

var notices = [];


function getRandomInt (min, max) {
	var RandomInt = Math.floor(Math.random() * (max - min + 1)) + min;
	var SimilarInt = indexOf(RandomInt);
	if (SimilarInt === -1) {
		return true;
	} else {
		return false;
	}
}

function getRandomNum (min, max) {
	var RandomNum = Math.floor(Math.random() * (max - min + 1)) + min;
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

var NoticeParam = {
	"author": {
		"avatar": 'img/avatars/user' + avatars[getRandomNum(0,7)] + '.png'
	},

	"offer": {
		"title": titles[getRandomNum(0, titles.length)],
		"address": "",
		"price": GetRandomPrice(),
		"type": location.x + ', ' + location.y,
		"rooms": GetRandomRooms(),
		"guests": GetRandomGuests(),
		"checkin": checkinsTime[getRandomNum(0, checkinsTime.length)],
		"checkout": checkoutsTime[getRandomNum(0, checkoutsTime.length)],
		"features": featuresOfApart[getRandomNum(0, featuresOfApart.length)],
		"description": "",
		"photos": photos
	},

	"location": {
		"x": GetLocationX(),
		"y": GetLocationY()
	}
}

var renderNotice = function (notice) {
	var noticeElement = similarNoticeButton.cloneNode(true);
	noticeElement.querySelector('.map__pin img').textContent = NoticeParam.author.avatar;
	noticeElement.querySelector('.map__pin').style.left = NoticeParam.location.x;
	noticeElement.querySelector('.map__pin').style.top = NoticeParam.location.y;

	return noticeElement;
};

var drawNotice = function () {
	fragment.appendChild(renderNotice(notices[i]));
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < noticeQuantity; i++) {
	drawNotice ();
}

document.querySelector('.map').classList.remove('map--faded');
