var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const db = require('../common_modules/dbModel');
const reqToMac = require('../common_modules/reqToMac');

//기기등록
router.post(
  '/regist',
  asyncHandler(async (req, res, next) => {
    const result = await db.addDevice(req.body);
    res.json({ success: true });
  }),
);

//기기삭제
router.delete(
  '/regist',
  asyncHandler(async (req, res, next) => {
    const result = await db.delDevice(req.headers);
    res.json({ success: true });
  }),
);

//등록기기조회
router.get(
  '/regist',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDevices(req.query);
    if (result == undefined) {
      throw new createError.BadRequest();
    }
    res.status(200).json({ success: true, device: result });
  }),
);

//기기로그조회
router.get(
  '/log',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDeviceLog(req.query);
    if (result == undefined) {
      throw new createError.BadRequest();
    }
    res.status(200).json({ success: true, device: result });
  }),
);

//기기동작요청
router.get(
  '/action',
  asyncHandler(async (req, res, next) => {
    const result = await db.idToMac(req.query);
    const macRes = await reqToMac.req(result.host, 3000, result.mac, req.query);
    res.status(200).json({
      success: true,
      device: macRes.data,
    });
    await db.setDeviceLog({
      userid: req.query.userid,
      deviceid: req.query.deviceid,
      history: macRes.data,
    });
  }),
);

//주기적 유효성 검사
router.get(
  '/validation',
  asyncHandler(async (req, res, next) => {}),
);

module.exports = router;
