var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const publicIp = require('public-ip');
const { verifyToken } = require('./vertifyToken');
const reqIP = require('request-ip');
const path = require('path');

router.get('/vue', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
