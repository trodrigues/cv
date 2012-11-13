(function() {

var nav = document.getElementById('nav');
var mainSections = document.querySelectorAll('#content > section');

function getInitialSection() {
  return (window.location.hash.indexOf('#') > -1) ?
          window.location.hash.replace(/#/, '') :
          'about';
}

function setupSections() {
  var initialSection = getInitialSection(),
      foundInitial = false;

  for(var i=0, l=mainSections.length; i<l; i++){
    if(mainSections[i].id === initialSection) {
      foundInitial = true;
    } else {
      mainSections[i].className = 'out-of-view ' + (foundInitial ? 'right' : 'left');
    }
  }
}

function navHandler(ev) {
  if(ev.target.tagName.toLowerCase() === 'a'){
  }
}

nav.addEventListener('click', navHandler, false);
setupSections();

}());