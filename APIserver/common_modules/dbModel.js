'use strict';

const db = require('../common_modules/dbConn');
const self = {};

self.addUser = async function (info) {
  let dbResult = await db('user')
    .insert({
      id: info.userid,
      username: info.username,
      password: info.password, //추후 암호화
      mail: info.mail,
      phone_os: info.phone_os,
      phone_model: info.phone_model,
    })
    .then();
  return dbResult;
};

self.delUser = async function (info) {
  let dbResult = await this.signin(info); //아이디 비번 검사를 위해 signin 선수행
  if (dbResult == undefined) {
    return false;
  }
  await db('device_log').where({ userid: info.userid }).delete().then();
  await db('user_log').where({ userid: info.userid }).delete().then();
  await db('reg_device').where({ userid: info.userid }).delete().then();
  await db('user')
    .where({
      id: info.userid,
    })
    .delete()
    .then();
  return true;
};

self.idchecking = async function (info) {
  let dbResult = await db('user')
    .select('id')
    .where('id', info.userid)
    .first()
    .then();
  return dbResult;
};

self.signin = async function (info) {
  let dbResult = await db('user')
    .select('password')
    .where('id', info.userid)
    .where('password', info.password)
    .first()
    .then();
  return dbResult;
};

self.getUserInfo = async function (info) {
  let dbResult = await db('user').select('*').where('id', info.userid).then();
  return dbResult;
};

self.getUserLog = async function (info) {
  let dbResult = await db('user_log')
    .select('*')
    .where('userid', info.userid)
    .then();
  return dbResult;
};

self.setUserLog = async function (info) {
  await db('user_log')
    .insert({
      userid: info.userid,
      history: info.history,
    })
    .then();
};

self.setDeviceLog = async function (info) {
  await db('device_log')
    .insert({
      userid: info.userid,
      deviceid: info.deviceid,
      history: info.history,
    })
    .then();
};

self.addDevice = async function (info) {
  let dbResult = await db('reg_device')
    .insert({
      deviceid: info.deviceid,
      userid: info.userid,
      host: info.host,
      mac: info.mac,
    })
    .then();
  return dbResult;
};

self.delDevice = async function (info) {
  await db('reg_device')
    .where({
      userid: info.userid,
      deviceid: info.deviceid,
    })
    .delete()
    .then();
};

self.idToMac = async function (info) {
  let dbResult = await db('reg_device')
    .select('mac', 'host')
    .where({
      userid: info.userid,
      deviceid: info.deviceid,
    })
    .first()
    .then();
  return dbResult;
};

self.getDevices = async function (info) {
  let dbResult = await db('reg_device')
    .select('*')
    .where({
      userid: info.userid,
      deviceid: info.deviceid,
    })
    .then();
  return dbResult;
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
