
// List out the spellcasting classes
for (let i = 0; i < cClasses.length; i++) {
  var navList = document.createElement('li')

  var link = document.createElement('a');
  var linkText = document.createTextNode(cClasses[i].name);
  link.appendChild(linkText);
  link.href = `/spells/byClass/${cClasses[i].name}`;

  navList.appendChild(link);
  
  document.getElementById('by-class').appendChild(navList);
}


// Now for da spellz
spells.forEach(spell=>{
  // create spell-card div (1)
  var card = document.createElement('div');
  card.classList.add('spell-card');
  
  // create spell-card title with link (1A)
  var cardTitle = document.createElement('div');
  cardTitle.classList.add('card-title');

  var spellLink = document.createElement('a');
  var linkText = document.createTextNode(spell.name);
  spellLink.appendChild(linkText);
  spellLink.href = `/spells/${spell.id}`

  cardTitle.appendChild(spellLink);
  card.appendChild(cardTitle);
  
  // create spell-card body (1B)
  var spellInfo = document.createElement('div');
  spellInfo.classList.add('card-body');

  // create level: (1Bi)
  var levelInfo = document.createElement('p');
  levelInfo.textContent = spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`;

  spellInfo.appendChild(levelInfo);

  // create school: (1Bii)
  var schoolInfo = document.createElement('p');
  schoolInfo.textContent = `School of ${spell.school.name}`;

  spellInfo.appendChild(schoolInfo);
  
  // create class(es): (1Biii)
  var classInfo = document.createElement('p');
  if (spell.characterclasses.length > 1) {
    classNames = spell.characterclasses.map(cClass=>{
      return cClass.name;
    })
    classInfo.textContent = classNames.join(', ');
  } else {
    classInfo.textContent = spell.characterclasses[0].name;
  }

  spellInfo.appendChild(classInfo);

  card.appendChild(spellInfo);
  
  // Add the complete card to the spell-list
  document.getElementById('spell-list').appendChild(card);
})
  