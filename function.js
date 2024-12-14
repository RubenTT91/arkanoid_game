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
let X = canvas.width / 2;
let Y = paddleY - paddletHeight;

// variables de los ladrillos
const LADRILLO_COLUM = 8;
const LADRILLO_ROW = 10;
const LADRILLO_ESPACIADO = 5;
const LADRILLO_ALTO = 15;
const LADRILLO_ANCHO = 70;
const OFFSET_TOP = 50;
const OFFSET_LEFT = 50;
const LADRILLOS = [];
const ESTADO_LADRILLO = {
  activo: 1,
  destruido: 0,
};

/**Se crean las variables de los ladrillos y se asignan uno a uno a cada
 * espacio d ela matriz [][]
 */
for (let c = 0; c < LADRILLO_COLUM; c++) {
  LADRILLOS[c] = []; // inicializamos con un Arreglo vacio
  for (let r = 0; r < LADRILLO_ROW; r++) {
    // Calculamos la posición de inicio de cada ladrillo tanto alto como ancho
    const LADRILLO_X = c * (LADRILLO_ANCHO + LADRILLO_ESPACIADO) + OFFSET_LEFT;
    const LADRILLO_Y = r * (LADRILLO_ALTO + LADRILLO_ESPACIADO) + OFFSET_TOP;
    // Asignamos las variables para luego usar colores luego
    const random = Math.floor(Math.random() * 8);
    console.log(LADRILLOS.color);
    LADRILLOS[c][r] = {
      xL: LADRILLO_X,
      yL: LADRILLO_Y,
      brickStatus: ESTADO_LADRILLO.activo,
      color: random,
    };
  }
}

//Velicidad pelota
const ballRadius = 3;
let velocity_ball = 0.5;
let dx = velocity_ball;
let dy = -velocity_ball;

// Imagen del paddlet
let paddletRight = false;
let paddletLeft = false;
const VELOCITY_PADDLET = 5;

// Dibuja el paddlet
function drawPaddle() {
  ctx.drawImage(
    $imgPaddlet, // imagen que se selecciona
    0, // origen X para inicio del sprite
    200, // origen Y para inicio del sprite
    98, // Ancho del recorte que se va a tomar
    26, // alto del recorte que se va a tomar
    paddleX, // ubicación X de la imagen
    paddleY, // ubicación Y de la imagen
    70, // Ancho final del dibujo
    20
  ); // Alto final del dibujo
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(X, Y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#eee";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  /**Se usa el mismo for, pero esta vez para
   * rellenar y crear ladrillo por ladrillo, tomando las variables que anteriormente
   * se crearon en el anterior for
   */

  for (let c = 0; c < LADRILLO_COLUM; c++) {
    for (let r = 0; r < LADRILLO_ROW; r++) {
      const LADRILLO_ACTUAL = LADRILLOS[c][r];
      if (LADRILLO_ACTUAL.brickStatus == ESTADO_LADRILLO.destruido) {
        continue;
      }
      const anchoCambio = LADRILLO_ACTUAL.color * 55;
      ctx.drawImage(
        $imgPaddlet,
        110,
        10
      )
    }
  }
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
      dx += 0.5;
      dy += 0.5;
    } else if (key == "NumpadSubtract" || (key == "-" && paddleX > 0)) {
      dx -= 0.5;
      dy -= 0.5;
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
  drawBricks();
}

draw();
initEvent();
