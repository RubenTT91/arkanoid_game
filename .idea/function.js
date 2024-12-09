const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // se selecciona para que renderice en 2d

// tamaño de canvas
canvas.width = 448;
canvas.heigth = 400;


// variables de la pelota
const ballRadius = 2;
const VELOCITY =2;
let x = canvas.width / 2;
let y = canvas.heigth - 265;


// variables del paddlet
let paddletLeft = false;
let paddletRight = false;
const PADDLET_SENSIBILITY = 8;

// velocidad de la pelota
let dx = VELOCITY;
let dy = -VELOCITY;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#eee";
  ctx.fill();
  ctx.closePath();
}

// Variables del paddlet
const paddletHeigh = 7;
const paddletWidth = 30;
let paddleX = (canvas.width - paddletWidth) / 2;
let paddley = canvas.height - paddletHeigh - 5;


//Dibujar paddlet o recuadro
function drawPaddle() {
  ctx.fillStyle = "red";
  ctx.fillRect(paddleX, paddley, paddletWidth, paddletHeigh);
}

function drawBricks() {}
function drawBricks() {}

function initEvent() {
  document.addEventListener("keydown", KeyPressed);
  document.addEventListener("keyup", KeyUp);
  // escucho el evento cuando presionan la tecla
  function KeyPressed(event) {
    const { key } = event;
    if (key == "Right" || key == "ArrowRight") {
      paddletRight = true;
    } else if (key == "Left" || key == "ArrowLeft") {
      paddletLeft = true;
    }
  }
  // escucho el evento cuando sueltan la tecla
  function KeyUp(event) {
    const { key } = event;
    if (key == "Right" || key == "ArrowRight") {
      paddletRight = false;
    } else if (key == "Left" || key == "ArrowLeft") {
      paddletLeft = false;
    }
  }
}

function collisionDetection() {
}

function ballMoveement() {
  
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  
  // confirma si el paddlet esta tocando la pelota
  const IS_SAME_X = 
  x > paddleX && 
  x < (paddleX + paddletWidth)
  const IS_SAME_Y = (y + dy) >  paddley- (paddletHeigh/2)
  
  //Colision de juego terminado porque toca el suelo
  if(IS_SAME_X && IS_SAME_Y){
    dy = -dy // cambiamos la dirección de la pelota
  }else if(y + dy > canvas.height){
    document.location.reload();
  }
  x += dx;
  y += dy;
}
function paddleMovemeent() {
  if (paddletRight && paddleX< canvas.width - paddletWidth- ballRadius){
    console.log(paddleX);
    paddleX += PADDLET_SENSIBILITY
  }
  if (paddletLeft && paddleX >0+ballRadius){
    paddleX -= PADDLET_SENSIBILITY
  }
}

function clearDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {

  //funciones para dibujar
  clearDraw();
  drawBall();
  drawPaddle();
  //drawBricks();

  // Coliciones
  //collisionDetection();
  ballMoveement();
  paddleMovemeent();
  window.requestAnimationFrame(draw); //Es un metodo que programa una función para que se ejecute antes de que se antes de que se refresque la ventana. Es un loop infinito
}

draw();
initEvent();
