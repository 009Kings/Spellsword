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
  res.send("Post to login is working!");
})

router.post("/signup", (req, res)=>{
  res.send("Post to signup is working!");
})

// Export
module.exports = router;