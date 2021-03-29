const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
const reqToMac = require('../common_modules/reqToMac');

let state = false; //test 변수 (전등전원)
//테스트 (아두이노 역할 mid=111 가정)
router.get('/111', function (req, res, next) {
  if (state == false) {
    state = true;
  } else {
    state = false;
  }
  res.json(state);
});

router.get('/action', async function (req, res, next) {
  let macRes = await reqToMac.req(req.headers.host, 3000, req.headers.mid);
  let resData = {
    mid: req.headers.mid,
    model: 'undefined',
    status: macRes.data,
  };
  res.json(JSON.stringify(resData));
});

router.get('/vertify', function (req, res, next) {});

module.exports = router;
