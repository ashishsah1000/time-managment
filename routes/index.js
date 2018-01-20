var express = require('express');
var router = express.Router();
var Data = require("../modals/data")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('auth/login', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
    res.render('auth/signup', { title: 'Express' });
});
router.post('/register', function(req, res, next) {
    console.log(req.body.email);
    var posted = new Data({
        email:req.body.email,
        password:req.body.password
    });
    posted.save(function(err,callback){
        if(err)
            console.log(err);
        else{
            console.log("saved successfull");
            res.redirect("/");
        }
            
    })
});

module.exports = router;