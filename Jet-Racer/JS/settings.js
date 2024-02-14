/*
    Main Window Settings File
*/

/*==================== IMPORTS ====================*/
const Store = require("electron-store");

/*==================== GLOBALS ====================*/
const storage = new Store();

/*==================== WINDOW SIZE ====================*/
function getWinSizeSettings(){
    const default_bounds = [800, 650];
    const size = storage.get("win-size");

    if(size){
        return size;
    }else{
        storage.set("win-size", default_bounds);
        return default_bounds;
    }
}

/*==================== SAVE WINDOW SIZE ====================*/
function saveBounds(bounds){
    if(bounds[0] == null || bounds[1] == null){
        bounds = [800, 650];
        storage.set("win-size", bounds);
    }else{
        storage.set("win-size", bounds);
    }
    console.log("Bounds Saved: ", bounds);
}

/*==================== EXPORTS ====================*/
module.exports = {
    getWinSizeSettings : getWinSizeSettings,
    saveBounds: saveBounds
}