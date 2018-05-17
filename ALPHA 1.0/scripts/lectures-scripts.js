
//Global variables
var lectures = {};

//Classes
function Author(name, info, image) {
  this.name = name;
  this.info = info;
  this.image = image;
}
function Lectures(title, info, author) {
  this.title = title;
  this.info = info;
  this.author = author;
}

//Events
function windowLoaded(event) {
  loadLectures();

  loadLecture(window.location.hash.substr(1));
}

function lectureSelected(event) {
  console.log(event.target.value);
  loadLecture(event.target.value);
}

//Functions
function loadLectures() {
  lectures["Palestra_1"] = new Lectures("Palestra 1",
                                        "Informação da palestra 1",
                                        new Author( "Palestrante 1",
                                                    "Sobre o palestrante 1",
                                                    "http://bcc.ime.usp.br/encontro/images/12.c39972b8.jpg"));

  lectures["Palestra_2"] = new Lectures("Palestra 2",
                                        "Informação da palestra 2",
                                        new Author( "Palestrante 2",
                                                    "Sobre o palestrante 2",
                                                    "http://bcc.ime.usp.br/encontro/images/13.3b1aca1b.jpg"));
}

function loadLecture(hash) {
  var lectureSelector = document.getElementById("lect-slct");
  var lectureTitle = document.getElementById("lect-ttl");
  var lectureInfo = document.getElementById("lect-info");
  var lectureAuthorName = document.getElementById("lect-auth-nm");
  var lectureAuthorInfo = document.getElementById("lect-auth-info");
  var lectureAuthorImage = document.getElementById("lect-auth-img");

  lectureSelector.value = hash;
  lectureTitle.innerHTML = lectures[hash].title;
  lectureInfo.innerHTML = lectures[hash].info;
  lectureAuthorName.innerHTML = lectures[hash].author.name;
  lectureAuthorInfo.innerHTML = lectures[hash].author.info;
  lectureAuthorImage.url = lectures[hash].author.image;

  window.location.hash = hash;
}

//Settings
window.addEventListener("load", windowLoaded);