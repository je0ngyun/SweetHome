var express = require('express');
var router = express.Router();
var db = require('../common_modules/dbModel');

//회원가입
router.post('/signup', async function (req, res, next) {
  let result = await db.addUser(req.body);
  if (!result) {
    res.status(400).json({
      success: false,
      message: '예상치못한 이유로 회원가입을 완료하지 못하였습니다',
    });
  } else {
    res.status(201).json({ success: true, message: '회원가입 완료' });
  }
});

//회원탈퇴
router.delete('/signup', async function (req, res, next) {
  let result = await db.delUser(req.headers);
  if (!result) {
    res.status(400).json({
      success: false,
      message: '예상치못한 이유로 회원탈퇴를 완료하지 못하였습니다',
    });
  } else {
    res.status(200).json({ success: true, message: '회원탈퇴 완료' });
  }
});

//id체크(회원가입시)
router.get('/idcheck', async function (req, res, next) {
  let result = await db.idchecking(req.body);
  if (!result) {
    res.status(409).json({
      success: false,
      message: '이미 사용중인 아이디입니다',
    });
  } else {
    res.status(200).json({ success: true, message: '사용가능한 아이디입니다' });
  }
});

//로그인
router.get('/signin', async function (req, res, next) {
  let result = await db.signin(req.headers);
  if (!result) {
    res
      .status(406)
      .json({ success: false, message: '아이디나 비밀번호를 확인해주세요' });
  } else {
    res.status(200).json({ success: true, message: '로그인 성공' });
    await db.setUserLog({ userid: req.headers.userid, history: 'signin' });
  }
});

//회원정보조회
router.get('/info', async function (req, res, next) {
  let result = await db.getUserInfo(req.body);
  if (!result.result) {
    res
      .status(404)
      .json({ success: false, message: '잘못된 회원아이디 입니다' });
  } else {
    res.status(200).json({
      success: true,
      message: '회원정보 조회 성공',
      info: result.info,
    });
  }
});

//회원로그조회
router.get('/log', async function (req, res, next) {
  let result = await db.getUserLog(req.body);
  if (!result.result) {
    res
      .status(404)
      .json({ success: false, message: '잘못된 회원아이디 입니다' });
  } else {
    res.status(200).json({
      success: true,
      message: '회원정보 조회 성공',
      info: result.log,
    });
  }
});

module.exports = router;
