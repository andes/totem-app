import { app, BrowserWindow, webFrame } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1500, height: 900, fullscreen: true, webPreferences: {
      nativeWindowOpen: true, // add this
      nodeIntegration: false,
      zoomFactor: 1
    }
  });
  var pageSettingsSilent = {
    'marginsType': 1, //No Margin
    'printBackground': true,
    'pageSize': {
      "height": 297000,
      "width": 72000
    },
    'silent': true,
    'deviceName': 'HP-LaserJet-p2055dn'
  }
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );
  win.webContents.openDevTools();
  console.log(pageSettingsSilent);


  win.on('closed', () => {
    win = null;
  });

  win.webContents.print(pageSettingsSilent);
  console.log(win.webContents.getPrinters());
}

app.on('ready', createWindow);

// on macOS, closing the window doesn't quit the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// initialize the app's main window
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
