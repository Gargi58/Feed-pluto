var dog,sadDog,happyDog;
var feed , addFood , lastFed;

var foodObj , foodStock , foodS;
var database ;




function preload(){
  sadDog=loadImage("Images/dog1.png");
  happyDog=loadImage("Images/doggy.png");
  bg = loadImage("Images/room.jpg")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400); 

  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readFoodStock)

  dog=createSprite(800,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.4;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)


 
}

function draw() {
  background(bg);
  foodObj.display();

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
lastFed=data.val()
  })
   //write code to display text lastFed time here

   fill(255,255,255)

   if(lastFed>=12){
     textSize(20);
     strokeWeight(4)
     stroke ("blue");
     fill(255,207,15);
     text("Last Fed: "+ lastFed%12+"PM",290,30)
   }else if(lastFed==0){
    textSize(20);
    strokeWeight(4)
    stroke ("bllue");
    fill(255,207,15);
     text("Last Feed: 12 AM",290,30)
   }else{
    textSize(20);
    strokeWeight(4)
    stroke ("blue");
    fill(255,207,15);
     text("Last Fed: "+ lastFed+"AM",290,30)
   }
  drawSprites();

  
}

function readFoodStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{
  

  var food_stock_val = foodObj.getFoodStock();

  if(food_stock_val <= 0){
    dog.addImage(sadDog); 
    foodObj.updateFoodStock(food_stock_val * 0);
  }else{
    dog.addImage(happyDog); 
    foodObj.updateFoodStock(food_stock_val -1);
  }

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}


//function to add food in stock
  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
