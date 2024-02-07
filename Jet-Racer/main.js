function startGame(){
    Player = new player(30, 30, playerWidth, playerHeight, "red"); // player class
    Score = new text( 280, 40, "30px", "Consolas", "text","black"); // text class
    Background = new background(0, 0,canvasWidth, canvasHeight,"city.jpeg"); // background class
    Column.push(new column(10, 200, 300, 120, "green"));
    gameArea.start();
    
}
