var profile = function(){
  // Gimme some errors is sth is undefined
  console.assert(USER !== undefined, 'USER is not defined');
  console.assert(USER.spellbooks !== undefined, 'USER.spellbooks is not defined');

  // What's a happenin' on the page
  var STATE = {
    user: USER,
    spellbooks: USER.spellbooks,
    createModalHidden: true,
    spellbookNum: USER.spellbooks.length,

    handles: {
      inputs: {},
      outputs: {}
    }
  }

  function init() {
    // Handling
    STATE.handles.inputs.toggleCreate = document.getElementById('open-create');
    STATE.handles.inputs.toggleCreateHide = document.getElementById('close-create');
    STATE.handles.outputs.spellbookContainer = document.getElementById('spellbook-container');
    STATE.handles.outputs.numOfSpellbooks = document.getElementById("spellbook-num");

    // Add an event listener to things that need an event listener
    STATE.handles.inputs.toggleCreate.addEventListener('click', ()=>{
      toggleHide('create-spellbook', STATE.createModalHidden);
      STATE.createModalHidden = false;
    })
    STATE.handles.inputs.toggleCreateHide.addEventListener('click', ()=>{
      toggleHide('create-spellbook', STATE.createModalHidden);
      STATE.createModalHidden = true;
    })

    tick();
  }
  
  function tick() {
    update();
    render();
  }

  function update() {
    STATE.spellbooks = STATE.user.spellbooks;
    STATE.spellbooks.forEach(spellbook=>{
      spellbook.className = addClassName(spellbook);
    })
  }

  function render() {
    // Render the number of spellbooks
    var numOfSpellbooks = STATE.spellbookNum + (STATE.spellbookNum===1 ? " Spellbook" : " Spellbooks")
    STATE.handles.outputs.numOfSpellbooks.textContent = `You currently have ${numOfSpellbooks}`

    // Make the list of Spellbooks!
    var container = STATE.handles.outputs.spellbookContainer;
    container.innerHTML = '';

    STATE.spellbooks.forEach(spellbook=>{
      var renderedSpellbook = renderSpellbook(spellbook);
      container.appendChild(renderedSpellbook);
    })
  }

  function addClassName(spellbook) {
    return CLASSES[spellbook.characterclassId -1].name
  }

  function toggleHide(idName, hiddenState) {
    var elemToHide = document.getElementById(idName);
    
    if (hiddenState) {
      elemToHide.classList.remove('hidden');
    } else {
      elemToHide.classList.add('hidden');
    }
  }

  function renderSpellbook(spellbook) {
    var spellbookCard = document.createElement('article');
    spellbookCard.className = 'mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10';

    var innerCardDiv = document.createElement('div');
    innerCardDiv.className = 'tc';
    spellbookCard.appendChild(innerCardDiv);

    var character = document.createElement('h1');
    character.className = 'f3 mb2'
    var link = document.createElement('a');
    link.className = 'link dark-green';
    link.href = `/profile/spellbook/${spellbook.id}`;
    link.textContent = spellbook.name;
    character.appendChild(link);
    innerCardDiv.appendChild(character);
    
    // TODO: name docs based on classes so icon.src = `../assets/${spellbook.characterclass.name}`
    var icon = document.createElement('img');
    icon.className = 'br-100 h4 w4 dib ba b--black-05 pv2';
    icon.src = 'http://placekitten.com/150/150';
    icon.alt = 'Placeholder image of a kitten';
    innerCardDiv.appendChild(icon);
    
    var summary = document.createElement('h2');
    summary.className = 'f5 fw4 gray mt0';
    summary.textContent = `Level ${spellbook.level}`;
    innerCardDiv.appendChild(summary);
    
    return spellbookCard;
  }

  document.addEventListener('DOMContentLoaded', init);
}();