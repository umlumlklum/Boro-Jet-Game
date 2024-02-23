function startGame(){
    gameArea = new GameArea();

    player = new Player(30, 30, playerWidth, playerHeight, 0, 0, 3, 1, "red"); // player class
    //statBox = new StatBox(0, 0, canvasWidth, canvasHeight/15,"black",.3);
    //stats = new Text(3, 40, "30px", "Consolas", "text", "black"); // text class 

    gameArea.start();
}