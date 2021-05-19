'use strict';
const env = require('./env/env.json');
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
    let msg = message + '';
    let opcode = message.slice(0, 1) + '';
    opcode = Number(opcode);
    if (opcode === 0) {
      let name = message.slice(1, msg.length - 1) + '';
      let way = message.slice(msg.length - 1, msg.length) + '';
      let info = {};
      info.device_host = remote.address + '';
      info.device_name = name;
      info.device_way = way;
      await db.setDevice(info);
    } else {
      let data = message.slice(1, msg.length - 1) + '';
      let state = '';
      let info = {};
      info.host = remote.address + '';
      for (let i = 0; i < data.length; i++) {
        if (Number(data[i]) === 0) {
          state += 'false,';
        } else {
          state += 'true,';
        }
      }
      state = state.slice(0, state.length - 1);
      info.name = await db.getDeviceName({ host: remote.address + '' });
      await db.setDeviceLog(info, state);
    }
  });

  server.bind(PORT);
};

module.exports = self;
