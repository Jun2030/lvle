import type { RenderProcessGoneDetails, WebContents } from 'electron'
import { app } from 'electron'
import Constants from './utils/constants'
import { createErrorWindow, createMainWindow } from './main-runner'
import { macOSDisableDefaultMenuItem } from './utils/menus'
import { registerShortcut } from './utils/hotkey'

let mainWindow
let errorWindow

app.on('ready', async () => {
  if (Constants.IS_DEV_ENV) {
    import('./index.dev')
  }
  macOSDisableDefaultMenuItem()
  registerShortcut()
  mainWindow = await createMainWindow(mainWindow)
})

app.on('activate', async () => {
  if (!mainWindow) {
    mainWindow = await createMainWindow(mainWindow)
  }
})

app.on('window-all-closed', () => {
  mainWindow = null
  errorWindow = null
  if (!Constants.IS_MAC) {
    app.quit()
  }
})

app.on('render-process-gone', (event: Event, webContents: WebContents, details: RenderProcessGoneDetails) => {
  errorWindow = createErrorWindow(errorWindow, mainWindow, details)
})

process.on('uncaughtException', () => {
  errorWindow = createErrorWindow(errorWindow, mainWindow)
})
