var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const db = require('../common_modules/model');
const reqToMac = require('../common_modules/reqToMac');

//등록기기조회
router.get(
  '/regist',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDevices();
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
    const macRes = await reqToMac.req(req.query.host, 80, 'action', req.query);
    res.status(200).json({
      success: true,
      device: macRes.data,
    });
    req.query.state = macRes.data;
    await db.setDeviceLog(req.query);
  }),
);

module.exports = router;
