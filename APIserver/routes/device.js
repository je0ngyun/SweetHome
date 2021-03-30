var express = require('express');
const { rawListeners } = require('../app');
var router = express.Router();
var db = require('../common_modules/dbModel');

//기기등록
router.post('/regist', async function (req, res, next) {
  let result = await db.regDevice(req.body);
  if (!result) {
    res.status(400).json({
      success: false,
      message: '예상치못한 이유로 기기등록을 완료하지 못하였습니다',
    });
  } else {
    res.status(201).json({ success: true, message: '기기등록 완료' });
  }
});

//기기등록해제
router.delete('/regist', async function (req, res, next) {
  let result = await db.unRegDevice(req.body);
  if (!result) {
    res.status(404).json({
      success: false,
      message: '요청하신 회원아이디나 기기아이디가 존재하지 않습니다',
    });
  } else {
    res.status(200).json({ success: true, message: '기기삭제 완료' });
  }
});

//기기동작요청
router.get('/action', async function (req, res, next) {
  /*let result = await db.getMac(req.body);
  if (!result.result) {
    res.status(404).json({
      success: false,
      message: '요청하신 기기번호가 존재하지 않습니다',
    });
  } else {
    res.status(200).json({ success: true, mac: result.mac });
  }*/
});

module.exports = router;
