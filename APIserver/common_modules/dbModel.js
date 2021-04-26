'use strict';
const env = require('./env/db_env.json');
const db = require('../common_modules/dbConn');
const self = {};

self.setDevice = async function (info) {
  let query = await db('device')
    .insert({
      device_host: info.device_host,
      device_name: info.device_name,
      api_serial: env.serial,
    })
    .toString();
  query +=
    ' on duplicate key update ' +
    db.raw('device_name= ?, api_serial = ?', [info.device_name, env.serial]);
  await db.raw(query).then();
};

self.setDeviceLog = async function (info, state) {
  let device_name = await db('device')
    .where({ device_host: info.host })
    .select('device_name')
    .toString();
  console.log(device_name);
  await db('device_log')
    .insert({
      device_host: info.host,
      device_name: 'devi',
      state: `[${state}]`,
      api_serial: env.serial,
    })
    .then();
};

self.getDevices = async function (info) {
  try {
    let dbResult = await db('device')
      .select('*')
      .where({
        api_serial: info.serial,
      })
      .then();
    return dbResult;
  } catch (ex) {
    console.log(ex);
  }
};

self.getDeviceLog = async function (info) {
  let dbResult = await db('device_log')
    .select('*')
    .where({
      userid: info.userid,
      deviceid: info.deviceid,
    })
    .then();
  return dbResult;
};

module.exports = self;
