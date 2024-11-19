const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d') // se selecciona para que renderice en 2d

// tamaño de canvas
canvas.width = 448
canvas.heigth   = 600

// variables de la pelota
const ballRadius = 2
let x = canvas.width / 2
let y = canvas.heigth -460

// velocidad de la pelota
let dx = 1
let dy = -1


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
    x += dx
    y += dy
}
function paddleMovemeent(){}
function clearDraw(){
    ctx.clearRect(0,0, canvas.width, canvas.height)

}

function draw(){
    //funciones para dibujar
    clearDraw()
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