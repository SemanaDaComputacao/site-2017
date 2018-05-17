
//Global variables

//Classes

//Events
function windowLoaded(event) {

  for (var lecture in lectures) {
    if (lectures.hasOwnProperty(lecture)) {
      addLecture(lecture);
    }
  }
}

//Functions
function addLecture(lecture) {
  var content = document.getElementById("content");


  var lectureDiv = document.createElement("div");
  
  lectureDiv.className = "lecture-info-theme mdl-color--light-blue-A700";


  var lectureTitle = document.createElement("h1");
  
  lectureTitle.className = "typography--montserrat-black mdl-typography--text-center mdl-typography--text-uppercase";
  lectureTitle.innerHTML = lecture;

  var lectureInfo = document.createElement("div");
  
  lectureInfo.className = "lecture-info-text typography--montserrat";
  lectureInfo.innerHTML = lectures[lecture].info;
  lectureInfo.style.display = null;

  var lectureAuthor = document.createElement("div");

  lectureAuthor.className = "lecture-info-text lecture-info-author typography--montserrat mdl-grid";
  lectureAuthor.style.display = null;

  var lectureAuthorImage = document.createElement("div");

  lectureAuthorImage.className = "mdl-card mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-shadow--3dp";
  lectureAuthorImage.style.background = lectures[lecture].author.image;

  var lectureAuthorTextWrapper = document.createElement("div");

  lectureAuthorTextWrapper.className = "mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet";

  var lectureAuthorName = document.createElement("h2");

  lectureAuthorName.className = "typography--montserrat-black mdl-typography--text-center mdl-typography--text-uppercase";
  lectureAuthorName.innerHTML = lectures[lecture].author.name;

  var lectureAuthorInfo = document.createElement("div");

  lectureAuthorInfo.innerHTML = lectures[lecture].author.info;

  content.appendChild(lectureDiv);
  lectureDiv.appendChild(lectureTitle);
  content.appendChild(lectureInfo);
  content.appendChild(lectureAuthor);
  lectureAuthor.appendChild(lectureAuthorImage);
  lectureAuthor.appendChild(lectureAuthorTextWrapper);
  lectureAuthorTextWrapper.appendChild(lectureAuthorName);
  lectureAuthorTextWrapper.appendChild(lectureAuthorInfo);
}

//Settings
window.addEventListener("load", windowLoaded);