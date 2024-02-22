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
    let obstacleSpeed = -2;
    let currentTime = new Date().getTime(); 
    time = ((currentTime - startTime) / 1000).toFixed(2);  // Convert milliseconds to seconds
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;

    for (let i = 0; i < obstacles.length; i++){
        if (player.isOverlapping(obstacles[i])){
            gameArea.stop();
            return;
        }
    }

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
