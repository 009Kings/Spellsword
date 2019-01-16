var express = require("express");
var router = express.Router();

// Include a reference to my middleware
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');

router.get('/', loggedIn, (req, res) => {
  res.render('profile');
});

router.get('/spellbook/:id', (req, res)=>{
  res.send("It's a spellbook!");
})

router.get('/admins', isAdmin, (req, res) => {
  res.render('admin');
});

module.exports = router;