var express = require('express');
var router = express.Router();
let Op_req = require('../common_modules/op_req');
let db_conn = require('../common_modules/db_conn');

/* 전등 컨트롤 라우터 */
router.get('/', function (req, res, next) {
  //dp_conn 테스트
  console.log(db_conn());
});

router.get('/:mid', function (req, res, next) {
  // 전등요청 테스트
  // PUT /right/고유번호 형식  -> 전등 on off 로 추후 수정
  res.send(req.params.mid);
  let op_req = new Op_req(req.params.mid);
  console.log(op_req.getmid());
});

module.exports = router;
