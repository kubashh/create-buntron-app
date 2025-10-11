import { BrowserWindow, type BrowserWindowConstructorOptions } from "electron"

export const createWindow = (options: BrowserWindowConstructorOptions): BrowserWindow => {
  const state = {}

  function getCurrentPosition() {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    }
  }

  function saveState() {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition())
    }
  }

  const win = new BrowserWindow({
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      ...options.webPreferences,
    },
  })

  win.on("close", saveState)

  return win
}
