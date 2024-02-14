/*
    Main Window Processing File
*/

/*==================== IMPORTS ====================*/
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { getWinSizeSettings, saveBounds } = require("./settings");

/*==================== GLOBALS ====================*/
const isMac = process.platform === 'darwin'; //test if the platform is mac/apple
const isDev = true;                          //set to false for production / true for development

/*==================== MAIN WINDOW LOGIC ====================*/
function createMainWindow(){
    //get window {x, y} from settings
    const bounds = getWinSizeSettings();

    //define the main window
    const mainWindow = new BrowserWindow({
        title: "Test Title",
        width: (isDev) ? (bounds[0]/2) + 500 : bounds[0],
        height: bounds[1],
        autoHideMenuBar: true
    });

    //open the console for testing if true
    if(isDev){ mainWindow.webContents.openDevTools(); }

    //save the size of the window, when closed, in settings
    mainWindow.addListener("resize", function(){
        let newBounds = [mainWindow.getBounds().width, mainWindow.getBounds().height];
        saveBounds(newBounds);
    });

    //path for files to be rendered in the main window
    mainWindow.loadFile(path.join(__dirname, './Render_Files/index.html'));
}

/*==================== MAIN WINDOW CREATION ====================*/
app.whenReady()
    .then(()=>{
        //when the app is compiled the main window is created here
        createMainWindow();
        app.on('activate', ()=>{
            if(BrowserWindow.getAllWindows().length === 0){
                createMainWindow();
            }
        });
    })
    .catch(()=>{
        console.warn("error in 'startup' app window creation");
    });

/*==================== CLOSING WINDOW LOGIC ====================*/
app.on('window-all-closed', ()=>{
    if(!isMac){
        app.quit();
    }
});

/*==================== CONSOLE ERROR EVASION ====================*/
app.commandLine.appendSwitch('ignore-gpu-blacklist'); //chromium has problems with gpu rendering
app.commandLine.appendSwitch('disable-gpu');          //disable the gpu for error evasion