var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const env = require('../common_modules/env/env.json');
const authCode = require('../common_modules/authCode');

//인증코드 화면에 표시
router.get('/code', (req, res, next) => {
  let code = authCode.createCode();
  res.locals.code = code;
  console.log(res.locals);
  //화면에 dialog 코드 필요
  res.json({ success: true }); //이 응답은 클라이언트로의 응답
});

//인증코드 확인후 토큰 발행
router.post(
  '/codecheck',
  asyncHandler(async (req, res, next) => {
    const token = jwt.sign(
      {
        api_serial: env.serial,
      },
      env.secret_key,
      {
        expiresIn: '1h',
      },
    );
    res.json({ success: true, token: token });
  }),
);

module.exports = router;
