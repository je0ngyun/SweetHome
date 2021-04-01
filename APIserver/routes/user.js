var express = require('express');
var router = express.Router();
const db = require('../common_modules/dbModel');

//회원가입
router.post('/signup', async function (req, res, next) {
  const result = await db.addUser(req.body);
  if (!result.result) {
    res.status(400).json(result.response);
  } else {
    res.status(201).json(result.response);
  }
});

//회원탈퇴
router.delete('/signup', async function (req, res, next) {
  const result = await db.delUser(req.headers);
  if (!result.result) {
    res.status(400).json(result.response);
  } else {
    res.status(200).json(result.response);
  }
});

//id체크(회원가입시)
router.get('/idcheck', async function (req, res, next) {
  const result = await db.idchecking(req.body);
  if (!result.result) {
    res.status(409).json(result.response);
  } else {
    res.status(200).json(result.response);
  }
});

//로그인
router.get('/signin', async function (req, res, next) {
  const result = await db.signin(req.headers);
  if (!result.result) {
    res.status(406).json(result.response);
  } else {
    res.status(200).json(result.response);
    await db.setUserLog({ userid: req.headers.userid, history: 'signin' });
  }
});

//회원정보조회
router.get('/info', async function (req, res, next) {
  const result = await db.getUserInfo(req.body);
  if (!result.result) {
    res.status(404).json(result.response);
  } else {
    res.status(200).json(result.response);
  }
});

//회원로그조회
router.get('/log', async function (req, res, next) {
  const result = await db.getUserLog(req.body);
  if (!result.result) {
    res.status(404).json(result.response);
  } else {
    res.status(200).json(result.response);
  }
});

module.exports = router;
