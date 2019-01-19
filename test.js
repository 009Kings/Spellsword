var async = require('async');
var colors = require('colors');
var db = require('./models');
var request = require('request');

{
  "You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one.",

  "Aquatic Adaptation.",
  
  " You adapt your body to an aquatic environment, sprouting gills and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed.",
  
  "Change Appearance.",
  
  " You transform your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and distinguishing characteristics, if any. You can make yourself appear as a member of another race, though none of your statistics change. You also canâ€™t appear as a creature of a different size than you, and your basic shape stays the same; if you're bipedal, you canâ€™t use this spell to become quadrupedal, for instance. At any time for the duration of the spell, you can use your action to change your appearance in this way again.",
  
  "Natural Weapons.",
  
  " You grow claws, fangs, spines, horns, or a different natural weapon of your choice. Your unarmed strikes deal 1d6 bludgeoning, piercing, or slashing damage, as appropriate to the natural weapon you chose, and you are proficient with your unarmed strikes. Finally, the natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it."
}

db.spell.findOne({where: { id: 5 }}).then(spell=>{
  console.log(`${spell.desc}` .magenta);
  cleanDesc(spell.desc);
  console.log(`${spell.desc}` .green);
})

cleanDesc = (arrayOfStrings)=>{
  arrayOfStrings.forEach((string, i) => {
    
    if (string[0] === " ") {
      var fancyString = "*" + arrayOfStrings[i-1];
      arrayOfStrings[i-1] = fancyString;
      var thisString = "|" + cleanString(string).substr(1);
      arrayOfStrings[i] = thisString;
    } else {
      arrayOfStrings[i] = cleanString(string);
    }
  });
}

cleanString = (string)=>{
  var regex = /â€™/gi;
  return string.replace(regex, "'");
}
