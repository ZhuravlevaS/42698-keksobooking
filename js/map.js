'use strict';

(function () {
  var NOTICE_QUANTITY = 8;
  var similarListButtons = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mouseup', function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    var fragment = document.createDocumentFragment();


    for (var i = 0; i < NOTICE_QUANTITY; i++) {
      var pin = window.renderPin.renderNoticeBtn(window.data.getNoticesArr(NOTICE_QUANTITY)[i]);
      fragment.appendChild(pin);
    }
    similarListButtons.appendChild(fragment);
  });
})();
