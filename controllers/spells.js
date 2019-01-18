var db = require("../models");
var express = require("express");
var router = express.Router();
var async = require('async');

router.get('/', (req, res)=>{
  db.spell.findAll({order: ['name']}).then((spells)=>{
      res.render("spells/spellList", {spells: spells});
  }).catch(err=>{
    console.log(`Bad news bears! There's neen an error getting all the spells!`);
    console.log(err);
    res.render("error");
  })
})

// if (nameFilter) {
//   var filteredData = dinoData.filter((dino)=>{
//       return dino.name.toLowerCase() === nameFilter.toLowerCase();
//   });
//   res.render(`dinosaurs/index`, {myDinos: filteredData})
// } else {
//   res.render(`dinosaurs/index`, {myDinos: dinoData})
// }

router.get('/:id', (req, res)=>{
  db.spell.findOne({
    where: {id: req.params.id},
    include: [db.school, db.characterclass]
  }).then(spell=>{
    // Access all the spellbooks if a user is logged in
    if (req.user) {
      db.spellbook.findAll({
        where: {userId: req.user.id},
        include: [db.characterclass]
      }).then(spellbooks=>{
        // Creates an array of relevant spellbooks
        var relevantSpellbooks = [];
        async.series([(callback)=>{
          spellbooks.forEach(spellbook=>{
            if (spellbook[`level_${spell.level}_slots`] > 0 || spell.level == 0) {
              relevantSpellbooks.push(spellbook);
            } else if (spellbook.characterclass === "Warlock") {
              // find spell max
              var spellMax;
              
              for(i=spellbook.level; i<=1; i-=1){
                if (i) {
                  spellMax = i;
                }
              }
              // Check if the spell falls within the Spellmax range
              if (spell.level <= spellMax) {
                relevantSpellbooks.push(spellbook);
              }
            }
          })
          callback(null, 'relevantSpellbooks Done');
        }, (callback)=>{
          res.render("spells/showSpell", { spell : spell, relevantSpellbooks: relevantSpellbooks, spellbooks: spellbooks });
          callback(null, 'rendering Done')
        }])
      })
    } else {
      res.render("spells/showSpell", { spell : spell });
    }
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