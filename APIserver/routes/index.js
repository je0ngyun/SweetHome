var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/test', function (req, res, next) {
  res.send('respond with a resource');
  console.log('연결됨');
});

module.exports = router;
