var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('auth/login', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
    res.render('auth/signup', { title: 'Express' });
});
router.post('/register', function(req, res, next) {
    console.log(req.body.email);
});

module.exports = router;