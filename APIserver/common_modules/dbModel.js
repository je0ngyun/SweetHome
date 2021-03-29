'use strict';

const db = require('../common_modules/dbConn');
const self = {};

self.signup = function (userinfo) {};

self.getinfo = async function (userid) {
  let ret = await db('user').where('id', userid).first().then();
  return ret;
};

module.exports = self;
