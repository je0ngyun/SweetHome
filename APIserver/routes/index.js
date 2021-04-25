var express = require('express');
var router = express.Router();

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

//api server
router.get('/', function (req, res, next) {
  res.send('API server 1.0');
});

//유효성 검사 JWT이용으로 추후 구현
router.post('/validation/:serial', function (req, res, next) {
  res.json(req.params.serial);
});

module.exports = router;
