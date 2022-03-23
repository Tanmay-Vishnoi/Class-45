var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obs1Img, obs2Img, obs3Img;
var obsTop1Img, obsTop2Img;
var topObstacle, bottomObstacle;
var topObsGroup, bottomObsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obs1Img = loadImage("assets/obsBottom1.png");
obs2Img = loadImage("assets/obsBottom2.png");
obs3Img = loadImage("assets/obsBottom3.png");
obsTop1Img = loadImage("assets/obsTop1.png");
obsTop2Img = loadImage("assets/obsTop2.png");

}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

bottomObsGroup = new Group();
topObsGroup = new Group();

}

function draw() {
  
  background("black");

  if(gameState === PLAY) {

      //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }
        
          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
        

        spawnTopObstacles();
        spawnBottomObstacles();

        if(topObsGroup.isTouching(balloon) || bottomObsGroup.isTouching(balloon)
        || bottomGround.isTouching(balloon) || topGround.isTouching(balloon)) {

          gameState = END;
        }

  } 
   
  if(gameState === END) {

    console.log("gameState is END")
  }

        drawSprites();
        
}

function spawnBottomObstacles() {
  if(frameCount%60 === 0) {

     bottomObstacle = createSprite(400, 340, 50, 50);
     //bottomObstacle.addImage(obs1Img);
     bottomObstacle.velocityX = -4;
     bottomObstacle.scale = 0.07;

     var rnum = Math.round(random(1,3));
     switch(rnum) {
       case 1: bottomObstacle.addImage(obs1Img);
                break;
       case 2: bottomObstacle.addImage(obs2Img);
                break;
       case 3: bottomObstacle.addImage(obs3Img);
                break;
       default:break;
     }
     bottomObstacle.lifetime= 100;
     balloon.depth=bottomObstacle.depth;
     balloon.depth=balloon.depth+1;

     bottomObsGroup.add(bottomObstacle);
  }
}

function spawnTopObstacles() {
  if(frameCount%75 === 0) {

    topObstacle = createSprite(400, 50, 50, 50);
    //topObstacle.addImage(obsTop1Img);
    topObstacle.velocityX = -4;
    topObstacle.scale = 0.1;

    topObstacle.y = Math.round(random(10, 100));

    var rnum = Math.round(random(1,2));
     switch(rnum) {
       case 1: topObstacle.addImage(obsTop1Img);
                break;
       case 2: topObstacle.addImage(obsTop2Img);
                break;
       
       default:break;
     }

     topObstacle.lifetime= 100;
     balloon.depth= topObstacle.depth;
     balloon.depth=balloon.depth+1;

     topObsGroup.add(topObstacle);
  }
}