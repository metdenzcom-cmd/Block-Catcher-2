

















// Canvas erstellen
const canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');














// Spieler-Box
let player = {
  x: canvas.width / 2 - 30,
  y: canvas.height - 40,
  width: 60,
  height: 20,
  color: 'blue'
};

// Fallen-Kisten
let boxes = [];
const gravity = 0.5;
let score = 0;

// Maussteuerung
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left - player.width / 2;
});

// Neue Kisten erzeugen
function spawnBox() {
  boxes.push({
    x: Math.random() * (canvas.width - 30),
    y: -30,
    width: 30,
    height: 30,
    vy: 0,
    color: 'red'
  });
}

// Update-Funktion
function update() {
  boxes.forEach((box, index) => {
    box.vy += gravity;
    box.y += box.vy;

    // Kollision mit Spieler
    if (
      box.x < player.x + player.width &&
      box.x + box.width > player.x &&
      box.y + box.height > player.y &&
      box.y < player.y + player.height
    ) {
      boxes.splice(index, 1); // Kiste gefangen
      score += 1;
    }

    // Kiste fällt unten runter
    if (box.y > canvas.height) {
      boxes.splice(index, 1);
    }
  });
}

// Zeichnen
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spieler
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Kisten
  boxes.forEach(box => {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);
  });

  // Score
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
}

// Game Loop
function gameLoop() {
  if (Math.random() < 0.02) spawnBox(); // Neue Kisten zufällig erzeugen
  update();
  draw();
  requestAnimationFrame(gameLoop);
}













gameLoop();
