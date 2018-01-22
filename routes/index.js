var express = require('express');
var router = express.Router();
var Data = require("../modals/data");
var Users = require("../modals/users.js");
var validator = require("express-validator");
var bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('auth/login', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
    res.render('auth/signup', { title: 'Express', error: "" });
});
router.post('/register', function(req, res, next) {

    req.checkBody('email', 'username name should not be empty').notEmpty();
    req.checkBody('password', 'password should not be empty').notEmpty();
    req.checkBody('username', 'Please enter correct user name').notEmpty();
    req.checkBody('password', 'password did not match').equals(req.body.samepassword);
    const errors = req.validationErrors();
    if (errors) {
        console.log(`errors ${JSON.stringify(errors)}`);
        res.render("auth/signup", { title: "registeration error", error: errors });
    } else {
        var pass = req.body.password;
        console.log(pass);
        var fpass = "";
        bcrypt.hash(pass, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            var posted = new Users({
                email: req.body.email,
                password: hash,
                username: req.body.username
            });

            posted.save(function(err, callback) {
                if (err)
                    console.log(err);
                else {
                    console.log("saved successfull");
                    res.render("auth/login", { title: "tropo", error: "" });
                }

            });
            if (err)
                console.log(err);

        });

    }

});

module.exports = router;