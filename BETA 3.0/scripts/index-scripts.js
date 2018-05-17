//Events
function windowLoaded(event) {
  var scheduleContent = document.getElementById("schedule-content");

  scheduleContent.innerHTML = schedule;
  
  setRowLinks();
}


//Methods
function setRowLinks(i) {
  var rowLinks = document.querySelectorAll(".js-row-link");

  for (var i = 0; i < rowLinks.length; i++) {
    var tbody = rowLinks[i];
    var a = tbody.querySelector("a");

    tbody.onclick = function () {
      location.href = a.href;
    }
  }
}


//Settings
window.addEventListener("load", windowLoaded);