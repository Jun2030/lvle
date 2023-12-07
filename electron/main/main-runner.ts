import type { RenderProcessGoneDetails } from 'electron'
import { BrowserWindow, app } from 'electron'
import Constants from './utils/constants'
import IPCOn from './IPCs'

/**
 * @description 退出应用程序
 * @param mainWindow - 主窗口对象
 */
function exitApp(mainWindow: BrowserWindow): void {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide()
  }
  mainWindow.destroy()
  app.exit()
}

/**
 * @description 创建主窗口
 * @param mainWindow - 主窗口实例
 * @returns Promise<BrowserWindow> 返回一个Promise对象，该对象的解析值为BrowserWindow实例
 */
export async function createMainWindow(mainWindow: BrowserWindow): Promise<BrowserWindow> {
  mainWindow = new BrowserWindow({
    title: Constants.APP_NAME,
    show: false,
    width: Constants.IS_DEV_ENV ? 1200 : 800,
    height: 600,
    useContentSize: true,
    webPreferences: Constants.DEFAULT_WEB_PREFERENCES,
  })

  mainWindow.setMenu(null)

  mainWindow.on('close', (event: Event): void => {
    event.preventDefault()
    exitApp(mainWindow)
  })

  mainWindow.webContents.on('did-frame-finish-load', (): void => {
    if (Constants.IS_DEV_ENV) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.once('ready-to-show', (): void => {
    mainWindow.setAlwaysOnTop(true)
    mainWindow.show()
    mainWindow.focus()
    mainWindow.setAlwaysOnTop(false)
  })

  // 初始化ipc通信
  IPCOn.initialize(mainWindow)

  if (Constants.IS_DEV_ENV) {
    await mainWindow.loadURL(Constants.APP_INDEX_URL_DEV)
  } else {
    await mainWindow.loadFile(Constants.APP_INDEX_URL_PROD)
  }

  return mainWindow
}
/**
 * @description 创建错误窗口
 * @param errorWindow - 错误窗口对象
 * @param mainWindow - 主窗口对象
 * @param _details - 渲染进程消失的详细信息（可选）
 * @returns 返回错误窗口对象的Promise
 */
export async function createErrorWindow(errorWindow: BrowserWindow, mainWindow: BrowserWindow, _details?: RenderProcessGoneDetails): Promise<BrowserWindow> {
  if (!Constants.IS_DEV_ENV) {
    mainWindow?.hide()
  }

  errorWindow = new BrowserWindow({
    title: Constants.APP_NAME,
    show: false,
    resizable: Constants.IS_DEV_ENV,
    webPreferences: Constants.DEFAULT_WEB_PREFERENCES,
  })

  errorWindow.setMenu(null)

  if (Constants.IS_DEV_ENV) {
    await errorWindow.loadURL(`${Constants.APP_INDEX_URL_DEV}#/error`)
  } else {
    await errorWindow.loadFile(Constants.APP_INDEX_URL_PROD, { hash: 'error' })
  }

  errorWindow.on('ready-to-show', (): void => {
    if (!Constants.IS_DEV_ENV && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.destroy()
    }
    errorWindow.show()
    errorWindow.focus()
  })

  errorWindow.webContents.on('did-frame-finish-load', (): void => {
    if (Constants.IS_DEV_ENV) {
      errorWindow.webContents.openDevTools()
    }
  })

  return errorWindow
}
