// When we auth the user, the code that runs is in here

// Require passport module and any strategies you wish to use
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// A reference to our models
var db = require('../models');

// Provide serialize/deserialize functions so we can store user in a session
passport.serializeUser(function(user, callback){
  // callback(errorMsg, userData)
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
  db.user.findByPk(id)
  .then(function(user){
    callback(null, user);
  }).catch(function(err){
    console.log(`Bad news bears, something got fucked up around deserialization! ${err}`)
    callback(err, null);
  })
})

// Do the actual logging in (authentication)
passport.use(new LocalStrategy({
  // How are we determining that they are unique?
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, callback){
  db.user.findOne({ 
    where: {email: email }
  }).then(function(foundUser){
    // if I didn't find a valid user or that user's password, once hashed, doesn't match the hash in the db
    if(!foundUser || !foundUser.validPassword(password)) {
      // bad
      callback('Invalid credentials', null);
    } else {
      // good, authorize them

    };
  }).catch(callback);
  /*
  // This is the same as:
  .catch((err)=>{
    callback(err, null);
  })
  */
}));

// Make sure I can export this module to other pages
module.exports = passport;