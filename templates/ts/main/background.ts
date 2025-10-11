import path from "path"
import { app } from "electron"
import serve from "electron-serve"
import { createWindow } from "./create-window"

const isProd = process.env.NODE_ENV === "production"

if (isProd) {
  serve({ directory: "app" })
}

await app.whenReady()

const mainWindow = createWindow({
  width: 1000,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
  },
})

if (isProd) {
  await mainWindow.loadURL("app://./home")
} else {
  const port = process.argv[2]
  await mainWindow.loadURL(`http://localhost:${port}/home`)
  mainWindow.webContents.openDevTools()
}
