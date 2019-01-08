// Requires
var express = require("express");
var router = express.Router();
var db = require("../models");


var oldInfo = null;

// Declare routes
router.get("/login", (req, res)=>{
  res.render("auth/login");
})

router.get("/signup", (req, res)=>{
  res.render("auth/signup", { oldInfo: oldInfo });
})

router.post("/login", (req, res)=>{
  res.send(req.body);
})

router.post("/signup", (req, res)=>{
  if (req.body.password != req.body.passwordCheck) {
    req.flash("error", "Passwords must match");
    oldInfo = req.body;
    res.redirect("/auth/signup");
  } else {
    console.log(req.body);
    db.user.findOrCreate({
      where: { username: req.body.username },
      defaults: req.body // This works bc the forms names are the same as the names in the db
    })
    .spread((user, created)=>{
      if(created){
        req.flash("success", `Success! Welcome to the krew!`);
        oldInfo = null;
        res.redirect("/profile");  
      } else {
        req.flash("error", `Error! Username already in use`);
        oldInfo = req.body;
        res.redirect("/auth/signup")
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
      res.redirect('/auth/signup');
    })
  }
})

// Export
module.exports = router;