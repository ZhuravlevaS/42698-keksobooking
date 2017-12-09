'use strict';

(function () {
  var similarNoticeCard = document.querySelector('template').content.querySelector('article.map__card');

  window.card = {
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
      var buttonActive = window.data.mapElement.querySelector('.map__pin--active');

      var renderFeature = function () {
        notice.offer.features.forEach(function (featureItem) {
          var li = document.createElement('li');
          popupFeature.appendChild(li).classList.add('feature', 'feature--' + featureItem);
        });
      };
      renderFeature();

      noticeElementCard.querySelector('.popup__close').addEventListener('click', function () {
        window.data.mapElement.removeChild(noticeElementCard);
        window.data.removeClass(buttonActive, 'map__pin--active');
      });

      return noticeElementCard;
    }
  };
})();
