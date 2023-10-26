let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.width = canvas.parentElement.offsetWidth
canvas.height = canvas.parentElement.offsetHeight
let x = canvas.width/2
let y = canvas.height - 100
let moveRight = false
let moveLeft = false
let ballsX = []
let ballsY = []
let timeUntilSpawn = 1000
let score = 0
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer()
    ctx.font = '24px Consolas'
    ctx.fillText('Score: '+score,50,50)
    timeUntilSpawn -= 10
    if(timeUntilSpawn == 0){
        timeUntilSpawn = 1000-score;
        spawnBall()
    }
    for(let i = 0; i< ballsX.length; i++)
    {
        if(ballsY[i]+10>=y){
            if(ballsX[i]+20 > x && ballsX[i] -20 < x+200)
            {
                score += 1
            } 
            else{
                score = 0
            }
            ballsX.splice(i,1)
            ballsY.splice(i,1)
            i--;
        }
        else{
            drawBall(i)
            ballsY[i] += 5
        }
    }

}

function drawBall(i){
    ctx.beginPath()
    ctx.arc(ballsX[i], ballsY[i],20,0, Math.PI*2)
    ctx.fillStyle = "#ff284d";
    ctx.fill();
    ctx.closePath();
}

function spawnBall(){
    let x = Math.floor(Math.random() * (canvas.width - 800) + 400)
    let y = 50
    ballsX.push(x)
    ballsY.push(y)
}

function drawPlayer(){
ctx.beginPath();
ctx.rect(x,y,200,20)
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

function drawBalls(item){
    ctx.beginPath()
    ctx.arc(item.x, item.y,20,0, Math.PI*2)
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    item.y += 1
}

setInterval(draw, 10)
setInterval(right, 10)
setInterval(left, 10)

function right(){
    if(moveRight && x+200<canvas.width){
        x += 10
    }
}
function left(){
    if(moveLeft && x>0){
        x -= 10
    }
}
canvas.parentElement.addEventListener('keydown', function(e){
    if(e.key == 'ArrowLeft'){
        moveLeft = true
    }
    if(e.key == 'ArrowRight'){
        moveRight = true
    }
})
canvas.parentElement.addEventListener('keyup', function(e){
    if(e.key == 'ArrowLeft'){
        moveLeft = false
    }
    if(e.key == 'ArrowRight'){
        moveRight = false
    }
})
