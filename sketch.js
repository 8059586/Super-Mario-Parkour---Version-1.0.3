var gameState = 1;
var score = 0;
var highScore = 0;
function preload() {
  backgroundImg = loadImage("Images/mushroomkingdom.png");
  MarioImg = loadAnimation("Images/mario.png");
  obstacleImg = loadAnimation("Images/coinblock.gif");
  enemyImg = loadImage("Images/thwomp.png");
  gameoverImg = loadImage("Images/gameover.jpg");
  coinImg = loadImage("Images/coin.png");
  restartImg = loadImage("Images/restart.png");
  coinMp3 = loadSound("Images/coin.mp3");
  gameoverMp3 = loadSound("Images/gameover.mp3");
}

function setup() {
  createCanvas(2000, 700);
  Background = createSprite(1000, 350, 2000, 700);
  Mario = createSprite(200, 500);
  Mario.addAnimation("mario", MarioImg);
  Mario.scale = 0.25;
  restart = createSprite(1000, 320, 456, 456);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  obstaclesGroup = createGroup();
  enemiesGroup = createGroup();
  coinGroup = createGroup();
  ground = createSprite(1000, 720, 2000,20);
}

function draw() {
  background(0);
  if(gameState === 1){
  obstacles();
  enemies();
  coins();
  Mario.collide(ground);
  restart.visible = false;
  Background.addImage(backgroundImg);
  Background.scale = 0.5;
  coinGroup.setDepthEach(5);
  enemiesGroup.setDepthEach(4);
  obstaclesGroup.setDepthEach(3);
  for(var i = 0; i < coinGroup.length; i++){
    if(coinGroup.get(i).isTouching(Mario)){
      coinGroup.get(i).destroy();
      score++
      coinMp3.play();
    }
  }
  Mario.visible = true;

  Mario.velocityX = 0;
  if(keyDown("space")) {
    Mario.velocityY = -8;
  }
  if(keyDown("left")) {
    Mario.velocityX = -4;
  }
  if(keyDown("right")) {
    Mario.velocityX = 4;
  }
  Mario.velocityY += 0.2;
  Mario.collide(obstaclesGroup);
  if(Mario.isTouching(enemiesGroup)){
    gameState = 0;
    gameoverMp3.play();
  }
}
if(gameState === 0){
  Background.addImage(gameoverImg);
  Background.scale = 1.3;
  obstaclesGroup.destroyEach();
  enemiesGroup.destroyEach();
  Mario.visible = false;
  coinGroup.destroyEach();
  restart.visible = true;
  Mario.x = 200;
  Mario.y = 500;
  if(highScore < score){
    highScore = score;
  }
  if(mousePressedOver(restart)){
    
    score = 0;
    gameState = 1;
  }
}
  drawSprites();
  
  fill("green");
  textSize(30);
  text("Score: " + score, 1000,50);
  text("High Score: " + highScore, 1400,50)
}

function obstacles() {
  if(frameCount % 105 === 0) {
    obstacle = createSprite(2000, random(350,650));
    obstacle.velocityX = -4;
    obstacle.addAnimation("Hi",obstacleImg);
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;
    obstaclesGroup.add(obstacle);
  }
}

function enemies() {
  if(frameCount % 150 === 0) {
    enemy = createSprite(2000, random(350,650));
    enemy.velocityX = -5;
    enemy.addImage(enemyImg);
    enemy.scale = 0.5;
    enemy.lifetime = 400;
    enemiesGroup.add(enemy);
  }
}

function coins() {
  if(frameCount % 50 === 0) {
    coin = createSprite(2000, random(350,650));
    coin.velocityX = -4;
    coin.addImage("Hi",coinImg);
    coin.scale = 0.25;
    coin.lifetime = 500;
    coinGroup.add(coin);
  }
}