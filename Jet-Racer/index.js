const startEndlessBtn = document.getElementById("startEndlessBtn");

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

startEndlessBtn.addEventListener("click", function(){
    document.getElementsByTagName("img")[0].style.animationName = "JetTakeOffAnimation";
    document.getElementsByTagName("img")[0].style.animationDuration = "2s";
    sleep(1090).then(()=>{location.href = "./HTML/game.html";});
});

/*startEndlessBtn.onclick = () =>{
    let bool = false;
    if(bool){
        startEndlessBtn.href = "./HTML/game.html";
    }
    document.getElementsByTagName("img")[0].style.animationName = "JetTakeOffAnimation";
    sleep(1000).then(()=>{bool = true});
}*/