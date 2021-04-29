var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const random = require('randomstring');
const jwt = require('jsonwebtoken');
const env = require('../common_modules/env/env.json');

//인증코드 화면에 표시
router.get('/code', function (req, res, next) {
  let randStr = random.generate({
    length: 7,
    capitalization: 'lowercase',
  });
  res.json(randStr);
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
