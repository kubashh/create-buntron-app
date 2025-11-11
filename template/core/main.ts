import { app, BrowserWindow } from "electron"

function createWindow() {
  const window = new BrowserWindow({
    title: `Test`,
    icon: `./build/icon.png`,
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (app.isPackaged) {
    window.loadFile(`../../../index.html`)
  } else {
    window.loadURL(`http://localhost:${3000}`)
    window.webContents.openDevTools()
  }
}

// Events
app.on(`window-all-closed`, () => {
  if (process.platform !== `darwin`) app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on(`activate`, () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
