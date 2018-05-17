
//Global variables
var isWindowScrolledLatent = false;

//Events
function windowScrolled(event) {

  if (isWindowScrolledLatent || window.innerWidth < 1220) return;

  var scrollTop = window.pageYOffset;

  var body = document.body;
  var html = document.documentElement;
  var totalHeight = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

  var windowHeight = window.innerHeight;

  setHTMLBackground(scrollTop, totalHeight - windowHeight);
  setMainHeaderHeight(scrollTop);

  isWindowScrolledLatent = true;

  setTimeout(function () {
    isWindowScrolledLatent = false
  }, 5);
}

//Functions
function setHTMLBackground(scrollTop, windowHeight) {
  var html = document.documentElement;

  var lightBlue = [25, 215, 251];
  var blue = [30, 99, 239];
  var darkBlue = [12, 72, 126];

  var ratio = scrollTop / windowHeight;
  var top = [ Math.floor(lightBlue[0] * (1 - ratio) + blue[0] * (ratio)),
              Math.floor(lightBlue[1] * (1 - ratio) + blue[1] * (ratio)),
              Math.floor(lightBlue[2] * (1 - ratio) + blue[2] * (ratio))];
  var bottom = [Math.floor(darkBlue[0] * (ratio) + blue[0] * (1 - ratio)),
                Math.floor(darkBlue[1] * (ratio) + blue[1] * (1 - ratio)),
                Math.floor(darkBlue[2] * (ratio) + blue[2] * (1 - ratio))];

  html.style.background = "url(styles/images/connections-white.png) 400px/400px repeat, "
    + "linear-gradient(rgb(" + top[0] + ", " + top[1] + ", " + top[2] + "), " +
    + "rgb(" + bottom[0] + ", " + bottom[1] + ", " + bottom[2] + ")) fixed";
  html.style.backgroundPositionY = ((scrollTop / 3) % 800) + "px, " + 0;
}

function setMainHeaderHeight(scrollTop) {
  var mainHeader = document.getElementById("main-head");

  if (scrollTop >= 60)
    mainHeader.style.height = 40 + "px";
  else if (scrollTop >= 40)
    mainHeader.style.height = (60 - (scrollTop - 40)) + "px";
  else
    mainHeader.style.height = 60 + "px";
}

//Settings
window.addEventListener("scroll", windowScrolled);