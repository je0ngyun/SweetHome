var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const publicIp = require('public-ip');
const { verifyToken } = require('./vertifyToken');
const reqIP = require('request-ip');
const path = require('path');

let state = [false, false]; //test 변수 (전등전원)
//테스트 (아두이노 역할 가정)
router.get('/action', function (req, res, next) {
  try {
    let swt = req.query.switch;
    if (swt == 0) {
      state[0] = !state[0];
    } else {
      state[1] - !state[1];
    }
  } catch (ex) {
    console.log(ex);
  }
  res.json(state);
});

router.get('/vue', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
