var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET game snake. */
router.get('/game', function(req, res, next) {
  res.render('game');
});

/* GET game snake. */
router.get('/snake', function(req, res, next) {
  res.render('snake');
});

module.exports = router;
