/**
 * Electron Main Process
 * Für Desktop-App und ISO-Erstellung
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'assets/images/logo/weedgame.png'),
    title: "Luca's Snake Adventure",
    backgroundColor: '#0F0F0F',
    show: false
  });

  // Lade index.html
  mainWindow.loadFile('index.html');

  // Zeige Fenster wenn bereit
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // DevTools nur im Development
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Verhindere Navigation zu externen URLs
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== 'file://') {
      event.preventDefault();
    }
  });
}

// App Event Handlers
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Verhindere neue Fenster
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});

