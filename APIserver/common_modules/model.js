'use strict';
const HashMap = require('hashmap');
const logger = require('./logger');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const env = require('./env/db_env.json');
let devices = new HashMap();
const self = {};

self.initDevice = async function (info) {};

self.setDevice = async function (info) {
  devices.set(info.device_host, {
    device_type: info.device_type,
    api_serial: env.serial + '',
  });
};

self.setDeviceLog = async function (info) {
  let obj = {};
  let time = moment().format('HH:mm:ss');

  obj.host = info.host;
  obj.info = devices.get(info.host);
  obj.time = time;
  obj.state = info.state;
  await logger.writeLog(obj);
};

self.getDevices = async function () {
  let ret = [];
  devices.forEach(function (value, key) {
    let obj = {};
    obj['host'] = key;
    obj['info'] = value;
    ret.push(obj);
  });
  return ret;
};

self.getDeviceLog = async function (info) {
  let ret = JSON.parse(`[${await logger.readLog(info.date)}]`);
  return ret;
};

module.exports = self;
