var express = require('express');
var router = express.Router();
const db = require('../common_modules/dbModel');
const reqToMac = require('../common_modules/reqToMac');

//기기등록
router.post('/regist', async function (req, res, next) {
  let result = await db.addDevice(req.body);
  if (!result) {
    res.status(400).json({
      success: false,
      message: '예상치못한 이유로 기기등록을 완료하지 못하였습니다',
    });
  } else {
    res.status(201).json({ success: true, message: '기기등록 완료' });
  }
});

//기기삭제
router.delete('/regist', async function (req, res, next) {
  let result = await db.delDevice(req.body);
  if (!result) {
    res.status(404).json({
      success: false,
      message: '요청하신 회원아이디나 기기아이디가 존재하지 않습니다',
    });
  } else {
    res.status(200).json({ success: true, message: '기기삭제 완료' });
  }
});

//기기로그조회
router.get('/log', async function (req, res, next) {
  let result = await db.getDeviceLog(req.body);
  if (!result.result) {
    res
      .status(404)
      .json({ success: false, message: '잘못된 회원아이디 입니다' });
  } else {
    res.status(200).json({
      success: true,
      message: '기기로그 조회 성공',
      log: result.log,
    });
  }
});

//기기동작요청
router.get('/action', async function (req, res, next) {
  let result = await db.idToMac(req.body);
  if (!result.result) {
    res.status(404).json({
      success: false,
      message: '요청하신 기기아이디가 존재하지 않습니다',
    });
  } else {
    let macRes = await reqToMac.req(result.host, 3000, result.mac);
    let history = '꺼짐';
    res.status(200).json({
      success: true,
      device: macRes.data,
      message: '기기 동작요청 성공',
    });
    if (macRes.data) {
      history = '켜짐';
    }
    await db.setDeviceLog({
      userid: req.body.userid,
      deviceid: req.body.deviceid,
      history: history,
    });
  }
});

//주기적 유효성 검사
router.get('/validation', async function (req, res, next) {
  let result = await db.idToMac(req.body);
  if (!result.result) {
    res.status(404).json({
      success: false,
      message: '요청하신 기기아이디가 존재하지 않습니다',
    });
  } else {
    let macRes = await reqToMac.req(
      result.host,
      3000,
      'validation/' + result.mac,
    );
    res.json({ success: macRes.data, message: '기기유효' });
  }
});

module.exports = router;
