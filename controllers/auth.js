// Requires
var express = require("express");
var router = express.Router();

// Declare routes
router.get("/login", (req, res)=>{
  res.render("auth/login");
})

router.get("/signup", (req, res)=>{
  res.render("auth/signup");
})

router.post("/login", (req, res)=>{
  res.send(req.body);
})

router.post("/signup", (req, res)=>{
  if (req.body.password != req.body.password-check) {
    req.flash("error", "Passwords must match");
    res.redirect("/auth/signup");
  } else {
    res.send(req.body);
  }
  
})

// Export
module.exports = router;