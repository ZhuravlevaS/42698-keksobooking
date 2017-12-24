'use strict';

(function () {
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

  var filteredForm = document.querySelector('.map__filters');

  var filterByValue = function (data, name, value) {
    return data.filter(function (currentData) {
      return currentData.offer[name].toString() === value;
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


  window.filterData = function (arr) {
    var filteredObjects = arr;
    var selects = filteredForm.querySelectorAll('.map__filter');
    var checkboxes = filteredForm.querySelectorAll('input:checked');

    selects = Array.from(selects).filter(function (select) {
      return select.value !== 'any';
    });

    [].forEach.call(selects, function (select) {
      var name = select.getAttribute('name').replace('housing-', '');
      filteredObjects = name === 'price' ?
        filterByPrice(filteredObjects, select.value) :
        filterByValue(filteredObjects, name, select.value);
    });

    [].forEach.call(checkboxes, function (checkbox) {
      filteredObjects = filterByFeature(filteredObjects, checkbox.value);
    });
    return filteredObjects;
  };
})();
