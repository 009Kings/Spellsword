// Testing out this "old smuggler trick" of putting everything into a function that you immediately call to avoid double naming and publishing private variables
var spellIndex = function(){ 
  // Pass me a warning if spells is undefined
  console.assert(SPELLS !== undefined, 'Spells are not defined');

  // Take what I want from the SPELLS JSON
  function processSpells(spells){
    return spells.map((spell)=> {
      return {
        id: spell.id,
        name: spell.name,
        level: spell.level,
        classes: spell.characterclasses.map(c=>c.name),
        school: spell.school.name
      }
    });
  }

  // STATE of the spellsIndex nation
  var STATE = {
    // listing all the spells
    spells: processSpells(SPELLS),
    characterClasses: C_CLASSES,

    // the search parameters
    filterParams: {nameContains: ''},
  
    // Dom bits
    handles: {
      // i.e. name filters and check boxes and radio buttons oh my
      inputs: {},
      // Right now, just the spell-list div
      outputs: {}
    }
  };

  // Lets initialise this shit!
  function init(){
    // Load the handles
    STATE.handles.inputs.byClassList = document.querySelector('.toggle-hidden');
    STATE.handles.inputs.nameContains = document.getElementById('name-contains');
    STATE.handles.outputs.spellListWrapper = document.getElementById('spell-list');

    // change the filter parameters to match the input in the search field
    STATE.filterParams.nameContains = STATE.handles.inputs.nameContains.value;

    // input bondage
    STATE.handles.inputs.byClassList.addEventListener('click', toggleFindByClass);
    STATE.handles.inputs.nameContains.addEventListener('input', tick);

    // Run tick() so that the page inits with the whole list
    tick();
  }

  function toggleFindByClass() {
    var classes = document.getElementById('class-list');
    if (classes.className.includes('hidden')) {
      classes.classList.remove('hidden');
    } else {
      classes.classList.add('hidden');
    }
  }

  function tick() {
    update();
    render();
  }

  function update() {
    // read the current filter input
    var nameContains = STATE.handles.inputs.nameContains.value;
    // Check if it works
    console.log(`Filter changed to ${nameContains}`);
    STATE.filterParams.nameContains = nameContains;
  }

  function render() {
    // Make a static list by class
    // List out the spellcasting classes
    var navList = document.createElement('div')
    navList.classList = 'db dtc-l v-mid w-100 w-80-l tc tl-l';
    for (let i = 0; i < STATE.characterClasses.length; i++) {

      var link = document.createElement('a');
      link.classList = 'link dim dark-gray f6 f5-l dib mr3 mr3-l';
      var linkText = document.createTextNode(STATE.characterClasses[i].name);
      link.appendChild(linkText);
      link.href = `/spells/byClass/${STATE.characterClasses[i].name}`;

      navList.appendChild(link);
    }
    document.getElementById('class-list').appendChild(navList);

    // Burn it down
    var container = STATE.handles.outputs.spellListWrapper;
    container.innerHTML = '';

    // Buit it back up
    var filteredSpells = getFilteredSpells();
    filteredSpells.forEach(spell=>{
      var rederedSpell = renderSpellCard(spell);
      container.appendChild(rederedSpell);
    });
    
  }

  function getFilteredSpells() {
    return STATE.spells.filter(spell=>{
      // move everything to lowercase so there's no case sensitivity
      var lowerName = spell.name.toLowerCase();
      var lowerNameFilter = STATE.filterParams.nameContains.toLowerCase();
      return lowerName.includes(lowerNameFilter);
    });
  }

  function renderSpellCard(spell) {
    // First comes the article
    var spellList = document.createElement('article');
    // This is what Tachyons told me to do
    spellList.className = "center shadow-4bg-light-blue mw5 mw6-ns br3 ba b--black-10 mv3";

    // Then comes the title
    var title = document.createElement('h1');
    title.className = 'f4 bg-blue br3 br--top black-60 mv0 pv2 ph3';
    var link = document.createElement('a');
    link.className= "link dim near-black"
    link.href = `/spells/${spell.id}`;
    link.textContent = spell.name;
    title.appendChild(link);
    spellList.appendChild(title);

    // Then comes the content with a two iterator forEach
    var cardBody = document.createElement('div');
    cardBody.className = "pa3 bt b--black-10";

    ['level', 'school'].forEach(key=>{
      var dList = document.createElement('dl');
      dList.className = 'f6 lh-title mv2 dib pr2';

      var dTitle = document.createElement('dt');
      dTitle.className = 'dib b pr2';
      var displayName = key.charAt(0).toUpperCase() + key.slice(1)
      dTitle.textContent = displayName;
      dList.appendChild(dTitle);

      var dDesc = document.createElement('dd');
      dDesc.className = 'dib ml0 dark-gray pr2';
      dDesc.textContent = spell[key] === 0 ? 'Cantrip' : spell[key];
      dList.appendChild(dDesc);

      cardBody.appendChild(dList);
    });
    
    // Now for the Classes
    var schoolSection = document.createElement('dl');
    schoolSection.className = 'f6 lh-title mv2 dib pr2';
    
    var schoolTitle = document.createElement('dt');
    schoolTitle.className = 'dib b pr2';
    schoolTitle.textContent = spell.classes > 1 ? 'Schools' : 'School';
    schoolSection.appendChild(schoolTitle);
    
    var schoolDesc = document.createElement('dd');
    schoolDesc.className = 'dib ml0 dark-gray pr2';
    schoolDesc.textContent = spell.classes.join(', ');
    schoolSection.appendChild(schoolDesc);
    
    cardBody.appendChild(schoolSection);

    // Let the body hit the floor (of the spellList);
    spellList.appendChild(cardBody);

    return spellList;
  }
  
  document.addEventListener('DOMContentLoaded', init)
}();
  