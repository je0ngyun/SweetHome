var express = require('express');
var router = express.Router();
var db = require('../common_modules/dbModel');

router.post('/', function (req, res, next) {
  db.signup();
});

router.get('/', async function (req, res, next) {
  res.json(await db.getinfo(1));
});

module.exports = router;
