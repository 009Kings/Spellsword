var showSpell = function() {

  var STATE = {

    spell: SPELL,
    
  }

  function init() {
    // Check if there is a user, then if so, add some stuff to the state
    STATE.user = USER;
    if (STATE.user) {
      STATE.spellbooks = {
        all: SPELLBOOKS,
        relevant: RELEVANT_SPELLBOOKS
      }
    }

    renderSpell(STATE.spell, 'spell-container');
  }

  function renderSpell(spell, idToRenderTo) {
    var container = document.getElementById(idToRenderTo);

    var titleContainer = document.createElement('div');
    container.appendChild(titleContainer);

    // create Title (1)
    var title = document.createElement('h1');
    title.classList = "f3 f1-ns ttu mv0 pt3 pt2-ns dark-gray";
    title.textContent = spell.name;
    titleContainer.appendChild(title);

    // create 'level # School' (ritual)
    var subtitle = document.createElement('h3');
    subtitle.classList = "f3 gray fw5 mv1";
    var level = spell.level === 0 ? `${spell.school.name} Cantrip` : `Level ${spell.level} ${spell.school.name}`;
    level = spell.ritual ? level + ' (ritual)' : level;
    subtitle.textContent = level;
    titleContainer.appendChild(subtitle);

    // add classes
    var classes = document.createElement('p');
    classes.classList = 'f5 moon-gray i mt0';

    var spellClasses = spell.characterclasses.map(cClass=>cClass.name);
    classes.textContent = spellClasses.join(', ');
    titleContainer.appendChild(classes);

    var basics = document.createElement('div');
    container.appendChild(basics);

    // <strong>Casting Time:</strong> casting time
    var dlCasting = createDl('Casting Time: ', spell.casting_time, null);
    
    basics.appendChild(dlCasting);
    
    // <strong>Range:</strong> range
    var dlRange = createDl('Range: ', spell.range, null);
    
    basics.appendChild(dlRange);
    
    // <strong>Components:</strong> components (materials)
    var dlComponents = createDl('Components: ', spell.components, spell.material);
    
    basics.appendChild(dlComponents);

    // <strong>Duration:</strong> duration || concentration, up to duration
    var dlDuration = createDl('Duration: ', spell.duration, spell.concentration);

    basics.appendChild(dlDuration);

    // render Desc
    var description = parseDesc(spell.desc);
    container.appendChild(description);
    
  }

  function createDl(dtContent, ddContent, additions) {
    var dl = document.createElement('dl');
    dl.classList = 'f6 lh-title mv2';

    var dt = document.createElement('dt');
    dt.classList = 'dib b mr1';
    dt.textContent = dtContent;

    var dd = document.createElement('dd');
    dd.classList = 'dib ml0 gray';
    if (additions) {
      dd.textContent = typeof additions === 'string' ? `${ddContent} ${additions}` : `Concentration, up to ${ddContent}`;
    } else {
      dd.textContent = ddContent;
    }
    
    dl.appendChild(dt);
    dl.appendChild(dd);

    return dl;
  }

  function parseDesc(descArray) {
    var descDiv = document.createElement('div');

    for (let i = 0; i < descArray.length; i++) {
      var p = document.createElement('p');
      if (descArray[i][0] === '*') {
        var bolded = document.createElement('span');
        bolded.classList = 'fw7 mr1';
        bolded.textContent = descArray[i].substr(1);
        p.appendChild(bolded);

        var desc = document.createElement('span');
        desc.textContent = descArray[i+1].substr(1);
        p.appendChild(desc);
        i++;
      } else {
        p.textContent = descArray[i];
      }
      descDiv.appendChild(p);
    }

    return descDiv;
  }

  document.addEventListener('DOMContentLoaded', init);

}();