this.startTime = new Date().getTime();

function everyInterval(n){
    return (gameArea.frameNumber / n) % 1 == 0;
}

// With a given level config, finds every object that can be currently spawned.
function findSpawnableObjects(levelObjects){
    spawnables = new Set();

    // Checks each potential object for the current level.
    levelObjects.forEach((object) => {
        // Passes if current time is within the time frame of the object.
        if (time >= object.startTime && time <= object.endTime){
            // Passes if spawn rate condition is met.
            if (object.spawnRate >= Math.random()){
                spawnables.add(object.objectID);
            }
        }
    });

    return spawnables;
}

function spawnObjects(spawnables){
    let x = gameArea.canvas.width;

    // Spawns an object based on if its spawnable.
    spawnables.forEach((object) => {
        switch (Objects[object]){
            case Objects.Column:
                // Needs implemented.
                break;
            case Objects.MovingSquare:
                objects.add(new MovingSquare(x, Math.random()*canvasHeight, 100, 100, 0, speed/100+2, 1, "black"));
                break;
            case Objects.HealthPack:
                objects.add(new HealthPack(x, Math.random()*canvasHeight, 50, 50, 0, 0, 1, "green"));
                break;
            case Objects.Slow:
                objects.add(new Slow(x, Math.random()*canvasHeight, 50, 50, 0, 0, 1, "blue"));
                break;
            case Objects.Missile:
                objects.add(new Missile(x, Math.random()*(canvasHeight-200)+100, 50, 20, 0, 0, 1, 1, "red"));
                break;
            default:
                break;
        }
    });

    return;
}

// Broadcasts updates to collision, movement, and rendering to each object.
function updateObjects(){
    objects.forEach((object) => {
        if (player.isOverlapping(object)){
            switch (object.type){
                case Objects.Column:
                    object.collideWith(player);
                    objects.delete(object);
                    return;
                case Objects.MovingSquare:
                    object.collideWith(player);
                    objects.delete(object);
                    return;
                case Objects.HealthPack:
                    object.collect();
                    objects.delete(object);
                    break;
                case Objects.Slow:
                    object.collect();
                    objects.delete(object);
                    break;
                case Objects.Missile:
                    object.interactWith(player);
                    objects.delete(object);
                    break;
            }
        }

        if (object.type == Objects.Missile){
            object.target(player);
        }

        object.speedX = -speed;
        object.move();
        object.clampToBounds();
        object.render();
    });

    return;
}

// Updates the game, is called every once per interval from the gameArea.
function updateGameArea(){
    // Fetches the level config.
    let config;
    for (let i = 0; i < levelConfig.length; i++){
        if (levelConfig[i].levelID == level){
            config = levelConfig[i];
        }
    }

    // Clears the frame to redraw the scene.
    gameArea.clear();
    gameArea.frameNumber += 1;

    // Updates distance based on number of frames passed.
    distance = Math.floor(gameArea.frameNumber / 10);

    // Updates time spent in the level.
    time = ((new Date().getTime() - startTime) / 1000).toFixed(2);  // Convert milliseconds to seconds

    // Sets game speed based on current level config.
    speed = config.baseSpeed;

    // Attempts to spawn objects every interval.
    if (gameArea.frameNumber % (frameRate / config.spawnFrequency) == 0){
        spawnObjects(findSpawnableObjects(config.objects));
    }

    // Updates all objects once per interval.
    updateObjects();

    // Updates the player.
    player.handleInput();
    player.move();
    player.clampToBounds();
    player.render();

    document.getElementById("statBox").textContent = "Level: " + level.toFixed(0) + " | Distance: " + distance.toFixed(0) + " | Time: " + time + " | Speed: " + speed.toFixed(2) + " | Health: " + player.health.toFixed(0) + " | Power Ups: " + player.powerUps.length.toFixed(0);
}
