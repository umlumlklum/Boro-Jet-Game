function everyInterval(n){
    if((gameArea.frameNumber / n) % 1 == 0){ return true; }
    return false;
}

function updateGameArea(){
    let obstacleSpeed = -2;
    let backgroundSpeed = -1.5;

    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for(let i = 0; i < Obstacle.length; i++){
        if(Player.crashWith(Obstacle[i])){
            gameArea.stop();
            return;
        }
    }
    gameArea.clear();
    Background.speedX = backgroundSpeed;
    Background.newPos();
    Background.update();
    gameArea.frameNumber += 1;
    if(gameArea.frameNumber == 1 || everyInterval(150)){
        x = gameArea.canvas.width;
        minHeight = 20;
        maxHeight = 175;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        Obstacle.push(new component(10, height, "green", x, 0));
        Obstacle.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for(let i = 0; i < Obstacle.length; i++){
        Obstacle[i].x += obstacleSpeed;
        Obstacle[i].update();
    }

    let scoreNum = Math.floor(gameArea.frameNumber / 10)
    Score.text = "SCORE: " + scoreNum;
    Score.update();
    Player.newPos();
    Player.update();
}