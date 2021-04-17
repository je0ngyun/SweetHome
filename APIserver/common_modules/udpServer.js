'use strict';
const env = require('./env/db_env.json');
const db = require('./model');
const self = {};
const ip = require('ip');

self.start = function () {
  var PORT = env.udp_env.UDP_PORT;
  var HOST = ip.address();
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
    info.device_type = message + '';
    try {
      db.setDevice(info);
    } catch (ex) {
      console.log(ex);
    }
  });

  server.bind(PORT, HOST);
};

module.exports = self;
