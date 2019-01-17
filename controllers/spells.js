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

// router.post('/add', (req, res) => {
//   db.spell.findOrCreate({
//     where: {},
//     defaults: {

//     }
//   }).spread((spell, created)=>{
//     // Associate place with traveller
//     db.spellbook.findById(req.body.spellbookId)
//     .then((spellbook)=>{
//       spell.addSpellbook(spellbook)
//       .then((spellbook)=>{
//         console.log("association happened!")
//       }).catch((err)=>console.log("Ass didn't happen"));
//     }).catch(err=>console.log("Problem with the ass"))
//     res.redirect("/profile")
//   }).catch((err)=>console.log("You done fucked up", err))
// });

module.exports = router;