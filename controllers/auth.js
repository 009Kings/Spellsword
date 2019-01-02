// Requires
var express = require("express");
var router = express.Router();

// Declare routes
router.get("/login", (req, res)=>{
  res.send("hello, login");
})

// Export
module.exports = router;