var express = require('express');
var router = express.Router();
const publicIp = require('public-ip');
const random = require('randomstring');

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
router.get('/page/main', async function (req, res, next) {
  const pubIP = await publicIp.v4();
  res.render('index.ejs', { ip: pubIP });
});

//인증코드 화면에 표시
router.get('/auth', async function (req, res, next) {
  let randStr = random.generate({
    length: 7,
    capitalization: 'lowercase',
  });
  res.json(randStr);
});

//유효성 검사 JWT이용으로 추후 구현
router.post('/validation/:serial', function (req, res, next) {
  randStr = random.generate(7);
  for (let i in randStr) {
    console.log('e');
    console.log(i + ' ');
  }
  res.json(randStr);
});

module.exports = router;
