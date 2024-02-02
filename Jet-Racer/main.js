function startGame(){
    Player = new component(30, 30, "red", playerWidth, playerHeight);
    Score = new component("30px", "Consolas", "black", 280, 40, "text");
    Background = new component(canvasWidth, canvasHeight, "city.jpeg", 0, 0, "background");
    Obstacle.push(new component(10, 200, "green", 300, 120));
    gameArea.start();
}