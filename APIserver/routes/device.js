var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const db = require('../common_modules/dbmodel');
const reqToMac = require('../common_modules/reqToMac');
const isEmpty = require('is-empty');
const { verifyToken } = require('./vertifyToken');

//등록기기조회
router.get(
  '/regist',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const result = await db.getDevices(req.query);
    if (isEmpty(result)) {
      throw new createError.BadRequest('등록기기 없음');
    }
    res.status(200).json({ success: true, devices: result });
  }),
);

//특정기기삭제
router.delete(
  '/regist',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    await db.delDevice(req.query);
    res.status(200).json({ success: true });
  }),
);

//전체기기삭제
router.delete(
  '/regist/all',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    await db.delDeviceAll(req.query);
    res.status(200).json({ success: true });
  }),
);

//특정기기로그조회
router.get(
  '/log',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const result = await db.getDeviceLog(req.query);
    if (isEmpty(result)) {
      throw new createError.BadRequest('요청기기 없음');
    }
    for (let i = 0; i < result.length; i++) {
      let state = [];
      let stateStr = result[i].state;
      state = stateStr.split(',');
      for (let k = 0; k < state.length; k++) {
        if (state[k] == 'true') {
          state[k] = true;
        } else {
          state[k] = false;
        }
      }
      result[i].state = state;
    }
    res.status(200).json({ success: true, logs: result });
  }),
);

//전체기기로그조회
router.get(
  '/log/all',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const result = await db.getDeviceLogAll(req.query);
    if (isEmpty(result)) {
      throw new createError.BadRequest('요청기기 없음');
    }
    res.status(200).json({ success: true, logs: result });
  }),
);

//전체로그삭제
router.delete(
  '/log/all',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    await db.delDeviceLogAll(req.query);
    res.status(200).json({ success: true });
  }),
);

//기기상태확인
router.get(
  '/state',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    let state = [];
    let stateStr;
    const result = await db.getLastState(req.query);
    if (isEmpty(result)) {
      //로그가 없을때 == 꺼진상태
      //기기의 스위치 수 만큼 상태 평문 생성
      let way = await db.getDeviceWay(req.query);
      for (let i = 0; i < Number(way); i++) {
        stateStr += 'false,';
      }
      stateStr = stateStr.slice(0, state.length - 1);
      //로그 평문을 배열화
      state = stateStr.split(',');
      for (let i = 0; i < state.length; i++) {
        if (state[i] == 'true') {
          state[i] = true;
        } else {
          state[i] = false;
        }
      }
    } else {
      stateStr = result.state;
      state = stateStr.split(',');
      for (let i = 0; i < state.length; i++) {
        if (state[i] == 'true') {
          state[i] = true;
        } else {
          state[i] = false;
        }
      }
    }
    res.status(200).json({ success: true, state: state });
  }),
);

//기기이름변경
router.get(
  '/rename',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    await db.deviceRename(req.query);
    res.status(200).json({ success: true });
  }),
);

//기기동작요청
router.get(
  '/action',
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const name = await db.getDeviceName(req.query);
    const host = req.query.host;
    try {
      const macRes = await reqToMac.req(host, 80, 'action', req.query);
      if (macRes.data != 'disconnect') {
        req.query.name = name;
        //await db.setDeviceLog(req.query, macRes.data.states);
        res.status(200).json({
          success: true,
          device: macRes.data,
        });
      } else {
        res.status(200).json({
          success: false,
          device: macRes.data,
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }),
);

module.exports = router;
