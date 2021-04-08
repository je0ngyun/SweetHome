const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

let state = false; //test 변수 (전등전원)
//테스트 (아두이노 역할 mac=aa 가정)
router.get('/aa', function (req, res, next) {
  if (state == false) {
    state = true;
  } else {
    state = false;
  }
  res.json(state);
  console.log(req.query);
});

//테스트 (아두이노 역할 mac=aa 가정)
router.get('/validation/aa', function (req, res, next) {
  res.json(true);
});

module.exports = router;
