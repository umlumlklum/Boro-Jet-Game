function startGame(){
    fetch('../JSON/level_config.json')
        .then(response => response.json())
        .then(data => levelConfig = data)
        .then(() => {
            gameArea = new GameArea();
            player = new Player(30, 30, playerWidth, playerHeight, 0, 0, 3, 1, "red"); // player class
            gameArea.start();
        })
        .catch(error => console.error('Error fetching JSON:', error));             
}