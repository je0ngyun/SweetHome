'use strict';
//UDP 서버
const env = require('./env/env.json');
const db = require('./dbmodel');
const self = {};

self.start = function () {
  let PORT = env.udp_env.UDP_PORT;
  let dgram = require('dgram');
  let server = dgram.createSocket('udp4');

  server.on('listening', async function () {
    var address = server.address();
    console.log(`UDP Server Start ${address.address}:${address.port}`);
  });

  server.on('message', async function (message, remote) {
    let msg = message + '';
    let opcode = message.slice(0, 1) + '';
    opcode = Number(opcode);
    //opcode == 0 기기등록 처리
    //아두이노로부터 오는형식 opcode|devicename|way // ex) 0ESP-8260A4
    if (opcode === 0) {
      let name = message.slice(1, msg.length - 1) + '';
      let way = message.slice(msg.length - 1, msg.length) + '';
      let info = {};
      info.device_host = remote.address + '';
      info.device_name = name;
      info.device_way = way;
      await db.setDevice(info);
      console.log(info);
    } else {
      //opcode == 1 기기상태 처리
      //아두이노로부터 오는형식 opcode|stateBoolean|way // ex) 0114
      let data = message.slice(1, msg.length - 1) + '';
      let state = '';
      let info = {};
      info.host = remote.address + '';
      //DB에 문자열로 저장하기 위해 2진수를 평문으로 변환
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
      console.log(info);
    }
  });

  server.bind(PORT);
};

module.exports = self;
