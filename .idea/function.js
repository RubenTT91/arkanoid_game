const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d') // se selecciona para que renderice en 2d

// tamaño de canvas
canvas.width = 448
canvas.heigth   = 400

// variables de la pelota
const ballRadius =8
let x = canvas.width / 2
let y = canvas.heigth -30

// velocidad de la pelota
let dx = 2
let dy = -2


function drawBall(){
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#eee'
    ctx.fill()
    ctx.closePath()

}
function drawPaddle(){}
function drawBricks(){}
function drawBricks(){}

function collisionDetection(){}
function ballMoveement(){

}
function paddleMovemeent(){}


function draw(){
    //funciones para dibujar
    drawBall()
    //console.log("hola mundo")
    drawPaddle()
    drawBricks()

    // Coliciones
    collisionDetection()
    ballMoveement()
    paddleMovemeent()

    window.requestAnimationFrame(draw) //Es un metodo que programa una función para que se ejecute antes de que se antes de que se refresque la ventana. Es un loop infinito

 }
 draw()