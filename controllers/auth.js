// Requires
var db = require("../models");
var express = require("express");
var passport = require('../config/passportConfig');
var router = express.Router();

// Declare routes
router.get("/login", (req, res)=>{
  res.render("auth/login");
})

router.get("/signup", (req, res)=>{
  res.render("auth/signup", { oldInfo: null });
})

router.get("/logout", (req, res)=>{
  req.logout(); //logs out of session
  req.flash('success', 'Come back again!');
  res.redirect('/');
})

// passport.authenticate("type of strategy you are useing", {options})
router.post("/login", passport.authenticate('local', {
  successRedirect: '/profile',
  successFlash: 'Yay! Login Successful',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials, try again'
}));

router.post("/signup", (req, res, next)=>{
  if (req.body.password != req.body.passwordCheck) {
    res.render("auth/signup", {oldInfo: req.body, alerts: req.flash("error", "Passwords must match")})
  } else {
    db.user.findOrCreate({
      where: {
        email: req.body.email
        },
      defaults: req.body // This works bc the forms names are the same as the names in the db
    })
    .spread((user, created)=>{
      if(created){
        passport.authenticate('local', {
          successRedirect: '/profile',
          successFlash: 'Yay! Login Successful',
          failureRedirect: '/auth/login',
          failureFlash: 'Invalid Credentials, try again'
        })(req, res, next); 
      } else {
        res.render("auth/signup", {oldInfo: req.body, alerts: req.flash("error", `Error! Username already in use`)})
      }
    })
    .catch((error)=>{
      if(error && error.errors){
        error.errors.forEach((e)=>{
          console.log( `Error type ${e.type}`);
          if(e.type == 'Validation error'){
            req.flash("error", `Validation Error: ${e.message}`);
          } else {
            console.log(`Error (not validation) ${e}`);
          }
        })
      }
      res.render("auth/signup", {oldInfo: req.body, alerts: req.flash()})
    })
  }
})

// Export
module.exports = router;