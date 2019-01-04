document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function() {
  var currentYear = (new Date()).getFullYear();
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {
    yearRange: [1900, currentYear],
    selectMonths: true,
    today: "today",
    close: "Okay",
    closeOnSelect: false
  });
});

