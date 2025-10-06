const basket = document.getElementById('basket');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const message = document.getElementById('message');
const gameArea = document.getElementById('gameArea');

let score = 0;
let ballFalling;
let ballX = Math.random() * 380;
let ballY = 0;
let basketX = 180;
let speed = 2;
let gameOver = false;

document.addEventListener('keydown', (e) => {
  if (gameOver) return;
  if (e.key === 'ArrowLeft' && basketX > 0) basketX -= 20;
  if (e.key === 'ArrowRight' && basketX < 340) basketX += 20;
  basket.style.left = basketX + 'px';
});

function dropBall() {
  if (gameOver) return;
  ballY += speed;
  ball.style.top = ballY + 'px';
  ball.style.left = ballX + 'px';

  // deteksi tangkapan
  if (ballY > 460 && ballX > basketX - 10 && ballX < basketX + 60) {
    score++;
    scoreDisplay.textContent = 'Skor: ' + score;
    resetBall();
    speed += 0.5;
  }

  // jika bola jatuh ke bawah tanpa tertangkap
  if (ballY > 500) {
    message.textContent = 'Game Over 😢';
    gameOver = true;
    cancelAnimationFrame(ballFalling);
    return;
  }

  ballFalling = requestAnimationFrame(dropBall);
}

function resetBall() {
  ballY = 0;
  ballX = Math.random() * 380;
}

dropBall();
