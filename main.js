(function() {

var nav = document.getElementById('nav');
var mainSections = document.querySelectorAll('#content > section');

function scrollToTop() {
  setTimeout(function() {
    window.scroll(0, 0);
  }, 0);
}

function getInitialSection() {
  return (window.location.hash.indexOf('#') > -1) ?
          window.location.hash.replace(/#/, '') :
          'about';
}

function loopSections(cb) {
  for(var i=0, l=mainSections.length; i<l; i++){
    cb(mainSections[i]);
  }
}

function setSectionClassIf(section, condition) {
  section.className = 'out-of-view ' + (condition ? 'right' : 'left');
}

function setupSections() {
  var initialSection = getInitialSection(),
      foundInitial = false;

  loopSections(function(section) {
    if(section.id === initialSection) {
      foundInitial = true;
    } else {
      setSectionClassIf(section, foundInitial);
    }
  });
}

function navHandler(ev) {
  if(ev.target.tagName.toLowerCase() === 'a'){

    var targetParts = ev.target.href.match(/#(.*)/),
        targetId = (targetParts.length > 0) ? targetParts[1] : null,
        foundTarget = false;

    loopSections(function(section) {
      if(section.id === targetId){
        foundTarget = true;
        section.className = '';
      } else {
        setSectionClassIf(section, foundTarget);
      }
    });

    scrollToTop();
  }
}

nav.addEventListener('click', navHandler, false);
setupSections();
scrollToTop();

}());