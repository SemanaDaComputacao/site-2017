
//Global variables

//Classes

//Events
function windowLoaded(event) {
  var lectureSelect = document.getElementById("lecture-select");

  for (var lecture in lectures) {
    if (lectures.hasOwnProperty(lecture)) {
      var option = document.createElement("option");

      option.value = lecture;
      option.innerHTML = lecture;

      lectureSelect.appendChild(option);
      console.log(option.innerHTML);
    }
  }

  loadLecture(decodeURIComponent(window.location.hash.substr(1)));
}

function lectureSelected(event) {
  console.log(event.target.value);
  loadLecture(event.target.value);
}

//Functions
function loadLecture(lecture) {
  var lectureTitle = document.getElementById("lecture-title");
  var lectureInfo = document.getElementById("lecture-info");
  var lectureAuthor = document.getElementById("lecture-author");
  var lectureAuthorName = document.getElementById("lecture-author-name");
  var lectureAuthorInfo = document.getElementById("lecture-author-info");
  var lectureAuthorImage = document.getElementById("lecture-author-image");
  var lectureSelect = document.getElementById("lecture-select");

  if (lectures.hasOwnProperty(lecture)) {
    lectureTitle.innerHTML = lecture;
    lectureTitle.parentElement.style.display = null;

    lectureInfo.innerHTML = lectures[lecture].info;
    lectureInfo.style.display = null;

    lectureAuthor.style.display = null;

    lectureAuthorName.innerHTML = lectures[lecture].author.name;

    lectureAuthorInfo.innerHTML = lectures[lecture].author.info;

    lectureAuthorImage.style.background = lectures[lecture].author.image;
    
    lectureSelect.value = lecture;

    window.location.hash = encodeURIComponent(lecture);
  }
  else {
    lectureInfo.style.display = "none";

    lectureAuthor.style.display = "none";

    lectureAuthorImage.style.backgroundImage = null;
  }
}

//Settings
window.addEventListener("load", windowLoaded);