var express = require('express');
var router = express.Router();
var db = require('../common_modules/dbModel');

//회원가입
router.post('/signup', async function (req, res, next) {
  let result = await db.signup(req.body);
  res.json(result);
});

//로그인
router.get('/signin', async function (req, res, next) {
  let result = await db.signin(req.body);
});

//회원정보조회
router.get('/info', async function (req, res, next) {
  res.json(await db.userinfo(req.body));
});

module.exports = router;
