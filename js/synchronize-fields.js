'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, arr1, arr2, func) {
    field1.addEventListener('change', function () {
      var index = arr1.indexOf(field1.value);
      func(field2, arr2[index]);
    });
  };
})();

