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
  };
})();
