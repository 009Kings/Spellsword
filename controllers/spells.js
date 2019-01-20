var db = require("../models");
var express = require("express");
var router = express.Router();
var async = require('async');
var colors = require('colors');

router.get('/', (req, res)=>{
  async.waterfall([callback=>{
    // Get all the schools
    db.school.findAll({ order: ['name'] }).then(schools=>{
      callback(null, schools);
    })
  }, (schools, callback)=>{
    // Get all the Classes
    db.characterclass.findAll({ 
      where: { spellcasting: true },
      order: ['name'] 
    }).then(spellClasses=>{
      callback(null, schools, spellClasses);
    })
  }, (schools, classes, callback)=>{
    db.spell.findAll({
      include: [{
        model: db.characterclass,
      }, {
        model: db.school,
      }],
      order: ['name']
    }).then((spellsArray)=>{
      console.log(`schools is a ${spellsArray[0].characterclasses}` .red);
      res.render("spells/spellList", {spells: spellsArray, schools: schools, cClasses: classes});
      callback(null, 'fucking doneskies');
    }).catch(err=>{
      console.log(`Bad news bears! There's neen an error displaying the spells!`);
      console.log(err);
      res.render("error");
    })
  }], (error, result)=>{
    if (error) {
      console.log(`The error is ${error}` .red);
    }
  })
})

router.get('/byClass/:class', (req, res)=>{
  db.spell.findAll({
    include: [{
      model: db.characterclass,
      where: { name: req.params.class }
    }],
    order: ['name'],
  }).then(classSpells=>{
    res.render('spells/byClass', { spells: classSpells, cClass: req.params.class });
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
          res.render('spells/showSpell', { spell : spell, relevantSpellbooks: relevantSpellbooks, spellbooks: spellbooks });
          callback(null, 'rendering Done')
        }])
      })
    } else {
      res.render('spells/showSpell', { spell : spell });
    }
  }).catch(err=>{
    console.log(`Bad news bears! There's neen an error getting all the spells!`);
    console.log(err);
    res.render("error");
  })
})


module.exports = router;