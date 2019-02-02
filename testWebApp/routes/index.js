var express = require('express');
var router = express.Router();
var request = require('request');

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

router.get('/hello',function(req, res, next) {
  request('http://localhost:8080/hello', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for homepage.
      res.writeHead(200, {"Content-Type": "text/html"})
      res.write(body);
      // res.render("<div>"+ body +"</div>");
    } else {
      console.log(error)
    }
  })
});



module.exports = router;
