'use strict';

(function () {
  var noticeButton = document.querySelector('template').content.querySelector('.map__pin');

  var btnClickHandler = function (target) {
    if (target.tagName === 'IMG') {
      target.parentElement.classList.add('map__pin--active');
    } else {
      target.classList.add('map__pin--active');
    }
  };

  var pinClickHandler = function (target, btn, item) {
    if (btn.classList.contains('map__pin--active')) {
      return;
    }

    window.card.removeCard();
    window.card.renderCard(item);
    window.pin.deactivatePin();
    btnClickHandler(target);
  };

  window.pin = {
    render: function (notice) {
      var noticeBtn = noticeButton.cloneNode(true);

      noticeBtn.querySelector('.map__pin img').setAttribute('src', notice.author.avatar);
      noticeBtn.style.left = notice.location.x + 'px';
      noticeBtn.style.top = notice.location.y + 'px';
      noticeBtn.addEventListener('click', function (evt) {
        pinClickHandler(evt.target, noticeBtn, notice);
      });
      return noticeBtn;
    },

    deactivatePin: function () {
      var mapElement = document.querySelector('.map');
      var buttonActive = mapElement.querySelector('.map__pin--active');

      window.utils.removeClass(buttonActive, 'map__pin--active');
    }
  };
})();
