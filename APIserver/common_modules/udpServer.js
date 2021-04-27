'use strict';
const env = require('./env/db_env.json');
const db = require('./dbmodel');
const self = {};

self.start = function () {
  let PORT = env.udp_env.UDP_PORT;
  let dgram = require('dgram');
  let server = dgram.createSocket('udp4');

  server.on('listening', async function () {
    var address = server.address();
    console.log(
      'UDP Server listening on ' + address.address + ':' + address.port,
    );
  });

  server.on('message', async function (message, remote) {
    console.log('받음');
    let info = {};
    info.device_host = remote.address + '';
    info.device_name = message + '';
    await db.setDevice(info);
  });

  server.bind(PORT);
};

module.exports = self;
