'use strict';

(function () {
  var similarNoticeCard = document.querySelector('template').content.querySelector('article.map__card');
  var ESC = 27;
  var mapElement = document.querySelector('.map');

  window.renderCard = {
    renderNoticeCard: function (notice) {
      var noticeElementCard = similarNoticeCard.cloneNode(true);

      noticeElementCard.querySelector('h3').textContent = notice.offer.title;
      noticeElementCard.querySelector('p small').textContent = notice.offer.address;
      noticeElementCard.querySelector('.popup__price').innerHTML = notice.offer.price + ' &#x20bd;/ночь';
      noticeElementCard.querySelector('h4').textContent = notice.offer.type;
      noticeElementCard.querySelector('h4 + p').textContent = notice.offer.rooms + ' комнаты  для ' + notice.offer.guests + ' гостей';
      noticeElementCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + notice.offer.time + ', выезд до ' + notice.offer.time;
      noticeElementCard.querySelector('.popup__avatar').setAttribute('src', notice.author.avatar);

      var popupFeature = noticeElementCard.querySelector('.popup__features');
      var buttonActive = mapElement.querySelector('.map__pin--active');
      notice.offer.features.forEach(function (featureItem) {
        var li = document.createElement('li');
        popupFeature.appendChild(li).classList.add('feature', 'feature--' + featureItem);
      });

      noticeElementCard.querySelector('.popup__close').addEventListener('click', function () {
        mapElement.removeChild(noticeElementCard);
        window.utils.removeClass(buttonActive, 'map__pin--active');
      });

      return noticeElementCard;
    },
    CardParam: {
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
    },

    closeCardByKey: function (evt) {
      if (evt.keyCode === ESC) {
        var card = mapElement.querySelector('.map__card');
        var buttonActive = mapElement.querySelector('.map__pin--active');
        mapElement.removeChild(card);
        window.utils.removeClass(buttonActive, 'map__pin--active');
        document.removeEventListener('keydown', window.renderCard.closeCardByKey);
      }
    }
  };
})();
