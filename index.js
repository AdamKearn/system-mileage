const electron = require('electron')
const { app, BrowserWindow, Menu } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('pages/main/index.html')

  // remove the menu bar at the top.
  //Menu.setApplicationMenu(null)    // comment this line out if you want to refresh the "page" for live preview.
}

app.on('ready', createWindow)
