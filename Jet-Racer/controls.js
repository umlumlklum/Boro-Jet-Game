document.addEventListener("keydown", (event) =>{
    const keyName = event.key;
    
    switch(keyName){
        case "w":
            player.speedY = -1;
            break;
        case "s":
            player.speedY = 1;
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
    player.speedX = 0;
    player.speedY = 0;
});