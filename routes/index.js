var express = require('express');
var router = express.Router();
var Data = require("../modals/data");
var Users = require("../modals/users.js");
var validator = require("express-validator");
var bcrypt = require('bcrypt');
// const saltRounds = 10;
const passport = require("passport");
// var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('auth/login', { title: 'Express',error:false});
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
 
        // bcrypt.hash(pass, saltRounds, function(err, hash) { // its here ? have a look at it Bcry
            // Store hash in your password DB.
            
            var posted = new Users({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
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
            // if (err)
            //     console.log(err);

        // });

    }

});


// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     session: true
//   },
//   function(email, password, done) {
//     console.log(email +" "+ password +"that was it");
//     Users.findOne({ email: email }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//     //   if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

router.post('/login', 
  passport.authenticate('local-login', {
      failureRedirect: '/',
      successRedirect: 'profile/profile'
  }));
  
//   , function(req, res) {
//     //res.render('profile/profile'); // NO RENDER IN POST METHOD
//   }
//   );






// router.post("/login",function(req,res,next){
//   var email=req.body.email;
//   var password=req.body.password;
//   console.log(email +" "+ password);
//   Users.findOne({'email':email},function(err,docs){
//       if(err)throw err;
//         if(docs==null)
//             res.render("auth/login",{title:"Re-Login",error:"user does not exist"})
//         else{
//             req.login(docs, function(err) {
//                 if (err) { return next(err); }
//                 return res.render('profile/profile',docs);
//                 });
            
//         }
            
//   });
// });
// passport.serializeUser(function(docs, done) {
//   done(null, docs.email);
// });

// passport.deserializeUser(function(docs, done) {
//   Users.findOne(docs.email, function (err, user) {
//     done(err, user);
//   });
// });

module.exports = router;