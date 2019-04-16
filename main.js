"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 1500, height: 900, fullscreen: true, webPreferences: { zoomFactor: 0.9, session: { clearCache: true } } });
    // webFrame.setZoomFactor(2);
    // load the dist folder from Angular
    // const ses = win.webContents.session.clearCache(function () {
    // });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/dist/index.html"),
        protocol: 'file:',
        slashes: true
    }));
    // The following is optional and will open the DevTools:
    win.webContents.openDevTools()
    win.on('closed', function () {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
// on macOS, closing the window doesn't quit the app
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// initialize the app's main window
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
