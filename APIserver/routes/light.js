var express = require('express');
var router = express.Router();

/* 전등 컨트롤 라우터 */
router.get('/', function (req, res, next) {
  res.send('light control');
});

// PUT /right/고유번호 형식  -> 전등 on off 로 추후 수정
router.get('/:mid', function (req, res, next) {
  res.send(req.params);
});

module.exports = router;
