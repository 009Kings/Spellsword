var express = require("express");
var router = express.Router();

// Include a reference to my middleware
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');

router.get('/', loggedIn, (req, res) => {
  res.render('profile/profile');
});

router.get('/spellbook/new', (req, res)=>{
  res.render('profile/create');
})

router.get('/spellbook/:id', (req, res)=>{
  res.render('profile/showSpellbook');
})


router.get('/admins', isAdmin, (req, res) => {
  res.render('profile/admin');
});

module.exports = router;