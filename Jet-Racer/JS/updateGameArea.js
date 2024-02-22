
    gameArea.clear();
    gameArea.frameNumber += 1;

    if (gameArea.frameNumber == 1 || everyInterval(150)){
        x = gameArea.canvas.width;
        colHeight = 222;
        minColY = statBoxHeight;
        maxColY = canvasHeight-colHeight;
        posColY = Math.floor(Math.random()*(maxColY-minColY+1)+minColY);
        obstacles.push(new Column(x, posColY, 10, colHeight, 0, 0, "green"));
    }
    
    for (let i = 0; i < obstacles.length; i++){
        obstacles[i].x += obstacleSpeed;
        obstacles[i].update();
    }

    player.update();
    let distNum = Math.floor(gameArea.frameNumber / 10);
    document.getElementById("statBox").textContent = "Distance: " + fixLength(distNum,5) +" | Time: "+fixLength(time,8) +" | LVL: "+fixLength(level,2)+" | Health: "+health+" | Power Ups: "+powerUps.length;
}
