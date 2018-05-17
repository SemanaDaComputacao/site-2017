
//Global variabes

//Classes

//Events

//Functions

//Settings



































//Global variables
var isWindowScrolledLatent = false;
var ctx;
var canvas;
var particles;

//Events
function windowLoaded(event) {
  canvas = document.getElementById("main-back");
  var body = document.body;
  var html = document.documentElement;

  canvas.width = body.offsetWidth;
  canvas.height = window.innerHeight;
  canvas.style.height = canvas.height + "px";

  ctx = canvas.getContext('2d');
  console.log(canvas);
  console.log(body.width);
/**
 * 
 */

partCnt = 150;
particles = []
for(var i = 0; i < partCnt; i++){
   particles[i] = {
      x: random_range(0, canvas.width),
      y: random_range(0, canvas.height),
      xSpeed: random_range(-2, 2),
      ySpeed: random_range(-2, 2),
      size: random_range(5, 20),
      range: random_range(50, 150)
   }
    
}

}

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

  // isWindowScrolledLatent = true;

  // setTimeout(function () {
  //   isWindowScrolledLatent = false
  // }, 5);
}

//Functions
function setHTMLBackground(scrollTop, windowHeight) {
  var html = document.documentElement;

  var lightBlue = [32, 66, 166];
  var blue = [29, 18, 113];
  var darkBlue = [21, 16, 64];

  var ratio = scrollTop / windowHeight;
  var top = [ Math.floor(lightBlue[0] * (1 - ratio) + blue[0] * (ratio)),
              Math.floor(lightBlue[1] * (1 - ratio) + blue[1] * (ratio)),
              Math.floor(lightBlue[2] * (1 - ratio) + blue[2] * (ratio))];
  var bottom = [Math.floor(darkBlue[0] * (ratio) + blue[0] * (1 - ratio)),
                Math.floor(darkBlue[1] * (ratio) + blue[1] * (1 - ratio)),
                Math.floor(darkBlue[2] * (ratio) + blue[2] * (1 - ratio))];

  html.style.background = "linear-gradient(rgb(" + top[0] + ", " + top[1] + ", " + top[2] + "), "
                          + "rgb(" + bottom[0] + ", " + bottom[1] + ", " + bottom[2] + ")) 0 0/100% 100% fixed no-repeat";
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
window.addEventListener("load", windowLoaded);
// window.addEventListener("scroll", windowScrolled);

window.addEventListener("resize", function(){
   console.log('test');
   canvas.width = body.offsetWidth
   canvas.height = body.offsetHeight;
   for(var i = 0; i < 300; i++){
   particles[i] = {
      x: random_range(0, canvas.width),
      y: random_range(0, canvas.height),
      xSpeed: random_range(-2, 2),
      ySpeed: random_range(-2, 2),
      size: random_range(1, 10)
   }
}
});

function random_range(min, max){
   return Math.round(min + Math.random() * (max-min))
}

    setTimeout(function() {
   requestAnimationFrame(draw);}, 1000);
function draw(){
   ctx.fillStyle = '#222'
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   for(var i = 0; i < partCnt; i++){
      check_points(particles[i].x, particles[i].y, particles[i].size, particles[i].range, i)
      particles[i].x += particles[i].xSpeed;
      particles[i].y += particles[i].ySpeed;
      ctx.fillStyle = "#1cd3ff"
      // ctx.fillRect(particles[i].x,particles[i].y,particles[i].size,particles[i].size)
      // ctx.shadowBlur = 10;
      // ctx.shadowColor = "#fff";
      ctx.beginPath();
      ctx.arc(particles[i].x + particles[i].size / 2,particles[i].y + particles[i].size / 2, particles[i].size / 2,0,2*Math.PI)
      ctx.fill();
      // ctx.shadowBlur = 0;
      if(particles[i].x > canvas.width)
         particles[i].x = 0
      if(particles[i].x < 0)
         particles[i].x = canvas.width
      if(particles[i].y > canvas.height)
         particles[i].y = 0
      if(particles[i].y < 0)
         particles[i].y = canvas.height
      
   }
   requestAnimationFrame(draw);
}

function check_points(x, y, size, range, base){
   for(var i = base + 1; i < partCnt; i++){
      if(distance(x, y, particles[i].x, particles[i].y) < range * range){
         ctx.beginPath()
         ctx.moveTo(x+size/2,y+size/2)
         ctx.lineTo(particles[i].x+particles[i].size/2,particles[i].y+particles[i].size/2)
         ctx.strokeStyle = "#1e61ee"
         ctx.stroke()
      }
   }
}

function distance(x1, y1, x2, y2){
   return Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2);
}