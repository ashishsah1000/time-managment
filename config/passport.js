var LocalStrategy = require('passport-local').Strategy;
var Users = require('../modals/users'); 
//Users (since you are exporting the "modal" as "Users")
//wrong naming convention "modals". We call it models (in a sense a model of the data or the data schema)
// also we generally rename the Schema starting with Capital letter and no plural.
// ex: require('../models/User')

// for time being 
// TODO: make the bcrypt as userScheme.method.comapare in the model itself
var bcrypt = require('bcrypt');

module.exports = (passport) => {
    
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function(user, cb) {
      cb(null, user.id);
    });
    
    passport.deserializeUser(function(id, cb) {
      Users.findById(id, function (err, user) { // search for _id (which is by default created by MongoDB while saving data)
        if (err) { return cb(err); }
        
        cb(null, user);
      });
    });
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email', // the value should be similar to the req.body[val]. That is what decalared in name of the input element, ex: <input name="email" ... />
        passwordField: 'password',// should be same as the name set for the passport sending the password <input name="password" ...>
        passReqToCallback: true
    }, (req, email, password, done) => {
        // done is a function which is passed when we want to return
        // done(err [, user, message]);
        
        console.log('we are in here local-login, and here is the data received from req', req.body);
        Users.findOne(
            {
                'email': email
            })
            .then((user) => {
                console.log("Let's check the user: ", user);
                if (!user)
                    return done("User Not Found");
                    
                // Load hash from your password DB.
                    var enq = false;
                bcrypt.compare(password,user.password, function(err, res) {
                    if(err)throw err;
                   enq= res;
                });
                // var isPasswordMatching = 
                //     bcrypt.compare(password, user.password);
                
                console.log(enq == true ? "YES MATCHED" : "Nope, wrong pass!");
                
                if (enq==false) {
                    console.log("Invalid Pass");
                    return done("Invalid Password!");
                }
                
                return done(null, user); //null since no error, user is the doc object of the user found
            })
            .catch((err) => {
                if (err)
                    return done(err);
            })
    }))
    
}