const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const bordeCanvas = 3.5;

// Tamaño del canvas
canvas.width = 448;
canvas.height = 400; // Cambia "heigth" por "height"

// Variables del paddlet
const paddletHeight = 7;
const paddletWidth = 60;
let paddleX = (canvas.width - paddletWidth) / 2;
let paddleY = canvas.height - paddletHeight - 5;

//Variables de pelota
let X = canvas.width / 2;
let Y = paddleY - paddletHeight;
const ballRadius = 2;
const VELOCITY_BALL = 2;

//Velicidad pelota
let dx = VELOCITY_BALL;
let dy = -VELOCITY_BALL;

// Imagen del paddlet
const $spritePaddlet = document.querySelector("#paddlet");
let paddletRight = false;
let paddletLeft = false;
const VELOCITY_PADDLET = 5;

// Dibuja el paddlet
function drawPaddle() {
  ctx.fillStyle = "white";
  ctx.fillRect(paddleX, paddleY, paddletWidth, paddletHeight);
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

  const X_SAME_PADDLET =   X > paddleX && X < (paddleX + paddletWidth)
  
  const Y_SAME_PADDLET =  Y+dy > paddleY

  if (X + dy > canvas.width - bordeCanvas || X + dx < 0) {
    dx = -dx;
  }
  if (Y + dy < 0) {
    dy = -dy;
  }
if(X_SAME_PADDLET && Y_SAME_PADDLET){
  dy = -dy
}else if(Y+dy > canvas.height)
  {
    document.location.reload();
  }


}

function initEvent() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyup);

  function keyPressed(event) {
    const { key } = event;
    if (key == "Right" || key == "ArrowRight") {
      paddletRight = true;
      console.log(key);
    } else if (key == "Left" || key == "ArrowLeft") {
      paddletLeft = true;
      console.log(key);
    }
  }
  function keyup(event) {
    const { key } = event;
    if (key == "Right" || key == "ArrowRight") {
      paddletRight = false;
      console.log(key);
    } else if (key == "Left" || key == "ArrowLeft") {
      paddletLeft = false;
      console.log(key);
    }
  }
}
// se agrega el movimiento del paddlet y sus limites
function paddletMovement() {
  if (paddletRight && paddleX < canvas.width - (bordeCanvas+paddletWidth)) {
    paddleX += VELOCITY_PADDLET;
  } else if (paddletLeft && paddleX > bordeCanvas) {
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
