const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // se selecciona para que renderice en 2d

// tamaño de canvas
canvas.width = 480;
canvas.heigth = 400;

// variables de la pelota
const ballRadius = 2;
let x = canvas.width / 2;
let y = canvas.heigth -260;

// velocidad de la pelota
let dx = -1;
let dy = -1;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#eee";
  ctx.fill();
  ctx.closePath();
}

// Variables del paddlet
const paddletHeigh = 5;
const paddletWith= 30;

let paddleX = (canvas.width - paddletWith) /2;
let paddley = canvas.height - paddletHeigh -5 ;

function drawPaddle() {
  ctx.fillRect(
    paddleX,
    paddley,
    paddletWith,
    paddletHeigh
  )
  
}
function drawBricks() {}
function drawBricks() {}

function collisionDetection() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  }

  if (y + dy > canvas.height) {
    console.log(y +dy);
    //console.log("Game Over");
    //document.location.reload();
  }
}

function ballMoveement() {
  x += dx;
  y += dy;
}
function paddleMovemeent() {}

function clearDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  //funciones para dibujar
  clearDraw();
  drawBall();
  //console.log("hola mundo")
  drawPaddle();
  drawBricks();

  // Coliciones
  collisionDetection();
  ballMoveement();
  paddleMovemeent();

  window.requestAnimationFrame(draw); //Es un metodo que programa una función para que se ejecute antes de que se antes de que se refresque la ventana. Es un loop infinito
}
draw();
