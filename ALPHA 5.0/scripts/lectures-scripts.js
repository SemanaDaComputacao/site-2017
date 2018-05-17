
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
  var lectureImage = document.getElementById("lecture-image");
  var lectureTitle = document.getElementById("lecture-title");
  var lectureInfo = document.getElementById("lecture-info");
  var lectureAuthor = document.getElementById("lecture-author");
  var lectureAuthorName = document.getElementById("lecture-author-name");
  var lectureAuthorInfo = document.getElementById("lecture-author-info");
  var lectureAuthorImage = document.getElementById("lecture-author-image");
  var lectureSelect = document.getElementById("lecture-select");

  if (lectures.hasOwnProperty(lecture)) {
    lectureImage.style.background = "url(" + lectures[lecture].image + ") center/cover";

    lectureTitle.innerHTML = lecture;
    lectureTitle.parentElement.style.display = null;

    lectureInfo.innerHTML = lectures[lecture].info;
    lectureInfo.style.display = null;

    lectureAuthor.style.display = null;

    lectureAuthorName.innerHTML = lectures[lecture].author.name;

    lectureAuthorInfo.innerHTML = lectures[lecture].author.info;

    lectureAuthorImage.style.background = "url(" + lectures[lecture].author.image + ") center/cover";
    
    lectureSelect.value = lecture;

    window.location.hash = lecture;
  }
  else {
    lectureImage.style.backgroundImage = null;

    lectureTitle.parentElement.style.display = "none";

    lectureInfo.style.display = "none";

    lectureAuthor.style.display = "none";

    lectureAuthorImage.style.backgroundImage = null;

    window.location.hash = window.location.href.split("#")[0];
  }
}

//Settings
window.addEventListener("load", windowLoaded);