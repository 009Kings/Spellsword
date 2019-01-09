// Requires
var express = require("express");
var router = express.Router();
var db = require("../models");

// Declare routes
router.get("/login", (req, res)=>{
  res.render("auth/login");
})

router.get("/signup", (req, res)=>{
  res.render("auth/signup", { oldInfo: null });
})

router.post("/login", (req, res)=>{
  res.send(req.body);
})

router.post("/signup", (req, res)=>{
  if (req.body.password != req.body.passwordCheck) {
    res.render("auth/signup", {oldInfo: req.body, alerts: req.flash("error", "Passwords must match")})
  } else {
    console.log(req.body);
    db.user.findOrCreate({
      where: {
        email: req.body.email
        },
      defaults: req.body // This works bc the forms names are the same as the names in the db
    })
    .spread((user, created)=>{
      if(created){
        req.flash("success", `Success! Welcome to the krew!`);
        res.redirect("/profile");  
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