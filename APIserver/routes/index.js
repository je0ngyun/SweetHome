const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
const reqToMac = require('../common_modules/reqToMac');

let state = false; //test 변수 (전등전원)

//유효성검사
router.get('/validation/:mid', function (req, res, next) {});

//테스트 (API 역할)
router.get('/:mid', async function (req, res, next) {
  let macRes = await reqToMac.req();
  res.json(macRes.data);
});

//아두이노 기기등록
router.post('/:mid', async function (req, res, next) {});

//사용자 기기등록
router.put('/:mid', function (req, res, next) {});

//기기삭제
router.delete('/:mid', function (req, res, next) {});

//테스트 (아두이노 역할)
router.get('/arduino/:mid', function (req, res, next) {
  if (state == false) {
    state = true;
  } else {
    state = false;
  }
  res.json(state);
});

module.exports = router;
