'use strict';

(function () {
  var HOUSING = 8; // строка в имени 'housing-'

  var PriceParams = {
    LOW: 10000,
    HIGH: 50000
  };

  var checkPrice = {
    low: function (value) {
      return value < PriceParams.LOW;
    },
    high: function (value) {
      return value > PriceParams.HIGH;
    },
    middle: function (value) {
      return value <= PriceParams.HIGH && value >= PriceParams.LOW;
    }
  };

  var filterdForm = document.querySelector('.map__filters');

  var filterByValue = function (data, name, value) {
    return data.filter(function (currentData) {
      return currentData.offer[name] === value;
    });
  };

  var filterByPrice = function (data, value) {
    return data.filter(function (currentData) {
      return checkPrice[value](currentData.offer.price);
    });
  };

  var filterByFeature = function (data, value) {
    return data.filter(function (currentData) {
      return currentData.offer.features.indexOf(value) > -1;
    });
  };

  window.filter = {
    filterData: function (arr) {
      var filteredArray = arr;
      var selects = filterdForm.querySelectorAll('.map__filter');
      var checkboxes = filterdForm.querySelectorAll('input:checked');

      selects.forEach(function (select) {
        if (select.value !== 'any') {
          var name = select.getAttribute('name').slice(HOUSING);
          filteredArray = name === 'price' ?
            filterByPrice(filteredArray, select.value) :
            filterByValue(filteredArray, name, select.value);
        }
      });

      checkboxes.forEach(function (checkbox) {
        filteredArray = filterByFeature(filteredArray, checkbox.value);
      });

      return filteredArray;
    }
  };
})();
