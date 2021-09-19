var PLAY = 1; 
var END = 0;
var gameState = PLAY; 

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, obs1, obs2, obs3, obs4, obs4, obs5, obs6;
var cloudsGroup, obstaclesGroup;
var score;
var gameOver, restart;
var gameOverimg, restartimg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300, 100);
  gameOver.addImage("gameOver", gameOverimg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300, 140);
  restart.addImage("restart", restartimg);
  restart.scale = 0.3;
  restart.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(255);
  
  text("Score: "+ score, 480, 50);
  
  if (gameState === PLAY){
      
      
  score = score+Math.round(getFrameRate()/60);
     ground.velocityX = -5;
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  spawnClouds();
  spawnObstacles();
    if (obstaclesGroup.isTouching(trex)) {
        gameState = END;
        }
  } 
  else if (gameState === END){
           gameOver.visible = true;
           restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("collided", trex_collided);
    
    obstaclesGroup.setVelocityXEach (0);
    obstaclesGroup.setLifetimeEach (-1);
    
    cloudsGroup.setVelocityXEach (0);
    cloudsGroup.setLifetimeEach (-1);
    
    if (mousePressedOver(restart)){
      reset();
    }
             }
  
  drawSprites();    
}
 
function reset(){
  gameState = PLAY;
  
  obstaclesGroup.destroyEach ();
  cloudsGroup.destroyEach ();
  
  
  trex.changeAnimation ("running", trex_running);
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage( "cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add (cloud);
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1: obstacle.addImage("obstacle1", obs1);
        break;
      case 2: obstacle.addImage("obstacle2", obs2);
        break;
      case 3: obstacle.addImage("obstacle3", obs3);
        break;
      case 4: obstacle.addImage("obstacle4", obs4);
        break;        
      case 5: obstacle.addImage("obstacle5", obs5);
        break;
      case 6: obstacle.addImage("obstacle6", obs6);
        break;
        default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add (obstacle);
  }
}











