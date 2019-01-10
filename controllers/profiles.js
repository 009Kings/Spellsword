var express = require("express");
var router = express.Router();
var db = require("../models");

router.get('/', (req, res) => {
  res.render('profile');
});

router.get('/admins', (req, res) => {
  res.render('profile');
});

module.exports = router;