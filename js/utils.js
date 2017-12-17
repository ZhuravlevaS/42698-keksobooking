'use strict';

(function () {
  window.utils = {
    getRandomNum: function (min, max) {
      var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNum;
    },

    shuffleArray: function (arr) {
      var newArr = [];
      var copyArr = arr.slice();
      while (copyArr.length > 0) {
        var RandomArray = window.utils.getRandomNum(0, copyArr.length - 1);
        var current = copyArr.splice(RandomArray, 1)[0];
        newArr.push(current);
      }
      return newArr;
    },

    getRandomArrLength: function (arr) {
      var length = window.utils.getRandomNum(0, arr.length - 1);
      return length;
    },

    getRandomArr: function (array, length) {
      var randomArray = [];

      while (randomArray.length < length) {
        var value = array[window.utils.getRandomNum(0, array.length - 1)];
        if (randomArray.indexOf(value) !== -1) {
          continue;
        } else {
          randomArray.push(value);
        }
      }

      return randomArray;
    },

    removeClass: function (elem, className) {
      if (elem) {
        elem.classList.remove(className);
      }
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255, 0, 0, 0.5); height: 30px;';
      node.style.position = 'fixed';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '16px';
      node.style.lineHeight = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
