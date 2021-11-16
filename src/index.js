const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 850,
    icon: "build/icon.png",
  });

  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
});

  let tray = null
app.whenReady().then(() => {
  tray = new Tray('./build/icon.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: function() {mainWindow.show()} },
    { label: 'Quit', click: function() {app.isQuiting = true; app.quit()}},
  ])
  tray.setToolTip('Chatter Box')
  tray.setContextMenu(contextMenu)
})

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
//app.on('window-all-closed', () => {
//  if (process.platform !== 'darwin') {
//    app.quit();
//  }
//});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

