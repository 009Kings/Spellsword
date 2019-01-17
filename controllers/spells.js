var db = require("../models");
var express = require("express");
var router = express.Router();

router.get('/', (req, res)=>{
  db.spell.findAll().then((spells)=>{
    res.render("spells/spellList", {spells: spells});
  }).catch(err=>{
    console.log(`Bad news bears! There's neen an error getting all the spells!`);
    console.log(err);
    res.render("error");
  })
})

router.get('/:id', (req, res)=>{
  db.spell.findOne({
    where: {id: req.params.id},
    include: [db.school]
  }).then(spell=>{
    res.render("spells/showSpell", { spell : spell });
  }).catch(err=>{
    console.log(`Bad news bears! There's neen an error getting all the spells!`);
    console.log(err);
    res.render("error");
  })
})

module.exports = router;