var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const env = require('../common_modules/env/env.json');
const authCode = require('../common_modules/authCode');
const createError = require('http-errors');
const isEmpty = require('is-empty');

//인증코드 화면에 표시
router.get('/code', (req, res, next) => {
  const io = req.app.get('socketIO');
  const code = authCode.createCode();
  io.emit('code', code + ''); //라즈베리파이로의 코드 표출 요청
  res.json({ success: true }); //이 응답은 요청 클라이언트로의 응답
});

//인증코드 확인후 토큰 발행
router.post(
  '/codecheck',
  asyncHandler(async (req, res, next) => {
    if (isEmpty(authCode.getCode())) {
      throw new createError.Unauthorized('만료된 코드');
    }
    if (req.headers.code != authCode.getCode()) {
      throw new createError.Unauthorized('잘못된 인증코드');
    }
    const token = jwt.sign(
      {
        api_serial: env.serial,
      },
      env.secret_key,
      {
        expiresIn: '30h',
      },
    );
    res.status(201).json({ success: true, token: token });
  }),
);

module.exports = router;
