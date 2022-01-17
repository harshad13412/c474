var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("ssd.png");
  mainRacerImg1 = loadAnimation("1.png","2.png","3.png","4.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("jk.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opp.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1500,350);
// Moving background
path=createSprite(1000,150);
path.addImage(pathImg);
path.scale = 2
//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.5;
  
//set collider for mainCyclis

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -8
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
   
  //code to reset the background

  
  
    //code to play cycle bell sound
 
  
  if(keyDown("space")){
    cycleBell.play();

  }

  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } 
  }
 
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     
    }
     if (distance === 800){ 
       gameState = END ;
     }

    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    
  
  

    //Add code to show restart game instrution in text here
  

    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
       

    //write condition for calling reset( )
    if(mousePressedOver(gameOver)){
      reset() 
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.3;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.6;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}



//create reset function here

  function reset() {
 gameState = PLAY
 gameOver.visible = false
 mainCyclist.addAnimation("SahilRunning",mainRacerImg1)
 pinkCG.destroyEach()
 pinkCG.setVelocityXEach(0)
 redCG.destroyEach()
 yellowCG.destroyEach(    )

 distance = 0

}





  




