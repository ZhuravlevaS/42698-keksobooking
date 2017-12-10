'use strict';

(function () {
  var noticeButton = document.querySelector('template').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
  var mapFilter = mapElement.querySelector('.map__filters-container');

  var removeElementFromMap = function (elem) {
    if (elem) {
      mapElement.removeChild(elem);
    }
  };

  var btnClickHandler = function (target) {
    if (target.tagName === 'IMG') {
      target.parentElement.classList.add('map__pin--active');
    } else {
      target.classList.add('map__pin--active');
    }
  };

  var pinClickHandler = function (target, btn, item) {
    var card = mapElement.querySelector('.map__card');

    if (btn.classList.contains('map__pin--active')) {
      return;
    }

    removeElementFromMap(card);
    mapElement.insertBefore(window.card.render(item), mapFilter);
    window.pin.deactivatePin();
    btnClickHandler(target);
  };

  window.pin = {
    render: function (notice) {
      var noticeElementBtn = noticeButton.cloneNode(true);

      noticeElementBtn.querySelector('.map__pin img').setAttribute('src', notice.author.avatar);
      noticeElementBtn.style.left = notice.location.x + 'px';
      noticeElementBtn.style.top = notice.location.y + 'px';
      noticeElementBtn.addEventListener('click', function (evt) {
        pinClickHandler(evt.target, noticeElementBtn, notice);
      });
      return noticeElementBtn;
    },

    deactivatePin: function () {
      var buttonActive = mapElement.querySelector('.map__pin--active');

      window.utils.removeClass(buttonActive, 'map__pin--active');
    }
  };
})();
