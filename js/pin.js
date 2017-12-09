'use strict';

(function () {
  var similarNoticeButton = document.querySelector('template').content.querySelector('.map__pin');
  var mapFilter = window.data.mapElement.querySelector('.map__filters-container');

  var removeElementFromMap = function (elem) {
    if (elem) {
      window.data.mapElement.removeChild(elem);
    }
  };

  var closeCardByKey = function (evt) {
    if (evt.keyCode === window.data.ESC) {
      var card = window.data.mapElement.querySelector('.map__card');
      var buttonActive = window.data.mapElement.querySelector('.map__pin--active');
      window.data.mapElement.removeChild(card);
      window.data.removeClass(buttonActive, 'map__pin--active');
      document.removeEventListener('keydown', closeCardByKey);
    }
  };

  window.pin = {
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
        var card = window.data.mapElement.querySelector('.map__card');
        var buttonActive = window.data.mapElement.querySelector('.map__pin--active');
        var fragmentCard = document.createDocumentFragment();

        removeElementFromMap(card);
        fragmentCard.appendChild(window.card.renderNoticeCard(notice));
        window.data.mapElement.insertBefore(fragmentCard, mapFilter);
        document.addEventListener('keydown', closeCardByKey);

        window.data.removeClass(buttonActive, 'map__pin--active');

        if (target.tagName === 'IMG') {
          target.parentElement.classList.add('map__pin--active');
        } else {
          target.classList.add('map__pin--active');
        }

      });
      return noticeElementBtn;
    }
  };
})();
