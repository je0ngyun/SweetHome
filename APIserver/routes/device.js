var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const db = require('../common_modules/dbmodel');
const reqToMac = require('../common_modules/reqToMac');
const isEmpty = require('is-empty');

//등록기기조회
router.get(
  '/regist',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDevices(req.query);
    if (isEmpty(result)) {
      throw new createError.BadRequest('등록기기 없음');
    }
    res.status(200).json({ success: true, devices: result });
  }),
);

//특정기기로그조회
router.get(
  '/log',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDeviceLog(req.query);
    if (isEmpty(result)) {
      throw new createError.BadRequest('요청기기 없음');
    }
    res.status(200).json({ success: true, logs: result });
  }),
);

//전체기기로그조회
router.get(
  '/log/all',
  asyncHandler(async (req, res, next) => {
    const result = await db.getDeviceLogAll(req.query);
    if (isEmpty(result)) {
      throw new createError.BadRequest('요청시리얼번호 없음');
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
