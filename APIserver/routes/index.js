var express = require('express');
var router = express.Router();
let OpReq = require('../common_modules/OpReq');

//유효성검사
router.get('/validation/:mid', function (req, res, next) {
  let opReq = new OpReq(req.params.mid);
  res.send(req.params.mid);
});

//기기등록
router.post('/:mid', function (req, res, next) {
  let opReq = new OpReq(req.params.mid);
  res.send(req.params.mid);
});

//기기삭제
router.delete('/:mid', function (req, res, next) {
  let opReq = new OpReq(req.params.mid);
  res.send(req.params.mid);
});

module.exports = router;
