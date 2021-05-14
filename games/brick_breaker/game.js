//The canvas element
const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")

// In game variables and constants
var score = 0;
const score_unit = 10;
var life = 3;
var game_level = 1;
var game_ended = false;
const max_level = 5


//Setting canvas height to screen height
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//Handling controls
left = false;
right = false;
function movePaddle(){
  if(left == true && paddle.x > 0){
    paddle.x -= paddle.dx;
  }
  if(right == true && paddle.x < window.innerWidth - paddle.width){
    paddle.x += paddle.dx;
  }
}

//Game objects
const paddle = {
  height:15,
  width: window.innerWidth/6,
  dx: 4,
  x: window.innerWidth/2 - 50,
  y: window.innerHeight - 80,
  inx:window.innerWidth/2 - 50,
  iny: window.innerHeight - 80
}

const ball = {
 radius: 8,
 color: "#fff",
 x: paddle.x + paddle.width/2,
 y: paddle.y - 10,
 dx:3 * (Math.random() * 2 - 1),
 dy:-3,
 speed:4,
 inx: paddle.x + paddle.width/2,
 iny: paddle.y - 10
}

const brick = {
  height:15,
  width:Math.floor(window.innerWidth - 55)/10,
  margin:5,
  margin_top:40,
  row:8,
  column:10,
  stroke_color:"#131419",
  fill_color:"#555"
}


//The draw function
//this will draw ball and paddle
function draw(){
  //drawing the Paddle
  ctx.beginPath();
  ctx.fillStyle = "#ff0";
  ctx.strokeStyle = "#000"
  ctx.rect(paddle.x,paddle.y,paddle.width,paddle.height);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI *2);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Calling draw_bricks function
  draw_bricks();
  //Print score
  game_stats(score,20,30);
  game_stats(`Level: ${game_level}`,canvas.width/2 - 50,30);
  game_stats(`Lives: ${life}`,canvas.width- 120,30);
}


//the update function
//This contains all the laws

function update(){
  
  ball_wall_collision();
  
  ball_paddle_collision();
  
  ball_brick_collision();
  
}
//Colision of Ball with Paddle
function ball_paddle_collision(){
 if(ball.y > paddle.y - ball.radius && ball.x <= paddle.x + paddle.width && ball.x >= paddle.x && ball.y < paddle.y + paddle.height){
    ball.dy = -ball.dy;
    //Get5ing the point where Ball is hit
    let hit_point = ball.x - (paddle.x+ paddle.width/2);
    
    //Normalize the hit point
    hit_point = hit_point /(paddle.width/2);
    
    //Getting Angle of the Ball
    let angle = hit_point * Math.PI/3;
    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = - ball.speed * Math.cos(angle);
  } 
}


//The loop function
//The loop which makes ball move
function loop(){
  //Clearing canvas
  ctx.fillStyle = "rgba(0,0,0,0.5)"
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

  movePaddle();
  
  update();
  
  draw();
  
  if(game_ended == true){
    return;
  }
  requestAnimationFrame(loop);
}

function reset_brick(){
  for(let r = 0;r < brick.row;r++){
      for (var c = 0; c < brick.column; c++) {
        let b = bricks[r][c];
        //If the brick is not broken
        b.status = true;
      }
    }
}
//Reset Function
//When game Ended 
function reset() {
  //Reset ball
  ball.x = ball.inx;
  ball.y = ball.iny;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
  
  //Resetting paddle
  paddle.x = paddle.inx;
  
  //Resetting Interaction
  left = false;
  right = false;
  
  if(game_ended == true){
    ball.speed = 4;
    //Resetting bricks
    reset_level();
    reset_brick();
    //Start Screen
    start_screen.style.display = "flex";
    
  }
}

//This will create bricks
let bricks = []
function create_bricks(){
  for(let r = 0;r < brick.row;r++){
    bricks[r] = []
    for (var c = 0; c < brick.column; c++) {
      bricks[r][c] = {
        x:c * (brick.margin +brick.width) + brick.margin,
        y:r * (brick.margin + brick.height)  + brick.margin + brick.margin_top,
        status:true
      }
    }
  }
}

create_bricks();

//Drawing the bricks
function draw_bricks(){
  for(let r = 0;r < brick.row;r++){
    for (var c = 0; c < brick.column; c++) {
      //If the brick is not broken
      if(bricks[r][c].status){
        let b = bricks[r][c];
        //Drawing bricks
        ctx.beginPath();
        ctx.fillStyle = brick.fill_color;
        ctx.strokeStyle = brick.stroke_color;
        ctx.rect(b.x,b.y,brick.width,brick.height);
        ctx.fill();
        ctx.stroke();
        
      }
    }
  }
}

//Ball Brick collision 
function ball_brick_collision(){
  for(let r = 0;r < brick.row;r++){
    for (var c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      //If the brick is not broken
      if(b.status){
        if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
          ball.dy = -ball.dy;
          score += score_unit;
          b.status = false;
        }
      }
    }
  }
  //Check if all briks are broken
  next_level();
}

//Ball wall collision
function ball_wall_collision(){
  if(ball.x < 0+ball.radius || ball.x > window.innerWidth - ball.radius){
    ball.dx = -ball.dx;
  }
  if(ball.y < 0 + ball.radius){
    ball.dy = -ball.dy;
  }
  else if(ball.y > window.innerHeight - ball.radius){
    //Removing one life
    life--;
    // Checking If game over
    if(life <= 0){
     alert("Game Over");
     game_ended = true;
     reset()
    }
    // One life lost
    else if(life > 0){
      alert("One Life Lost\nResume Playing");
      reset();
    }
  }
  
  //Changing ball position
  ball.x += ball.dx;
  ball.y += ball.dy
}

//Getting Game status
function game_stats(text,text_x,text_y){
  ctx.beginPath();
  ctx.fillStyle = "#fff"
  ctx.font = "25px Yusei Magic"
  ctx.fillText(text,text_x,text_y);
}

function next_level(){
    let level_up = true;
    
    // check if all the bricks are broken
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            level_up = level_up && ! bricks[r][c].status;
        }
    }
    
    if(level_up){
      if(game_level < max_level){
        alert("You reached Next Level")
        reset();
      }
      if(game_level >= max_level){
          alert("You completed all Levels\nPlease send me your feedback");
          game_ended = true;
          reset();
            return;
      }
      brick.row++;
      create_bricks();
      ball.speed += 0.5;
      game_level++;
    }
}

function reset_level(){
  game_level = 1;
  score = 0;
  brick.row = 4;
  create_bricks();
  life = 3;
}

//Menu options controls

//Starting game
start_screen = document.querySelector("#game_screen")
start_screen.style.height = canvas.height + 'px';
start = document.querySelector("#play");
//Whenever user clicks Play button 
start.addEventListener("click",function(){
  setTimeout(function(){
  game_ended = false;
  loop();
  start_screen.style.display = "none";
  },200);
});

//instructions button
var instruct_btn = document.querySelector("#instructions");
const instructions = document.querySelector("#instruction_screen");
instructions.style.height = window.innerHeight +"px";

// when user clicks on instruct_btn 
instruct_btn.addEventListener("click",function(){
  instruction_screen.style.display = "block";
  
});

//Go back button
const menu = document.querySelector("#menu_btn");
menu.addEventListener("click",function(){
  instruction_screen.style.display = "none";
});
