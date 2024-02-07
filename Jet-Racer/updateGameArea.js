function everyInterval(n){
    if((gameArea.frameNumber / n) % 1 == 0){ return true; }
    return false;
}

function updateGameArea(){
    let obstacleSpeed = -2;
    let backgroundSpeed = -1.5;

    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for(let i = 0; i < Column.length; i++){
        if(Player.crashWith(Column[i])){
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
        // edit obstacle is now column
        Column.push(new column(x, 0, 10, height,"green"));
        Column.push(new column(x, height + gap, 10, x - height - gap, "green"));
    }
    for(let i = 0; i < Column.length; i++){
        Column[i].x += obstacleSpeed;
        Column[i].update();
    }

    let scoreNum = Math.floor(gameArea.frameNumber / 10)
    Score.text = "SCORE: " + scoreNum;
    Score.update();
    Player.newPos();
    Player.update();
}
