'use strict';

const db = require('../common_modules/dbConn');
const self = {};

self.signup = async function (info) {
  try {
    let result = await db('user')
      .insert({
        id: info.userid,
        username: info.username,
        password: info.password, //추후 암호화
        mail: info.mail,
        phone_os: info.phone_os,
        phone_model: info.phone_model,
      })
      .then();
    return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }
};

self.idcheck = async function (info) {
  try {
    let result = await db('user')
      .select('id')
      .where('id', info.userid)
      .first()
      .then();
    if (result == undefined) {
      //동일아이디 없을때
      return true;
    }
    return false;
  } catch (ex) {
    console.log(ex);
    return;
  }
};

self.signin = async function (info) {
  try {
    let result = await db('user')
      .select('password')
      .where('id', info.userid)
      .first()
      .then();
    if (result.password == info.password) {
      return true;
    }
    return false;
  } catch (ex) {
    console.log(ex);
    return;
  }
};

self.userinfo = async function (info) {
  try {
    let result = await db('user')
      .select('*')
      .where('id', info.userid)
      .first()
      .then();
    if (result == undefined) {
      //아이디 탐색 실패시
      return { result: false };
    }
    return { result: true, info: result };
  } catch (ex) {
    console.log(ex);
    return;
  }
};

module.exports = self;
