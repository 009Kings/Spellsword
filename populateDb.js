var async = require('async');
var colors = require('colors');
var db = require('./models');
var request = require('request');

// TODO: figure out why ' is coming out at â€™ (UTF-8 issue, not sure how to fix it)
cleanDesc = (arrayOfStrings) => {
  var sqeeky = arrayOfStrings.map((string, i) => {
    if (string[0] === " ") {
      var fancyString = "*" + arrayOfStrings[i-1];
      arrayOfStrings[i-1] = fancyString;
      var thisString = "|" + cleanString(string).substr(1);
      arrayOfStrings[i] = thisString;
    } else {
      arrayOfStrings[i] = cleanString(string);
    }
  });
  return sqeeky;
}

cleanString = (string)=>{
  var regex = /â€™/gi;
  return string.replace(regex, "'");
}

async.series([(callback)=>{
  // Populates Classes
  // TODO REFACTOR THIS
  for (let i = 1; i <= 12 ; i++) {
    request('http://www.dnd5eapi.co/api/classes/'+i, (error, response, body)=>{
      if(error || response.statusCode !=200){
        console.log(`Bad news bears! There's been an error in Request for the class ${i}` .magenta);
        console.log(error);
      } else {
        results = JSON.parse(body);
        spellClass = results.spellcasting ? true : false;

        // Create Spellcasting class
        db.characterclass.findOrCreate({
          where: {id: results.index}, 
          defaults: {
            name: results.name,
            spellcasting: spellClass,
            api_reference: 'http://www.dnd5eapi.co/api/classes/'+i
          }
        }).spread((newClass, created)=>{
          if (!created) {
            console.log(`There was a problem creating ${newClass.name}` .magenta);
          }
        }).catch(err=>{
          console.log(`Error in class creation!`);
          console.log(err .red);
        })
      } // End of the Request Else
    }); // End of Request
  } // End of For loop
  console.log(`Character Classes Created!` .white)
  callback(null, 'characterclasses')
}, // End of First Callback
(callback)=>{
  request('http://www.dnd5eapi.co/api/magic-schools', (error, response, body)=>{
    if(error || response.statusCode !=200){
      console.log("Bad news bears! There's been an error in Request for the magic schools" .magenta);
      console.log(error);
    } else {
      var results = JSON.parse(body);
      var schools = results.results;

      async.forEach(schools, (school, done)=>{
        request(school.url, (error, response, body)=>{
          if(error || response.statusCode !=200){
            console.log("Bad news bears! There's been an error in the individual Request 2" .magenta);
            console.log(error);
          } else {
            var schoolDeets = JSON.parse(body);
            var desc = cleanString(schoolDeets.desc);

            db.school.findOrCreate({
              where: {id: schoolDeets.index},
              defaults: {
                name: schoolDeets.name,
                desc: desc
              }
            }).spread((newSchool, created)=>{
              if (!created) {
                console.log(`School ${newSchool.name} was not created` .magenta)
              }
            }).then(()=>{
              done();
            });
          }
        })
      }, (err)=>{
        if(err){
          console.log(`Rut ro, something happened after all the things were iterated on in Schools` .magenta);
          console.log(err);
        } else {
          console.log("first async Done!" .white);
          console.log(`Magic school Creation complete` .white);
          callback(null, 'schools');
        }
      }) // End of async.foreach
    } // End of the Request Else
  }) // End of the Request
}, // End of the fist callback
(callback)=>{
  // Calls the spell Api, creates an array of the spell objects.
  request('http://www.dnd5eapi.co/api/spells', (error, response, body)=>{
    if(error || response.statusCode !=200){
      console.log("Bad news bears! There's been an error in Request for spells" .magenta);
      console.log(error);
    } else {
      var results = JSON.parse(body);
      var spells = results.results;
      
      // Take each spell Item, then request the URL to get db information
      async.forEach(spells, (spell, done)=>{
        request(spell.url, (error, response, body)=>{
          if(error || response.statusCode !=200){
            console.log("Bad news bears! There's been an error in the individual spell request" .magenta);
            console.log(error);
          } else {
            var spellDeets = JSON.parse(body);
            // Changes the formatting of some of the API call information to a more pallatable db type
            // TODO write function to save desc as markdown or html
            var higherLvl = spellDeets.higher_level ? spellDeets.higher_level.join('  ') : undefined;
            var components = spellDeets.components.join(',');
            spellDeets.ritual = spellDeets.ritual === "yes";
            
            async.waterfall([(callback)=>{
              cleanDesc(spellDeets.desc);
              callback(null, spellDeets.desc);
            }, (description, callback)=>{
                db.school.findOne({where: {name: spellDeets.school.name}}).then((school)=>{
                  if (!school) {
                    console.log(`could not find school ${spellDeets.school.name}`)
                  }
                  //Create the actual Spell
                  db.spell.findOrCreate({
                    where: {id: spellDeets.index},
                    defaults: {
                      name: spellDeets.name,
                      desc: description,
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
                      schoolId: school.id
                    }
                  }).spread((spell, created)=>{
                    spellDeets.classes.forEach(characterClass=>{
                      db.characterclass.findOne({
                        where: {name: characterClass.name}
                      }).then(characterClass=>{
                        spell.addCharacterclass(characterClass);
                      }).catch(err=>console.log(`Error in associating ${characterClass} and ${spell.name}` .red))
                    });
                    if (created){
                      console.log(`You did a bangup job creating ${spell.name}` .cyan)
                    } else {
                      console.log("Spell not created" .black);
                    }
                  }).then(()=>{
                    done();
                  });
                }).catch(err=>{
                  console.log(`Trouble finding the schoolId for ${spellDeets.name}` .magenta);
                  console.log(`${err}` .red);
                });
                callback(null, "done");
            }])
          }
        })
      }, (err)=>{
        if(err){
          console.log("Rut ro, something happened after all the things were iterated on!" .magenta);
          console.log(err);
        } else {
          console.log("second async Done!" .white);
          console.log(`Spells were created` .white)
          callback(null, 'spells');
        }
      }); // End of Async forEach
    } // End of Request else
  }); // End of the Request
}], // End of final series function and end of series function arrays 
(err, results)=>{
  console.log(`${results}` .green);
})