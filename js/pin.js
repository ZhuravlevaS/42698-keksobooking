'use strict';

(function () {
  var similarNoticeButton = document.querySelector('template').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
  var mapFilter = mapElement.querySelector('.map__filters-container');

  var removeElementFromMap = function (elem) {
    if (elem) {
      mapElement.removeChild(elem);
    }
  };

  window.renderPin = {
    renderNoticeBtn: function (notice) {
      var noticeElementBtn = similarNoticeButton.cloneNode(true);
      noticeElementBtn.querySelector('.map__pin img').setAttribute('src', notice.author.avatar);
      noticeElementBtn.style.left = notice.location.x + 'px';
      noticeElementBtn.style.top = notice.location.y + 'px';
      noticeElementBtn.addEventListener('click', function (evt) {
        if (noticeElementBtn.classList.contains('map__pin--active')) {
          return;
        }

        var target = evt.target;
        var card = mapElement.querySelector('.map__card');
        var buttonActive = mapElement.querySelector('.map__pin--active');
        var fragmentCard = document.createDocumentFragment();

        removeElementFromMap(card);
        fragmentCard.appendChild(window.renderCard.renderNoticeCard(notice));
        mapElement.insertBefore(fragmentCard, mapFilter);
        document.addEventListener('keydown', window.renderCard.closeCardByKey);

        window.utils.removeClass(buttonActive, 'map__pin--active');

        if (target.tagName === 'IMG') {
          target.parentElement.classList.add('map__pin--active');
        } else {
          target.classList.add('map__pin--active');
        }

      });
      return noticeElementBtn;
    },
    PinParams: {
      MIN_X: 300,
      MAX_X: 900,
      MIN_Y: 100,
      MAX_Y: 500
    }
  };
})();
