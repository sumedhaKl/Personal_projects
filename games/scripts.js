const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let isGameRunning = false;
let score = 0;
let questsCompleted = 0;
let isBossFight = false;

const block = {
  x: 50,
  y: canvas.height / 2 - 25,
  width: 50,
  height: 50,
  speed: 5,
};

const quests = [
  { description: "Collect 10 coins", target: 10 },
  { description: "Defeat 5 enemies", target: 5 },
];

let currentQuest = null;

function generateQuest() {
  currentQuest = quests[Math.floor(Math.random() * quests.length)];
  document.getElementById('questDescription').innerText = currentQuest.description;
}

generateQuest();

const enemy = {
  x: canvas.width - 100,
  y: canvas.height / 2 - 25,
  width: 50,
  height: 50,
  speed: 3,
};

function drawBlock() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(block.x, block.y, block.width, block.height);
}

function drawEnemy() {
  ctx.fillStyle = 'red';
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  clearCanvas();
  drawBlock();
  if (isBossFight) {
    drawEnemy();
  }
}

function checkCollision() {
  if (block.x < enemy.x + enemy.width &&
    block.x + block.width > enemy.x &&
    block.y < enemy.y + enemy.height &&
    block.y + block.height > enemy.y) {
      return true;
  }
  return false;
}

function handleQuestCompletion() {
  if (currentQuest && score >= currentQuest.target) {
    questsCompleted++;
    generateQuest();
    score = 0;
  }
}

function gameLoop() {
  if (!isGameRunning) return;

  update();
  handleQuestCompletion();

  if (isBossFight && checkCollision()) {
    isBossFight = false;
    score++;
  }

  requestAnimationFrame(gameLoop);
}

function startGame() {
  isGameRunning = true;
  gameLoop();
}

function pauseGame() {
  isGameRunning = false;
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('pauseButton').addEventListener('click', pauseGame);