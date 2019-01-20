// Button Toggle
document.getElementById("form-shift").addEventListener("click", ()=>{
  var regularForm = document.getElementById("regular-add");
  var exceptionForm = document.getElementById("exception-add");
  var btn = document.getElementById("form-shift");

  if (exceptionForm.hasAttribute("class", "hidden")) {
    regularForm.setAttribute("class", "hidden");
    exceptionForm.removeAttribute("class", "hidden");
    btn.textContent = "Add a Regular Spell";
  } else {
    regularForm.removeAttribute("class", "hidden");
    exceptionForm.setAttribute("class", "hidden");
    btn.textContent = "Add Exception Spell";
  }
});

// create Title (1)
// create 'level # School' (ritual)
// <strong>Casting Time:</strong> casting time
// <strong>Range:</strong> range
// <strong>Components:</strong> components (materials)
// <strong>Duration:</strong> duration || concentration, up to duration
// render Desc
  // for (let i = 0; i < descArray.length; i++) {
    // if (p[i][0] === '*') { render it bold, include p[i+1], i++}
  // })