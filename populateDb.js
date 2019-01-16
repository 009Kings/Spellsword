var async = require('async');
var db = require('./models');
var request = require('request');

// TODO: figure out why ' is coming out at â€™ (UTF-8 issue, not sure how to fix it)


// Populates schools
request('http://www.dnd5eapi.co/api/magic-schools', (error, response, body)=>{
  if(error || response.statusCode !=200){
    console.log("Bad news bears! There's been an error in Request for the magic schools");
    console.log(error);
  } else {
    var results = JSON.parse(body);
    var schools = results.results;
    async.forEach(schools, (school, done)=>{
      request(school.url, (error, response, body)=>{
        if(error || response.statusCode !=200){
          console.log("Bad news bears! There's been an error in the individual Request 2");
          console.log(error);
        } else {
          var schoolDeets = JSON.parse(body);
          db.school.findOrCreate({
            where: {id: schoolDeets.index},
            defaults: {
              name: schoolDeets.name,
              desc: schoolDeets.desc
            }
          }).spread((newSchool, created)=>{
            if (created) {
              console.log("Behold, the rise of the School of " + newSchool.name);
            } else {
              console.log("Problem in creating school")
            }
          }).then(done).catch(err=>{
            console.log("THERE'S A BIG FUCKING ERROR");
            console.log(err);
          });
        }
      })
    }, (err)=>{
      if(err){
        console.log("Rut ro, something happened after all the things were iterated on in Schools");
        console.log(err);
      } else {
        console.log("first async Done!");
      }
    })
  }
})

// Calls the spell Api, creates an array of the spell objects.
request('http://www.dnd5eapi.co/api/spells', (error, response, body)=>{
  if(error || response.statusCode !=200){
    console.log("Bad news bears! There's been an error in Request for spells");
    console.log(error);
  } else {
    var results = JSON.parse(body);
    var spells = results.results;
    // Take each spell Item, then request the URL to get db information
    async.forEach(spells, (spell, done)=>{
      request(spell.url, (error, response, body)=>{
        if(error || response.statusCode !=200){
          console.log("Bad news bears! There's been an error in the individual Request 2");
          console.log(error);
        } else {
          var spellDeets = JSON.parse(body);
          // Changes the formatting of some of the API call information to a more pallatable db type
          // TODO write function to save desc as markdown or html
          var desc = spellDeets.desc.join('|');
          var higherLvl = spellDeets.higher_level ? spellDeets.higher_level.join('  ') : undefined;
          var components = spellDeets.components.join(',');
          spellDeets.ritual = spellDeets.ritual === "yes";
          spellDeets.concentration = spellDeets.concentration === "yes";
          schoolId = spellDeets.school.url.slice(-1);
          console.log(schoolId);

          db.spell.findOrCreate({
            where: {id: spellDeets.index},
            defaults: {
              name: spellDeets.name,
              desc: desc,
              higher_level: higherLvl,
              page: spellDeets.page,
              range: spellDeets.range,
              components: components,
              material: spellDeets.material,
              ritual: spellDeets.ritual,
              duration: spellDeets.duration,
              concentration: spellDeets.concentration,
              casting_time: spellDeets.casting_time,
              level: spellDeets.level,
              schoolId: parseInt(schoolId, 10),
            }
          }).spread((newSpell, created)=>{
            if (created){
              console.log("You did a bangup job creating ", newSpell.name)
            } else {
              console.log("Spell not created");
            }
          }).then(done).catch(err=>{
            console.log("THERE'S A BIG FUCKING ERROR");
            console.log(err);
          });
        }
      })
    }, (err)=>{
      if(err){
        console.log("Rut ro, something happened after all the things were iterated on! 4");
        console.log(err);
      } else {
        console.log("second async Done!");
      }
    })
  }
})
