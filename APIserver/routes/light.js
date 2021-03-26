var express = require('express');
var router = express.Router();
let OpReq = require('../common_modules/OpReq');
let dbConn = require('../common_modules/dbConn');

/* 전등 컨트롤 라우터 */
router.get('/', function (req, res, next) {
  //dp_conn 테스트
  console.log(dbConn());
});

router.get('/:mid', function (req, res, next) {
  // 전등요청 테스트
  // PUT /right/고유번호 형식  -> 전등 on off 로 추후 수정
  res.send(req.params.mid);
  let opReq = new OpReq(req.params.mid);
  console.log(opReq.getmid());
});

module.exports = router;
