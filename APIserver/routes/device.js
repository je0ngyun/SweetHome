var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const db = require('../common_modules/dbmodel');
const reqToMac = require('../common_modules/reqToMac');

//등록기기조회
router.get(
  '/regist',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDevices(req.query);
    if (result == undefined) {
      throw new createError.BadRequest();
    }
    res.status(200).json({ success: true, devices: result });
  }),
);

//특정기기로그조회
router.get(
  '/log',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDeviceLog(req.query);
    if (result == undefined) {
      throw new createError.BadRequest();
    }
    res.status(200).json({ success: true, logs: result });
  }),
);

//전체기기로그조회
router.get(
  '/log/all',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDeviceLogAll(req.query);
    if (result == undefined) {
      throw new createError.BadRequest();
    }
    res.status(200).json({ success: true, logs: result });
  }),
);

//기기동작요청
router.get(
  '/action',
  asyncHandler(async (req, res, next) => {
    const host = await db.getDeviceHost(req.query);
    const macRes = await reqToMac.req(host, 80, 'action', req.query);
    if (macRes.data != '404') {
      req.query.host = host;
      await db.setDeviceLog(req.query, macRes.data);
    }
    res.status(200).json({
      success: true,
      device: macRes.data,
    });
  }),
);

module.exports = router;
