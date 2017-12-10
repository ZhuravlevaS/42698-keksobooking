'use strict';

(function () {
  var ESC_CODE = 27;

  var noticeCard = document.querySelector('template').content.querySelector('article.map__card');
  var mapElement = document.querySelector('.map');

  var renderFeature = function (featureItem, parent) {
    var li = document.createElement('li');

    li.classList.add('feature', 'feature--' + featureItem);
    parent.appendChild(li);
  };

  var closeCardByKey = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      var card = mapElement.querySelector('.map__card');

      mapElement.removeChild(card);
      window.pin.deactivatePin();
      document.removeEventListener('keydown', closeCardByKey);
    }
  };

  window.card = {
    render: function (notice) {
      var noticeElementCard = noticeCard.cloneNode(true);

      noticeElementCard.querySelector('h3').textContent = notice.offer.title;
      noticeElementCard.querySelector('p small').textContent = notice.offer.address;
      noticeElementCard.querySelector('.popup__price').innerHTML = notice.offer.price + ' &#x20bd;/ночь';
      noticeElementCard.querySelector('h4').textContent = notice.offer.type;
      noticeElementCard.querySelector('h4 + p').textContent = notice.offer.rooms + ' комнаты  для ' + notice.offer.guests + ' гостей';
      noticeElementCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + notice.offer.time + ', выезд до ' + notice.offer.time;
      noticeElementCard.querySelector('.popup__avatar').setAttribute('src', notice.author.avatar);

      var popupFeature = noticeElementCard.querySelector('.popup__features');
      var buttonClose = noticeElementCard.querySelector('.popup__close');

      var closeCardHandler = function () {
        mapElement.removeChild(noticeElementCard);

        window.pin.deactivatePin();
      };

      notice.offer.features.forEach(function (featureItem) {
        renderFeature(featureItem, popupFeature);
      });

      buttonClose.addEventListener('click', closeCardHandler);

      document.addEventListener('keydown', closeCardByKey);

      return noticeElementCard;
    }
  };
})();
