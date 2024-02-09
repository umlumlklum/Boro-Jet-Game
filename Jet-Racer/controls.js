document.addEventListener("keydown", (event) =>{
    const keyName = event.key;
    switch(keyName){
        case "w":
            Player.speedY = -1;
            break;
        case "s":
            Player.speedY = 1;
            break;
        case "Escape":
            let item = new PauseMenu();
            item.OpenPauseMenu();
            break;
        default:
            break;
    }
});

document.addEventListener("keyup", ()=>{
    Player.speedX = 0;
    Player.speedY = 0;
});