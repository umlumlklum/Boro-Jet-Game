/*
-removed Distance class 
-added Statbox and Stats
-removed instanc of obstacles Columns
*/ 
function startGame(){
    Player = new player(30, 30, playerWidth, playerHeight, "red"); // player class
    Background = new background(0, 0,canvasWidth, canvasHeight,"city.jpeg"); // background class
    Statbox = new statbox(0, 0, canvasWidth, canvasHeight/15,"black",.3) 
    Stats = new text( 3, 40, "30px", "Consolas", "text","black"); // text class 
    gameArea.start();
    
}

