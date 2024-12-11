const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const $imgPaddlet = document.querySelector("#paddlet");
const $imgBricks = document.querySelector("#bricket");
const bordeCanvas = 10;

// Tamaño del canvas
canvas.width = 700;
canvas.height = 600;

// Variables del paddlet
const paddletHeight = 7;
const paddletWidth = 60;
let paddleX = (canvas.width - paddletWidth) / 2;
let paddleY = canvas.height - paddletHeight - 10;

//Variables de pelota
let X = canvas.width / 2;
let Y = paddleY - paddletHeight;
const ballRadius = 3;

//Velicidad pelota
let velocity_ball = 1;
let dx = velocity_ball;
let dy = -velocity_ball;

// Imagen del paddlet
let paddletRight = false;
let paddletLeft = false;
const VELOCITY_PADDLET = 5;

// Dibuja el paddlet
function drawPaddle() {
  ctx.drawImage($imgPaddlet, 0, 200, 98, 26, paddleX, paddleY, 70, 20);
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(X, Y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#eee";
  ctx.fill();
  ctx.closePath();
}
function ballMovement() {
  X += dx;
  Y += dy;
}

function collisions() {
  const X_SAME_PADDLET = X > paddleX && X < paddleX + paddletWidth;
  const Y_SAME_PADDLET = Y + dy > paddleY;

  if (X + dy > canvas.width || X + dx < 0) {
    dx = -dx;
  }
  if (Y + dy < 0) {
    dy = -dy;
  }
  if (X_SAME_PADDLET && Y_SAME_PADDLET) {
    dy = -dy;
  } else if (Y + dy > canvas.height) {
    document.location.reload();
  }
}

function initEvent() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyup);
  document.addEventListener("touchstart", touchScreen, { passive: true });
  document.addEventListener("touchend", touchEnd, { passive: true });

  function touchScreen(event) {
    let coordenada = Number(event.screenX ?? event.touches[0].pageX);
    if (coordenada > canvas.width / 2) {
      paddletRight = true;
    } else if (coordenada < canvas.width / 2) {
      paddletLeft = true;
    }
  }

  function touchEnd() {
    paddletLeft = false;
    paddletRight = false;
  }

  function keyPressed(event) {
    const { key } = event;
    if (key == "Right" || key == "ArrowRight") {
      paddletRight = true;
    } else if (key == "Left" || key == "ArrowLeft") {
      paddletLeft = true;
    } else if (key == " NumpadAdd" || key == "+") {
      dx +=0.5
      dy += 0.5      

    } else if (key == "NumpadSubtract" || (key == "-" && paddleX > 0)) {      
      dx -=0.5
      dy -= 0.5      
    }
  }
  function keyup(event) {
    const { key } = event;
    if (key == "Right" || key == "ArrowRight") {
      paddletRight = false;
    } else if (key == "Left" || key == "ArrowLeft") {
      paddletLeft = false;
    }
  }
}
// se agrega el movimiento del paddlet y sus limites
function paddletMovement() {
  if (paddletRight && paddleX <= canvas.width - (paddletWidth + bordeCanvas)) {
    paddleX += VELOCITY_PADDLET;
  } else if (paddletLeft && paddleX) {
    paddleX -= VELOCITY_PADDLET;
  }
}

// Lógica de dibujo
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  requestAnimationFrame(draw);
  drawCircle();
  ballMovement();
  paddletMovement();
  collisions();
}

draw();
initEvent();
