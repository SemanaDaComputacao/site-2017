//Global variabes
var canvas;
var ctx;
var particles = new Array();
var particlesCount = 40;


//Classes
function Particle(x, y, xVelocity, yVelocity, radius, fieldRadius) {
  this.x = x;
  this.y = y;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.radius = radius;
  this.fieldRadius = fieldRadius;

  var particleCache = document.createElement("canvas");
  var particleCacheCtx = particleCache.getContext("2d");

  particleCache.height = 50;
  particleCache.width = 50;

  particleCacheCtx.shadowBlur = 10;
  particleCacheCtx.shadowColor = "rgba(64, 196, 255, 1)";

  particleCacheCtx.fillStyle = "rgba(64, 196, 255, .1)";
  
  particleCacheCtx.beginPath();
  particleCacheCtx.arc(particleCache.width / 2, 
    particleCache.height / 2, 
    radius / 2, 0, 2 * Math.PI
  );
  particleCacheCtx.fill();

  particleCacheCtx.fillStyle = "rgba(64, 196, 255, 1)";
  
  particleCacheCtx.beginPath();
  particleCacheCtx.arc(particleCache.width / 2, 
    particleCache.height / 2, 
    radius / 3, 0, 2 * Math.PI
  );
  particleCacheCtx.fill();

  particleCacheCtx.shadowBlur = 5;

  particleCacheCtx.fillStyle = "rgba(255, 255, 255, .8)";

  particleCacheCtx.beginPath();
  particleCacheCtx.arc(particleCache.width / 2, 
    particleCache.height / 2, 
    radius / 4, 0, 2 * Math.PI
  );
  particleCacheCtx.fill();

  this.cache = particleCache;
}


//Events
function animationFrameRequested() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particlesCount; i++) {
    setParticlePosition(i);

    // drawParticle(i);

    // drawParticleField(i);

    drawParticleNextConnections(i);

    drawParticle(i);    
  }
  
  requestAnimationFrame(animationFrameRequested);  
}

function windowLoaded(event) {
  canvas = document.getElementById("back-canvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particlesCount = Math.ceil(window.innerWidth * window.innerHeight / 13500);
  console.log(
    window.innerWidth + ", " + window.innerHeight + " | " + 
    canvas.offsetWidth + ", " + canvas.offsetHeight + " | " +
    window.devicePixelRatio
  );

  for (var i = 0; i < particlesCount; i++) {
    particles[i] = generateParticle();
  }

  requestAnimationFrame(animationFrameRequested);
}

function windowResized(event) {
  var newParticlesCount = Math.ceil(window.innerWidth * window.innerHeight / 13500);

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  if (newParticlesCount < particlesCount)
    particles.splice(0, particlesCount - newParticlesCount);

  while (newParticlesCount > particlesCount++)
    particles.push(generateParticle());
    
  particlesCount = newParticlesCount;
  console.log(
    window.innerWidth + ", " + window.innerHeight + " | " + 
    canvas.offsetWidth + ", " + canvas.offsetHeight + " | " +
    window.devicePixelRatio
  );
}


//Methods
function drawParticle(i) {
  ctx.drawImage(
    particles[i].cache,
    particles[i].x - particles[i].cache.width / 2, 
    particles[i].y - particles[i].cache.height / 2
  );
}

function drawParticleField(i) {
  ctx.shadowBlur = 5;

  ctx.strokeStyle = "rgba(255, 255, 255, .5)";

  ctx.lineWidth = particles[i].radius / 8;

  ctx.beginPath();
  ctx.arc(particles[i].x + particles[i].radius / 2, 
    particles[i].y + particles[i].radius / 2, 
    particles[i].fieldRadius, 0, 2 * Math.PI
  );
  ctx.stroke();
}

function drawParticleNextConnections(i) {   
  // ctx.shadowBlur = 5;
  ctx.shadowColor = "rgba(64, 196, 355, 1)";   

  for (var j = i + 1, n = 0; j < particlesCount && n < 4; j++) {
    var distanceIJ = distance(particles[i].x, particles[i].y, particles[j].x, particles[j].y);

    if (distanceIJ <= particles[i].fieldRadius || distanceIJ <= particles[j].fieldRadius) {
      var opacity = (1 - (distanceIJ + Math.min(particles[i].fieldRadius, particles[j].fieldRadius)) / (particles[i].fieldRadius + particles[j].fieldRadius));
      opacity = (1 / (0.75 + Math.exp(-2 * opacity)) - 0.25);
      
      ctx.strokeStyle = "rgba(255, 255, 255, " + opacity + ")";

      ctx.lineWidth = 2 * opacity * (particles[i].radius / 8) * (particles[j].radius / 8);

      ctx.beginPath();
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(particles[j].x, particles[j].y);
      ctx.stroke();
      
      ctx.strokeStyle = "rgba(64, 196, 355, " + (opacity / 2) + ")";

      ctx.lineWidth = 4 * opacity * (particles[i].radius / 8) * (particles[j].radius / 8);

      ctx.beginPath();
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(particles[j].x, particles[j].y);
      ctx.stroke();

      n++;
    }
  }

  ctx.shadowBlur = 0;
} 

function setParticlePosition(i) {  
  var offset = 200;

  particles[i].x += particles[i].xVelocity;
  particles[i].y += particles[i].yVelocity;

  if (particles[i].x < 0 - offset) particles[i].x += canvas.offsetWidth + offset;
  else if (particles[i].x > canvas.offsetWidth + offset) particles[i].x -= canvas.offsetWidth + offset;
  if (particles[i].y < 0 - offset) particles[i].y += canvas.offsetHeight + offset;
  else if (particles[i].y > canvas.offsetHeight + offset) particles[i].y -= canvas.offsetHeight + offset;
}


//Functions
function distance(x1, y1, x2, y2) {      
  return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

function generateParticle() {
  return new Particle(
    randomInterval(0, canvas.width),
    randomInterval(0, canvas.height),
    (randomInterval(.3, .6) - 1) * ((randomInterger(2) == 0) ? 1 : -1),
    (randomInterval(.3, .6) - 1) * ((randomInterger(2) == 0) ? 1 : -1),
    (randomInterval(0, 4) - 10) *  -1,
    (randomInterval(0, 150) - 200) *  -1
  );
}

function randomInterger(n) {
  return Math.floor(Math.random() *n);
}

function randomInterval(a, b) {
  return a + Math.random() * (b - a);
}


//Settings
window.addEventListener("load", windowLoaded);
window.addEventListener("resize", windowResized);