var express = require('express');
var router = express.Router();
let OpReq = require('../common_modules/OpReq');

//상태 get
router.get('/:mid', function (req, res, next) {
  let opReq = new OpReq(req.params.mid);
  res.send(req.params.mid);
});

//전등 On/Off 요청
router.put('/:mid', function (req, res, next) {
  let opReq = new OpReq(req.params.mid);
  res.send(req.params.mid);
});

module.exports = router;
