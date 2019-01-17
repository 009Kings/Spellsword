var colors = require('colors');
var db = require('../models');
var express = require("express");
var request = require('request');
var router = express.Router();

// Include a reference to my middleware
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');

router.get('/', loggedIn, (req, res) => {
  db.user.findOne({
    where: {email: req.user.email},
    include: [db.spellbook]
  }).then(user=>{
    //console.log(user.spellbooks .magenta)
    res.render('profile/profile', { user: user });
  }).catch(err=>{
    console.log(`Bad news bears, there's an error!` .magenta);
    console.log(err.message());
  })
});

router.get('/spellbook/new', loggedIn, (req, res)=>{
  res.render('profile/create');
})

router.post('/add', loggedIn, (req, res)=>{
  request(`http://www.dnd5eapi.co/api/classes/${req.body.characterClass.toLowerCase()}/level/${req.body.level}`, (error, response, body)=>{
    if(error || response.statusCode !=200){
      console.log(`Bad news bears! There's been an error in Request for the class ${i}` .magenta);
      console.log(error);
    } else {
      results = JSON.parse(body);
      
      // Find the class to create a correlation
      db.characterClass.findOne({ where: { name: req.body.characterClass }}).then((characterClass)=>{

        // Create a Spellbook with the character class reference!
        db.spellbook.create({
          name: req.body.name,
          level: req.body.level,
          userId: req.user.id,
          characterClassId: characterClass.id,
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
        }).catch(error=>{
          console.log('Check out that error creating a spellbook' .red);
          console.log(error.message());
        })
      }).catch(error=>{
        console.log('Check out that error finding a character class!' .red);
        console.log(error.message());
      })
    }
  })
  res.redirect('/profile');
})

router.get('/spellbook/:id', loggedIn, (req, res)=>{
  res.render('profile/showSpellbook');
})


router.get('/admins', isAdmin, (req, res) => {
  res.render('profile/admin');
});

module.exports = router;