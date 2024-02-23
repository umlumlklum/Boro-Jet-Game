function startGame(){
    gameArea = new GameArea();
    player = new Player(30, 30, playerWidth, playerHeight, 0, 0, 3, 1, "red"); // player class
    gameArea.start();
}