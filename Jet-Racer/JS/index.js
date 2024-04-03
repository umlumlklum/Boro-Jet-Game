const startEndlessBtn = document.getElementById("startEndlessBtn");
const statShipSelect = document.getElementById("startShipSelect"); 
const playarAvatar = document.getElementById("playerAvatar");

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}   

startEndlessBtn.addEventListener("click", function(){
    localStorage.setItem("avatar",playerAvatar.src);
    document.getElementsByTagName("img")[0].style.animationName = "JetTakeOffAnimation";
    document.getElementsByTagName("img")[0].style.animationDuration = "2s";
    sleep(1090).then(()=>{location.href = "./HTML/game.html";});
});

startShipSelect.addEventListener("click",function(){ 
    location.href="./HTML/ship_select.html"
});

startZoneSelect.addEventListener("click",function(){ 
    location.href="./HTML/zoneSelect.html"
});

const hasShipFile = localStorage.getItem('shipFile') !== null;
if (hasShipFile){
    const shipFile = localStorage.getItem('shipFile');
    let parts = playerAvatar.src.split('/');
	let currentShip= parts[parts.length-1];
    if(currentShip !== shipFile)
        playerAvatar.src= playerAvatar.src.replace(currentShip,shipFile);
}
