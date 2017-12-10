'use strict';

(function () {
  var ESC_CODE = 27;

  var noticeCard = document.querySelector('template').content.querySelector('article.map__card');
  var mapElement = document.querySelector('.map');
  var mapFilter = mapElement.querySelector('.map__filters-container');

  var renderFeature = function (featureItem, parent) {
    var li = document.createElement('li');

    li.classList.add('feature', 'feature--' + featureItem);
    parent.appendChild(li);
  };

  var closeCardByKey = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      var card = mapElement.querySelector('.map__card');

      mapElement.removeChild(card);
      window.pin.deactivate();
      document.removeEventListener('keydown', closeCardByKey);
    }
  };

  var closeCardHandler = function (parent) {
    mapElement.removeChild(parent);

    window.pin.deactivate();
  };

  var render = function (card) {
    var noticeElementCard = noticeCard.cloneNode(true);

    noticeElementCard.querySelector('h3').textContent = card.offer.title;
    noticeElementCard.querySelector('p small').textContent = card.offer.address;
    noticeElementCard.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
    noticeElementCard.querySelector('h4').textContent = card.offer.type;
    noticeElementCard.querySelector('h4 + p').textContent = card.offer.rooms + ' комнаты  для ' + card.offer.guests + ' гостей';
    noticeElementCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + card.offer.time + ', выезд до ' + card.offer.time;
    noticeElementCard.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    var popupFeature = noticeElementCard.querySelector('.popup__features');
    var buttonClose = noticeElementCard.querySelector('.popup__close');

    card.offer.features.forEach(function (featureItem) {
      renderFeature(featureItem, popupFeature);
    });

    buttonClose.addEventListener('click', function () {
      closeCardHandler(noticeElementCard);
    });

    document.addEventListener('keydown', closeCardByKey);

    return noticeElementCard;
  };

  window.card = {
    render: function (item) {
      var card = mapElement.querySelector('.map__card');
      if (card) {
        mapElement.removeChild(card);
      }
      mapElement.insertBefore(render(item), mapFilter);
    },
  };
})();
