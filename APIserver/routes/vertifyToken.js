'use strict';
//vertifyToken middleware
const jwt = require('jsonwebtoken');
const env = require('../common_modules/env/env.json');
const SECRET_KEY = env.secret_key;

const verifyToken = (req, res, next) => {
  try {
    const clientToken = req.headers['x-access-token'] || req.query.token;
    const decoded = jwt.verify(clientToken, SECRET_KEY);
    if (decoded) {
      next();
    } else {
      res.status(401).json({ error: 'unauthorized' });
    }
  } catch (err) {
    res.status(401).json({ error: 'token expired' });
  }
};

exports.verifyToken = verifyToken;
