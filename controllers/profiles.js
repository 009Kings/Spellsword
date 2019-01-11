var express = require("express");
var router = express.Router();

// Include a reference to my middleware
var loggedIn = require('../middleware/loggedIn');

router.get('/', loggedIn, (req, res) => {
  res.render('profile');
});

router.get('/admins', loggedIn, (req, res) => {
  res.render('admin');
});

module.exports = router;