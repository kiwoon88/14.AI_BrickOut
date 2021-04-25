let backWidth = 1280;
let backHeight = 940;
let blockWidth = 128;
let blockHeight = 30;
let cols = backWidth/128;
let rows = 8;
let block = [];
let ball = {x: 300, y: 300, d: 10, speed: 7, xdir: 1, ydir: 1.7};
let paddle;
let scoreImg;

function preload(){
  for(let i=0; i < rows; i++){
    block[i] = [];
    for(let j=0; j < cols; j++){
      block[i][j] = new Block(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
    }
  }
  paddle = new Paddle(500);
}

function setup() {
  createCanvas(backWidth, backHeight);
  scoreImg = createGraphics(backWidth, backHeight);
  scoreImg.textSize(20);
  scoreImg.textAlign(CENTER, CENTER);
  scoreImg.fill('#FF0000');
}

function draw() {
  background('black');
  image(scoreImg, 0, 0);
  noStroke();
  fill('yellow');
  ellipse(ball.x, ball.y, ball.d);
  paddle.show();
  paddleCrashChk();
  if(keyIsDown(LEFT_ARROW)){
    paddle.move(-10);
  }
  if(keyIsDown(RIGHT_ARROW)){
    paddle.move( 10);
  }  
  stageClear();
  drawBlock();
  edgeChk();
  ball.x -= ball.speed*ball.xdir;
  ball.y -= ball.speed*ball.ydir;
}

function edgeChk(){
  if(ball.x-ball.d/2 <= 0 || ball.x+ball.d/2 >= width){
    ball.xdir *= -1;
  }
  if(ball.y-ball.d/2 <= 0 || ball.y+ball.d/2 >= height){
    ball.ydir *= -1;
  }
}

function crashChk(i, j){
  if(ball.x+ball.d/2 >= block[i][j].x && ball.x-ball.d/2 <= block[i][j].x+block[i][j].w && ball.y+ball.d/2 >= block[i][j].y && ball.y-ball.d/2 <= block[i][j].y + block[i][j].h){
    push();
    scoreImg.text('+100', block[i][j].x+blockWidth*0.47, block[i][j].y+blockHeight*0.6);
    pop();
    block[i].splice(j, 1);
    ball.ydir *= -1;
  }
}

function paddleCrashChk(){
  if(ball.x+ball.d/2 >= paddle.x && ball.x-ball.d/2 <= paddle.x+paddle.w && ball.y+ball.d/2 >= paddle.y && ball.y-ball.d/2 <= paddle.y + paddle.h){
    ball.ydir *= -1;
    scoreImg.clear(-1);
  }
  if(paddle.x < 0){
    paddle.x = 0;
  }
  if(paddle.x+paddle.w > backWidth){
    paddle.x = backWidth-paddle.w;
  }
}

function stageClear(){
  let sum = 0;
  for(let i=0 ; i< rows; i++){
    if(block[i].length == 0){
      sum++; 
    }
    if(sum==rows){
      background('black');
      textSize(64);
      textAlign(CENTER, CENTER);
      text('YOU WIN !!', width/2, height/2);
      noLoop();
    }
  } 
}

function drawBlock(){
  for(let i=0; i<rows; i++){
    for(let j=0; j<block[i].length; j++){
      block[i][j].show();  
      crashChk(i, j);      
    }
  }
}
