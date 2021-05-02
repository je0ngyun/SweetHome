'use strict';
//vertifyToken middleware
const jwt = require('jsonwebtoken');
const env = require('../common_modules/env/env.json');
const SECRET_KEY = env.secret_key;
const createError = require('http-errors');
const reqIP = require('request-ip');

const verifyToken = (req, res, next) => {
  try {
    if (reqIP.getClientIp(req) === '::1') {
      //로컬호스트 요청인경우 검증 skip
      next();
      return;
    }
    const clientToken = req.headers['x-access-token'] || req.query.token;
    const decoded = jwt.verify(clientToken, SECRET_KEY);
    if (decoded) {
      next();
    } else {
      throw new createError.Unauthorized('유효하지 않은 토큰');
    }
  } catch (err) {
    throw new createError.Unauthorized('토큰만료');
  }
};

exports.verifyToken = verifyToken;
