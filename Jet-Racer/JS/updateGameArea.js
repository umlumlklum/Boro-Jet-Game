this.startTime = new Date().getTime();

function everyInterval(n){
    if((gameArea.frameNumber / n) % 1 == 0){ 
        return true; 
    }

    return false;
}

function fixLength(num, desiredLength) { 
    // Convert the number to a string
    let numStr = num.toString();
  
    // If the number is shorter than the desired length, pad with leading zeros
    while (numStr.length < desiredLength) {
      numStr = ' ' + numStr;
    }
  
    // If the number is longer than the desired length, truncate
    if (numStr.length > desiredLength) {
      numStr = numStr.slice(0, desiredLength);
    }
  
    return numStr;
}

function updateGameArea(){
    time = ((new Date().getTime() - startTime) / 1000).toFixed(2);  // Convert milliseconds to seconds
    let speed = -1 * Math.sqrt(time) - 2;

    let x, height, gap, minHeight, maxHeight, minGap, maxGap;

    objects.forEach((object) => {
        if (player.isOverlapping(object)){
            switch (object.type){
                case Components.Column:
                    object.collide(player);
                    objects.delete(object);
                    return;
                case Components.HealthPack:
                    object.collect();
                    objects.delete(object);
                    break;
            }
        }
    });

    gameArea.clear();
    gameArea.frameNumber += 1;

    if (gameArea.frameNumber == 1 || everyInterval(150)){
        x = gameArea.canvas.width;
        minHeight = 20;
        maxHeight = 175;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        
        objects.add(new Column(x, 0, 10, height, speed, 0, "green", 1));
        objects.add(new Column(x, height + gap, 10, x - height - gap, speed, 0, "green", 1));
    }

    objects.forEach((object) => {
        object.speedX = speed;
        object.update();
    });

    player.update();

    statBox.update();
    stats.text = "Distance: " + fixLength(Math.floor(gameArea.frameNumber / 10),5) +" | Time: "+fixLength(time,8) + " | Speed: " + fixLength(Math.abs(speed), 4) + " | LVL: "+fixLength(level,2)+" | Health: "+player.health+" | Power Ups: "+player.powerUps.length;
    stats.update();
}