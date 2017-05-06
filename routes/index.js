var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { title: 'Project #2' });
});

router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Project #2' });
});

module.exports = router;
