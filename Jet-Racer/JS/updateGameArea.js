this.startTime = new Date().getTime();

function everyInterval(n){
    return (gameArea.frameNumber / n) % 1 == 0;
}

function updateGameArea(){
    time = ((new Date().getTime() - startTime) / 1000).toFixed(2);  // Convert milliseconds to seconds
    speed = Math.sqrt(time) + 2 + speedMod;
    
    if (speed < 0){
        speed = 0;
    }

    objects.forEach((object) => {
        if (player.isOverlapping(object)){
            switch (object.type){
                case Components.Column:
                    object.collide(player);
                    objects.delete(object);
                    return;
                case Components.MovingSquare:
                    object.collide(player);
                    objects.delete(object);
                    return;
                case Components.HealthPack:
                    object.collect();
                    objects.delete(object);
                    break;
                case Components.Slow:
                    object.collect();
                    objects.delete(object);
                    break;
            }
        }
    });

    gameArea.clear();
    gameArea.frameNumber += 1;

    if (gameArea.frameNumber == 1 || everyInterval(150)){
        let x = gameArea.canvas.width;
        
        // column values
        let colHeight = 222;
        minColY = statBoxHeight;
        maxColY = canvasHeight-colHeight;
        posColY = Math.floor(Math.random()*(maxColY-minColY+1)+minColY);
        // objects.add(new Column(x, posColY, 10, colHeight, 0, 0, "green", 1));

        // moving square values 
        let sizeMS = 100
        minMSY = statBoxHeight;
        maxMSY = canvasHeight-sizeMS;
        posMSY = Math.floor(Math.random()*(maxMSY-minMSY+1)+minMSY);
        objects.add(new MovingSquare(x, posMSY, sizeMS, sizeMS, 0, speed/100+2, "black", 1));
    }
    
    objects.forEach((object) => {
        object.speedX = -speed;
        object.update();
    });

    player.update();

    let distNum = Math.floor(gameArea.frameNumber / 10);
    document.getElementById("statBox").textContent = "Distance: " + distNum.toFixed(0) + " | Time: " + time + " | Speed: " + speed.toFixed(2) + " | LVL: " + level.toFixed(0) + " | Health: " + player.health.toFixed(0) + " | Power Ups: " + player.powerUps.length.toFixed(0);
}