import { BrowserWindow, globalShortcut } from 'electron'

export function registerShortcut() {
  globalShortcut.register('CommandOrControl+Shift+|', () => {
    const currentWindow = BrowserWindow.getFocusedWindow()
    currentWindow && currentWindow.webContents.openDevTools()
  })
}
