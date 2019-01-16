var db = require("../models");
var express = require("express");
var router = express.Router();

router.get('/', (req, res)=>{
  res.send("Spells");
})

router.get('/:id', (req, res)=>{
  res.send(`Showing spell at id ${req.params}`);
})

module.exports = router;