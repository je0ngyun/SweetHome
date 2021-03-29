'use strict';

const db = require('../common_modules/dbConn');
const self = {};

self.signup = async function (info) {
  try {
    let ret = await db('user')
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

self.signin = async function (info) {
  try {
  } catch (ex) {
    console.log(ex);
  }
};

self.userinfo = async function (info) {
  try {
    let ret = await db('user')
      .select('*')
      .where('id', info.userid)
      .first()
      .then();
    return ret;
  } catch (ex) {
    console.log(ex);
    return false;
  }
};

module.exports = self;
