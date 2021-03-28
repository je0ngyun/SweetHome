var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json('test');
});

router.post('/', function (req, res, next) {
  res.json('test');
});

router.delete('/', function (req, res, next) {
  res.json('test');
});

module.exports = router;
