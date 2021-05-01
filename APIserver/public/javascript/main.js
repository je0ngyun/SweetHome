'use strict';
var App = window.App || {};

App.main = (function () {
  return {
    addEvent: function (obj, event, callback) {
      obj.addEventListener(event, callback);
    },
    delEvent: function (obj, event, callback) {
      obj.removeEventListener(event, callback, false);
    },
    getItemIndex: function (item, list) {
      let indexArr = Array.from(list);
      for (let index in indexArr) {
        if (list.item(index) === item.currentTarget) {
          return index;
        }
      }
    },
  };
})();

window.addEventListener(
  'load',
  function () {
    alert('실행');
  },
  false,
);
