'use strict';

(function () {
  var ESC_CODE = 27;

  var noticeCard = document.querySelector('template').content.querySelector('article.map__card');
  var mapElement = document.querySelector('.map');
  var mapFilter = mapElement.querySelector('.map__filters-container');
  var activeCard = null;

  var typeParams = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Сарай'
  };

  var renderFeature = function (featureItem, parent) {
    var li = document.createElement('li');

    li.classList.add('feature', 'feature--' + featureItem);
    parent.appendChild(li);
  };

  var closeCardKeyHandler = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      // var card = mapElement.querySelector('.map__card');

      // mapElement.removeChild(element);
      window.card.remove();
      window.pin.deactivate();
      document.removeEventListener('keydown', closeCardKeyHandler);
    }
  };

  var closeCardHandler = function () {
    window.card.remove();
    window.pin.deactivate();
  };

  var renderCard = function (card) {
    var noticeElementCard = noticeCard.cloneNode(true);
    var popupFeature = noticeElementCard.querySelector('.popup__features');
    var buttonClose = noticeElementCard.querySelector('.popup__close');

    noticeElementCard.querySelector('h3').textContent = card.offer.title;
    noticeElementCard.querySelector('p small').textContent = card.offer.address;
    noticeElementCard.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
    noticeElementCard.querySelector('h4').textContent = typeParams[card.offer.type];
    noticeElementCard.querySelector('h4 + p').textContent = card.offer.rooms + ' комнаты  для ' + card.offer.guests + ' гостей';
    noticeElementCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    noticeElementCard.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
    noticeElementCard.querySelector('.popup__features + p').textContent = card.offer.description;

    card.offer.features.forEach(function (featureItem) {
      renderFeature(featureItem, popupFeature);
    });

    buttonClose.addEventListener('click', closeCardHandler);

    document.addEventListener('keydown', closeCardKeyHandler);

    return noticeElementCard;
  };

  window.card = {
    render: function (item) {
      window.card.remove();

      activeCard = renderCard(item);
      mapElement.insertBefore(activeCard, mapFilter);
    },

    remove: function () {
      if (activeCard) {
        mapElement.removeChild(activeCard);
        activeCard = null;
      }
    }
  };
})();
