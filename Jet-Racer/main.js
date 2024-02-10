function startGame(){
    player = new Player(30, 30, playerWidth, playerHeight, 0, 0, 3, 1, "red"); // player class
    score = new Text(280, 40, "30px", "Consolas", "black"); // text class
    background = new Background(0, 0, canvasWidth, canvasHeight, 0, 0, "city.jpeg"); // background class
    obstacles.push(new Column(10, 200, 300, 120, 0, 0, "green"));
    gameArea.start();
}
