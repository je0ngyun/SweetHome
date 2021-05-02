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
    socketConn: function () {
      let socket = io();
      socket.on('code', function (code) {
        alert('인증번호 : ' + code);
      });
    },
  };
})();

window.addEventListener(
  'load',
  function () {
    App.main.socketConn();
  },
  false,
);
