var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const publicIp = require('public-ip');
const { verifyToken } = require('./vertifyToken');

let state = [false, false]; //test 변수 (전등전원)
//테스트 (아두이노 역할 가정)
router.get('/action', function (req, res, next) {
  if (state[0] == false) {
    state = [true, false];
  } else {
    state = [false, false];
  }
  res.json(state);
});

//main page
router.get(
  '/page/main',
  asyncHandler(async (req, res, next) => {
    const pubIP = await publicIp.v4();
    res.render('index.ejs', { ip: pubIP, code: '' });
  }),
);

router.get('/testvert', verifyToken, (req, res, next) => {
  res.json(true);
});

module.exports = router;
