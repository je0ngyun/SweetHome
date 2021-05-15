'use strict';
const env = require('./env/env.json');
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
  await db('device_log')
    .insert({
      device_host: info.host,
      device_name: info.name,
      state: `${state}`,
      api_serial: env.serial,
    })
    .then();
};

self.delDevice = async function (info) {
  await db('device')
    .where({
      device_host: info.host,
    })
    .delete()
    .then();
};

self.delDeviceAll = async function (info) {
  await db('device')
    .where({
      api_serial: info.serial,
    })
    .delete()
    .then();
};

self.getDevices = async function (info) {
  try {
    let dbResult = await db('device')
      .select('api_serial', 'device_host', 'device_name')
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
      device_host: info.host,
    })
    .then();
  return dbResult;
};

self.getDeviceLogAll = async function (info) {
  let dbResult = await db('device_log')
    .select('*')
    .where({ api_serial: info.serial })
    .then();
  return dbResult;
};

self.delDeviceLogAll = async function (info) {
  await db('device_log')
    .where({
      api_serial: info.serial,
    })
    .delete()
    .then();
};

self.getDeviceName = async function (info) {
  let dbResult = await db('device')
    .select('device_name')
    .where({ device_host: info.host })
    .first()
    .then();
  return dbResult.device_name;
};

module.exports = self;
