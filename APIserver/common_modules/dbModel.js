'use strict';
const env = require('./env/db_env.json');
const self = {};
const HashMap = require('hashmap');
let devices = new HashMap();
const logger = require('../common_modules/logger');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

self.initDevice = async function (info) {};

self.setDevice = function (info) {
  let date = moment().format('HH:mm:ss');
  let obj = {};

  devices.set(info.device_host, {
    device_name: info.device_name,
    api_serial: env.serial,
  });

  obj[info.device_host] = devices.get(info.device_host);
  obj['state'] = 'regist';
  obj['time'] = date;
  logger.log('info', obj);
};

self.setDeviceLog = async function (info) {
  let obj = {};
  let date = moment().format('HH:mm:ss');

  obj[info.host] = devices.get(info.host);
  obj['userid'] = info.userid;
  obj['time'] = date;
  obj['state'] = info.state;

  logger.log('info', obj);
};

self.getDevices = async function (info) {
  let ret = {};
  devices.forEach(function (value, key) {
    ret[key] = value;
  });
  return ret;
};

self.getDeviceLog = async function (info) {};

module.exports = self;
