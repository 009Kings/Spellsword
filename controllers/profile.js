var colors = require('colors');
var db = require('../models');
var express = require("express");
var request = require('request');
var router = express.Router();

// Include a reference to my middleware
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');

router.get('/', loggedIn, (req, res) => {
  // TODO: include Character Class?
  db.user.findOne({
    where: {email: req.user.email},
    include: [db.spellbook]
  }).then(user=>{
    // add all the classes for the create
    db.characterclass.findAll({ order: ['id'] }).then(cClasses=>{
      res.render('profile/profile', { user: user, classes: cClasses });
    })
  }).catch(err=>{
    console.log(`Bad news bears, there's an error in the profile main!` .magenta);
    console.log(err);
  })
});

router.get('/spellbook/new', loggedIn, (req, res)=>{
  db.characterclass.findAll({order: ['id']}).then(classes=>{
    res.render('profile/create', { classes: classes });
  })
})

router.post('/add', loggedIn, (req, res)=>{
  request(`http://www.dnd5eapi.co/api/classes/${req.body.characterclass.toLowerCase()}/level/${req.body.level}`, (error, response, body)=>{
    if(error || response.statusCode !=200){
      console.log(`Bad news bears! There's been an error in Request for the class ${i}` .magenta);
      console.log(error);
    } else {
      results = JSON.parse(body);
      
      // Find the class to create a correlation
      db.characterclass.findOne({ where: { name: req.body.characterclass }}).then((characterclass)=>{

        // Create a Spellbook with the character class reference!
        db.spellbook.create({
          name: req.body.name,
          level: req.body.level,
          userId: req.user.id,
          characterclassId: characterclass.id,
          known_spells: results.spellcasting.spells_known,
          cantrips_known: results.spellcasting.cantrips_known,
          level_1_slots: results.spellcasting.spell_slots_level_1,
          level_2_slots: results.spellcasting.spell_slots_level_2,
          level_3_slots: results.spellcasting.spell_slots_level_3,
          level_4_slots: results.spellcasting.spell_slots_level_4,
          level_5_slots: results.spellcasting.spell_slots_level_5,
          level_6_slots: results.spellcasting.spell_slots_level_6,
          level_7_slots: results.spellcasting.spell_slots_level_7,
          level_8_slots: results.spellcasting.spell_slots_level_8,
          level_9_slots: results.spellcasting.spell_slots_level_9,
          }).then((newSpellbook)=>{
          if (!newSpellbook) {
            console.log(`Error creating ${req.body.name}`);
          }
          res.redirect('/profile');
        }).catch(error=>{
          console.log('Check out that error creating a spellbook' .red);
          console.log(error);
        }) 
      }).catch(error=>{
        console.log('Check out that error finding a character class!' .red);
        console.log(error);
      })
    } // End of the Request Else
  }) // End of the request
  
})

router.post('/spellbook/add', (req, res)=>{
  // TODO: spell.characterclasses.forEach(cClass=>{if(cClass!==spellbook.characterclass){//alert that allows the spell to be added anyway}})
  db.spellbook.findOne({
    where: { id: req.body.spellbookId}
  }).then(spellbook=>{
    db.spell.findByPk(req.body.spellId)
    .then(spell=>{
      spellbook.addSpell(spell, { through: { exceptionAdd: req.body.isException }});
    }).then(spell=>{
      res.redirect('/spells');
    })
  })
})


router.get('/spellbook/:id', loggedIn, (req, res)=>{
  db.spellbook.findOne({
    where: {id: req.params.id},
    include: [db.characterclass, db.spell]
  }).then(spellbook=>{
    if (spellbook.characterclass.name === 'Warlock') {
      // Find that spellmax!
      var spellMax;
      for (var i = 5; i >= 1; i -= 1) {
        console.log(`${i}` .magenta);
        if (spellbook[`level_${i}_slots`]) {
          spellMax = i;
          break;
        }
      }
      res.render('profile/showWarlock', { spellbook: spellbook, warlockMax: spellMax });
    } else {
      res.render('profile/showSpellbook', { spellbook: spellbook });
    }
  })
})

router.get('/spellbook/:id/edit', loggedIn, (req, res)=>{
  db.spellbook.findOne({
    where: {id: req.params.id},
    include: [db.characterclass, db.spell]
  }).then(spellbook=>{
    db.characterclass.findAll({order: ['id']}).then(classes=>{
      res.render('profile/edit', { spellbook: spellbook, classes: classes })
    })
  })
})

router.put('/spellbook', loggedIn, (req, res)=>{
  db.characterclass.findOne({ where: { name: req.body.characterclass } }).then(cClass=>{
    // Once the character class is found, we can update the spellbook with the foreign key
    db.spellbook.update({
      name: req.body.name,
      level: req.body.level,
      characterclass: cClass.id 
    }, {
      where: { id: req.body.spellbookId },
      returning: true,
      plain: true
    }).then(updateArray=>{
      console.log(`${updateArray[1].name} was updated!` .green);
      res.redirect(`/profile/spellbook/${updateArray[1].id}`);
    })
  })
})

router.delete('/spellbook', loggedIn, (req, res)=>{
  db.spellbook.destroy({
    where: { id: req.body.spellbookId }
  }).then(deletedSpellbook=>{
    res.redirect('/profile');
  }).catch(err=>{
    console.log(`There's an error deleting!` .red);
    console.log(err);
  })
})

router.get('/admin', isAdmin, (req, res) => {
  res.render('profile/admin');
});

module.exports = router;