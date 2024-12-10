const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // se selecciona para que renderice en 2d

// tamaño de canvas
canvas.width = 448;
canvas.height = 400;

// variables de la pelota
const ballRadius = 2;
let x = canvas.width / 2;
let y = canvas.height - 250;

// variables del paddlet

let paddletLeft = false;
let paddletRight = false;

// velocidad de la pelota
let dx = 2;
let dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#eee";
  ctx.fill();
  ctx.closePath();
}

// Variables del paddlet
const paddletHeigh = 5;
const paddletWith = 30;
let paddleX = (canvas.width - paddletWith) / 2;
let paddley = canvas.height - paddletHeigh - 5;
// se creo conexión con Equipo corporativo
//Dibujar paddlet o recuadro
function drawPaddle() {
  ctx.fillStyle = "red";
  ctx.fillRect(paddleX, paddley, paddletWith, paddletHeigh);
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

  //Colision de juego terminado porque toca el suelo
  
  if (y + dy > canvas.height) {
    document.location.reload();
  }
  x += dx;
  y += dy;
}
function paddleMovemeent() {
  if (paddletRight){
    paddleX += 2
  }else if (paddletLeft){
    paddleX -= 2
  }

}

function clearDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  console.log(paddletLeft, paddletRight);

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
initEvent();
