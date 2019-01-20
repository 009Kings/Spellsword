var colors = require('colors');
var db = require('./models');


// Render Desc in a way that doesn't suck!
db.spell.findOne({
  where: { id: 5 }, 
  include: [db.school, db.characterclass]
}).then((spell)=>{
  console.log(`${spell.name}` .white);
  console.log(`${spell.casting_time}` .gray);
  console.log(`${spell.range}` .gray);
  console.log(`${spell.components}` .gray);
  console.log(`${spell.duration}` .gray);
  for (let i = 0; i < spell.desc.length; i++) {
    if (spell.desc[i][0] === "*") {
      let subHeader = spell.desc[i].substr(1);
      let explanation = spell.desc[i+1].substr(1);
      console.log(`${subHeader}` .green.bold);
      console.log(`${explanation}` .cyan);
      i++;
    } else {
      console.log(`${spell.desc[i]}` .blue);
    }
  }
}).catch(err=>console.log(`${err}` .red));