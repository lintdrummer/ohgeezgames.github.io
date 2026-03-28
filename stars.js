document.body.style.background = "transparent";

var canvas = document.getElementById("starfield");
var ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

var stars = [];
for (var i = 0; i < 220; i++) {
  stars.push({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.4 + 0.2,
    base: Math.random() * 0.6 + 0.1,
    speed: Math.random() * 0.015 + 0.004,
    phase: Math.random() * Math.PI * 2
  });
}

var t = 0;
function drawStars() {
  ctx.fillStyle = "#020408";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  t += 0.005;
  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];
    var alpha = s.base * (0.5 + 0.5 * Math.sin(t * s.speed * 100 + s.phase));
    ctx.beginPath();
    ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255," + alpha + ")";
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
drawStars();

var reveals = document.querySelectorAll(".reveal");
for (var i = 0; i < reveals.length; i++) {
  reveals[i].classList.add("hidden");
}
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      (function(el) {
        setTimeout(function() {
          el.classList.remove("hidden");
          el.classList.add("visible");
        }, i * 80);
      })(entry.target);
    }
  });
}, { threshold: 0.1 });
for (var i = 0; i < reveals.length; i++) {
  observer.observe(reveals[i]);
}
