var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,boy2,cash,diamonds,jwellery,sword;
var pathImg,boyImg,boy2Img,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var ruby, rubyImg;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  rubyImg = loadImage("ruby.png");
  boy2Img = loadImage("runner1.png");
  
}

function setup(){
  
  createCanvas(400,400);
  
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(200,380,20,20);
boy.addAnimation("boyRunning",boyImg);
boy.addImage(boy2Img);
boy.scale=0.08;
  
  end = createSprite(200,200,10,10);
  end.scale = 0.5;
  end.addImage(endImg);
  end.visible = false;
  
  
  
  //ruby = createSprite(200,200,10,10);
  //ruby.scale = 0.1
  //ruby.addImage(rubyImg);
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === PLAY){
    if(path.y > 400){
    path.y = height/2;
   }
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection +150
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection +300
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection +200
      
    }
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if(swordGroup.isTouching(boy)){
      gameState = END;
    }
    
  }
  
  if(gameState === END){
    
        path.velocityY = 0;
        cashG.setVelocityEach(0);
        diamondsG.setVelocityEach(0);
        jwelleryG.setVelocityEach(0);
        swordGroup.setVelocityEach(0);
        boy.destroyEach();
        end.visible = true;
    
    
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
