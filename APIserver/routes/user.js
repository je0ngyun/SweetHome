var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../common_modules/dbModel');
const createError = require('http-errors');

//회원가입
router.post(
  '/signup',
  asyncHandler(async (req, res, next) => {
    const result = await db.addUser(req.body);
    res.json({ success: true });
  }),
);

//회원탈퇴
router.delete(
  '/signup',
  asyncHandler(async (req, res, next) => {
    const result = await db.delUser(req.headers);
    if (!result) {
      throw new createError.BadRequest();
    } else {
      res.status(200).json({ success: true });
    }
  }),
);

//id체크(회원가입시)
router.get(
  '/idcheck',
  asyncHandler(async (req, res, next) => {
    const result = await db.idchecking(req.query);
    if (result != undefined) {
      throw new createError.Conflict();
    } else {
      res.status(200).json({ success: true });
    }
  }),
);

//로그인
router.post(
  '/signin',
  asyncHandler(async (req, res, next) => {
    const result = await db.signin(req.headers);
    if (result != undefined) {
      res.status(200).json({ success: true });
      await db.setUserLog({ userid: req.headers.userid, history: 'signin' });
    } else {
      throw new createError.NotAcceptable();
    }
  }),
);

//회원정보조회
router.get(
  '/info',
  asyncHandler(async (req, res, next) => {
    const result = await db.getUserInfo(req.query);
    res.status(200).json({ success: true, info: result });
  }),
);

//회원로그조회
router.get(
  '/log',
  asyncHandler(async (req, res, next) => {
    const result = await db.getUserLog(req.query);
    res.status(200).json({ success: true, log: result });
  }),
);

module.exports = router;
