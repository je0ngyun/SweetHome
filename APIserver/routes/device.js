var express = require('express');
var router = express.Router();
const db = require('../common_modules/dbModel');
const reqToMac = require('../common_modules/reqToMac');

//기기등록
router.post('/regist', async function (req, res, next) {
  const result = await db.addDevice(req.body);
  if (!result.result) {
    res.status(400).json(result.response);
  } else {
    res.status(201).json(result.response);
  }
});

//기기삭제
router.delete('/regist', async function (req, res, next) {
  const result = await db.delDevice(req.body);
  if (!result.result) {
    res.status(404).json(result.response);
  } else {
    res.status(200).json(result.response);
  }
});

//등록기기조회
router.get('/regist', async function (req, res, next) {
  const result = await db.getDevices(req.body);
  if (!result) {
    res.status(404).json(result.response);
  } else {
    res.status(200).json(result.response);
  }
});

//기기로그조회
router.get('/log', async function (req, res, next) {
  const result = await db.getDeviceLog(req.body);
  if (!result.result) {
    res.status(404).json(result.response);
  } else {
    res.status(200).json(result.response);
  }
});

//기기동작요청
router.get('/action', async function (req, res, next) {
  const result = await db.idToMac(req.body);
  if (!result.result) {
    res.status(404).json(result.response);
  } else {
    let history = '꺼짐';
    const macRes = await reqToMac.req(
      result.response.host,
      3000,
      result.response.mac,
    );
    if (macRes.data == '404') {
      res.status(404).json({
        success: false,
        device: macRes.data,
        message: '디바이스가 꺼져있거나 반응하지 않습니다',
      });
      return;
    }
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
  const result = await db.idToMac(req.body);
  if (!result.result) {
    res.status(404).json(result.response);
  } else {
    const macRes = await reqToMac.req(
      result.response.host,
      3000,
      'validation/' + result.response.mac,
    );
    if (macRes.data == '404') {
      res.status(404).json({
        success: false,
        device: macRes.data,
        message: '디바이스가 꺼져있거나 반응하지 않습니다',
      });
      return;
    }
    res.status(200).json({
      success: true,
      device: macRes.data,
      message: '디바이스 연결이 유효합니다',
    });
  }
});

module.exports = router;
