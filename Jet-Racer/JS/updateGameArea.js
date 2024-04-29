// Local variables
this.startTime = new Date().getTime();
let intitalSpawn = 2;
let startSpawn = intitalSpawn;
let endSpawn = [10,20,30];

function everyInterval(n){
    return (gameArea.frameNumber / n) % 1 == 0;
}

function loadNextLevel(lvl){
    var compBackgroundImage = window.getComputedStyle(background);
    var backgroundImageUrl = compBackgroundImage.backgroundImage.replace(/^url\(['"]?([^'"]*)['"]?\)$/, '$1');
    const hasZoneFiles = localStorage.getItem('zoneFiles') !== null;
    if (hasZoneFiles){
        let zoneFiles = JSON.parse(localStorage.getItem('zoneFiles'));
        let nextLevel = zoneFiles[1][lvl];
        console.log(nextLevel);
        let parts = backgroundImageUrl .split('/');
        let currentLevel = parts[parts.length-1];
        if(nextLevel !== currentLevel){
            backgroundImageUrl = backgroundImageUrl.replace(currentLevel,nextLevel);
            console.log(backgroundImageUrl)
            background.style.backgroundImage = 'url('+backgroundImageUrl+')';
            // Get the stylesheets
            var stylesheets = document.styleSheets;
            // Loop through each stylesheet
            for (var i = 0; i < stylesheets.length; i++) {
                var rules = stylesheets[i].cssRules || stylesheets[i].rules;

                // Loop through each rule in the stylesheet
                for (var j = 0; j < rules.length; j++) {
                    // Check if the rule is for #background::after
                    if (rules[j].selectorText === "#background::after") {
                        // Change the background image URL of ::after
                        rules[j].style.backgroundImage = 'url('+backgroundImageUrl+')';
                    }
                }
            }
        }
    }
    else{
        alert("error: couldn't load next level");
    }
}

// With a given level config, finds every object that can be currently spawned.
function findSpawnableObjects(levelObjects){
    spawnables = new Set();

    // Checks each potential object for the current level.
    levelObjects.forEach((object) => {
        // Passes if current time is within the time frame of the object.
        // if (time >= object.startTime && time <= object.endTime){ // old code
        if (time >= startSpawn && time < endSpawn[level-1] || level-1 == endSpawn.length){
            // Passes if spawn rate condition is met.
            if (object.spawnRate >= Math.random()){
                spawnables.add(object.objectID);
            }
        } else if(time >= endSpawn[level-1] && level-1 != endSpawn.length){
            console.log(time);
            startSpawn = intitalSpawn + endSpawn[level-1];
            level += 1;
            // setTimeout(() => {loadNextLevel(level)}, (startSpawn)*1000); // optional transistion
            loadNextLevel(level-1);
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
                objects.add(new MovingSquare(x, (canvasHeight/2)-(Math.random()*300), 120, 120, 0, speed/100+2, 1, "black"));
                break;
            case Objects.HealthPack:
                objects.add(new HealthPack(x, Math.random()*canvasHeight, 60, 60, 0, 0, 1, "green"));
                break;
            case Objects.Slow:
                objects.add(new Slow(x, Math.random()*canvasHeight, 60, 60, 0, 0, 1, "blue"));
                break;
            case Objects.Phase:
                objects.add(new Phase(x, Math.random()*canvasHeight, 60, 60, 0, 0, 5000, "white"));
                break;
            case Objects.Missile:
                objects.add(new Missile(x, Math.random()*(canvasHeight-200)+100, 70, 30, 0, 0, 1, 1, "red"));
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
        if (object.x < (0 - object.width)){
            objects.delete(object);
        } else {
            if (player.isOverlapping(object)){
                if (object.interactionEvent(player)){
                    objects.delete(object);
                }
            }

            if (object.type == Objects.Missile){
                object.target(player);
            }
    
            object.speedX = -speed;
            object.move();
            object.clampToBounds();
            object.render();
        }
    });

    return;
}

// Updates the game, is called every once per interval from the gameArea.
function updateGameArea(){
    // Fetches the level config.
    let config = levelConfig[level-1];

    // Clears the frame to redraw the scene.
    gameArea.clear();
    gameArea.frameNumber += 1;

    // Updates distance based on number of frames passed.
    distance = Math.floor(gameArea.frameNumber / 10);

    // Updates time spent in the level.
    time = ((new Date().getTime() - startTime) / 1000).toFixed(2);  // Convert milliseconds to seconds

    // Attempts to spawn objects every interval.
    if (gameArea.frameNumber % (frameRate / 5.0) == 0.0){
        spawnObjects(findSpawnableObjects(config));
    }

    // Updates all objects once per interval.
    updateObjects();

    // Updates the player.
    player.handleInput();
    player.move();
    player.clampToBounds();
    player.render();

    player.powers.forEach((power, index) => {
        let powerImage = new Image();
        powerImage.src = power == null ? "../IMGS/Collectables/PhaseLocked.png" : "../IMGS/Collectables/Phase.png";

        let ctx = gameArea.context;
        ctx.drawImage(powerImage, (canvasWidth/2) + (50*index) - (50*1.5), statBoxHeight+10, 50, 50);

        if (index == player.activePower){
            let caretImage = new Image();
            caretImage.src = "../IMGS/Collectables/Caret.png";
            ctx.drawImage(caretImage, (canvasWidth/2) + (50*index) - (63), statBoxHeight+60, 25, 25);
        }
    });

    document.getElementById("statBox").textContent = "Level: " + level.toFixed(0) + " | Distance: " + distance.toFixed(0) + " | Time: " + time + " | Health: " + player.health.toFixed(0);
}
