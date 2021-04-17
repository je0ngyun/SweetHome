'use strict';
const HashMap = require('hashmap');
const logger = require('./logger');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const self = {};
let devices = new HashMap();
const env = require('./env/db_env.json');

self.initDevice = async function (info) {};

self.setDevice = async function (info) {
  let date = moment().format('HH:mm:ss');
  let obj = {};

  devices.set(info.device_host, {
    device_type: info.device_type,
    api_serial: env.serial + '',
  });

  obj[info.device_host] = devices.get(info.device_host);
  obj['state'] = 'regist';
  obj['time'] = date;
  await logger.writeLog(obj);
};

self.setDeviceLog = async function (info) {
  let obj = {};
  let date = moment().format('HH:mm:ss');

  obj[info.host] = devices.get(info.host);
  obj['userid'] = info.userid;
  obj['time'] = date;
  obj['state'] = info.state;
  logger.writeLog();
};

self.getDevices = async function () {
  let ret = {};
  devices.forEach(function (value, key) {
    ret[key] = value;
  });
  return ret;
};

self.getDeviceLog = async function (info) {
  let ret = JSON.parse(`[${await logger.readLog(info.date)}]`);
  return ret;
};

module.exports = self;
