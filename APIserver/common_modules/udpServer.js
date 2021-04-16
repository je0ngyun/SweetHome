'use strict';
const env = require('./env/db_env.json');
const db = require('../common_modules/dbModel');
const self = {};

self.start = function () {
  var PORT = env.udp_env.UDP_PORT;
  var HOST = env.udp_env.UDP_HOST;

  var dgram = require('dgram');
  var server = dgram.createSocket('udp4');

  server.on('listening', async function () {
    var address = server.address();
    console.log(
      'UDP Server listening on ' + address.address + ':' + address.port,
    );
  });

  server.on('message', async function (message, remote) {
    let info = {};
    info.device_host = remote.address + '';
    info.device_name = message + '';
    try {
      db.setDevice(info);
    } catch (ex) {
      console.log(ex);
    }
  });

  server.bind(PORT, HOST);
};

module.exports = self;
