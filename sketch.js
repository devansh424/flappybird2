var PLAY = 1;
var END = 0;
var gameState = PLAY;

var flappy,flappyImage;
var ground, invisibleGround, groundImage;
var ground2;

var pipesUpGroup,pipeImage1;
var pipesDownGroup,pipeImage2;

var score=0;

var gameOver, restart;
var youWin,youWinImage;

function preload(){
  groundImage = loadImage("images/ground.jpg");
  
  flappyImage = loadImage("images/bird.png");

  pipeImage1=loadImage("images/pipeup.png");
  pipeImage2=loadImage("images/pipedown.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");

  youWinImage = loadImage("images/youwin.png");
}

function setup() {
  createCanvas(450, 500);
  
  flappy = createSprite(50,180,20,50);
  flappy.addImage(flappyImage);
  flappy.scale = 0.07;
  flappy.setCollider("rectangle",-10,10,800,800);
  
  ground = createSprite(300,280,1000,20);
  ground.addImage(groundImage);
  ground.scale=3;
  ground.velocityX = -(2 + 3*score/100);
  
  ground.depth = flappy.depth;
  flappy.depth = flappy.depth + 1;
  
  gameOver = createSprite(220,220);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(220,260);
  restart.addImage(restartImg);

  youWin=createSprite(220,220);
  youWin.addImage(youWinImage);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  youWin.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  youWin.visible = false;
   
  invisibleGround = createSprite(200,600,400,100);
  invisibleGround.visible = false;

  ground2=createSprite(200,1,400,5);
  ground2.visible=false;

  pipesUpGroup = new Group();
  pipesDownGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 250,200);
  
  if (gameState=== PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -3;
    flappy.collide(ground2);
    
    if(keyDown("space")) {
      flappy.velocityY = -6;
    }
  
    flappy.velocityY = flappy.velocityY + 1;
  
    if (ground.x < 10){
      ground.x = 300;
    }

    spawnPipe1();
    spawnPipe2();
  
    if(invisibleGround.isTouching(flappy)){
      gameState = END;
    }

    if(pipesUpGroup.isTouching(flappy)){
      gameState = END;
    }

    if(pipesDownGroup.isTouching(flappy)){
      gameState = END;
    
    }
  }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    flappy.velocityY = 0;
    flappy.velocityX = 0;
    pipesUpGroup.setVelocityXEach(0);
    pipesDownGroup.setVelocityXEach(0);

    //set lifetime of the game objects so that they are never destroyed
    pipesUpGroup.setLifetimeEach(-1);
    pipesDownGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();                            
    }
  }

    if(score===600){
      gameState=END;
      gameOver.visible = false;
      youWin.visible = true;

      pipesUpGroup.destroyEach();
      pipesDownGroup.destroyEach();
  }
  drawSprites();
}

function spawnPipe1(){
  if (frameCount % 50 === 0) {
    var pipeUp = createSprite(600,120,40,10);
    pipeUp.y = Math.round(random(450+10,480));
    pipeUp.addImage(pipeImage1);
    pipeUp.scale = 0.7;
    pipeUp.velocityX = -3;
    
    //assign lifetime to the variable
    pipeUp.lifetime = 200;

    gameOver.depth = pipeUp.depth;
    pipeUp.depth = pipeUp.depth + 1;
    restart.depth = pipeUp.depth;
    pipeUp.depth = pipeUp.depth + 1;

    pipeUp.depth = flappy.depth;
    flappy.depth = flappy.depth + 1;
    pipeUp.setCollider("rectangle",0,0,30,380);
    
    //add each pipe1 to the group
    pipesUpGroup.add(pipeUp);
  }
}

function spawnPipe2(){
  if (frameCount % 50 === 0) {
    var pipeDown = createSprite(600,120,40,10);
    pipeDown.y = Math.round(random(50,80));
    pipeDown.addImage(pipeImage2);
    pipeDown.scale = 0.2;
    pipeDown.velocityX = -3;
    
    //assign lifetime to the variable
    pipeDown.lifetime = 200;

    gameOver.depth = pipeDown.depth;
    pipeDown.depth =pipeDown.depth + 1;
    restart.depth =pipeDown.depth;
    pipeDown.depth = pipeDown.depth + 1;

    pipeDown.depth = flappy.depth;
    flappy.depth = flappy.depth + 1;
    pipeDown.setCollider("rectangle",0,0,100,1400);
    
    //add each pipe1 to the group
    pipesDownGroup.add(pipeDown);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  youWin.visible = false;
  restart.visible = false;
  flappy.y=180;
  
  pipesUpGroup.destroyEach();
  pipesDownGroup.destroyEach();

  pipesUpGroup.setLifetimeEach(-1);
  pipesDownGroup.setLifetimeEach(-1);
  score = 0;
}