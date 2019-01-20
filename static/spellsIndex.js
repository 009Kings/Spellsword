
// List out the spellcasting classes
for (let i = 0; i < cClasses.length; i++) {
  var link = document.createElement('a');
  var linkText = document.createTextNode(cClasses[i].name);
  link.appendChild(linkText);
  link.href = `/spells/byClass/${cClasses[i].name}`;
  
  document.getElementById('by-class').appendChild(link);
}

// List out the Levels
for (let i = 0; i <= 9; i++) {
  console.log(`Level ${i}`);
  var link = document.createElement('a');
  var text = i === 0 ? 'Cantrips' : `Level ${i}`;
  var linkText = document.createTextNode(text);
  link.appendChild(linkText);
  document.getElementById('by-level').appendChild(link);
}

// By School
for (let i = 0; i < schools.length; i++ ) {
  console.log(schools[i].name);
  var link = document.createElement('a');
  var linkText = document.createTextNode(schools[i].name);
  link.appendChild(linkText);
  link.href = `/spells/bySchool/${schools[i].name}`;    
  document.getElementById(`by-school`).appendChild(link);
}

// Now for da spellz
spells.forEach(spell=>{
  // create spell-card div (1)
  var card = document.createElement('div');
  card.classList.add("spell-card");
  
  // create spell-card title with link (1A)
  var spellLink = document.createElement('a');
  var linkText = document.createTextNode(spell.name);
  spellLink.appendChild(linkText);
  spellLink.href = `/spells/${spell.id}`

  card.appendChild(link);
  
  // create spell-card body (1B)
  
  // create level: (1Bi)
  
  // create school: (1Bii)
  
  // create class(es): (1Biii)
  
  // Add the complete card to the spell-list
  document.getElementById('spell-list').appendChild(card);
})
  