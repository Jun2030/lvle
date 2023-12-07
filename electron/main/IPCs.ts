import type { BrowserWindow } from 'electron'
import { ipcMain, shell } from 'electron'
import Constants from './utils/constants'

/*
 * IPC 通信
 **/
export default class IPCs {
  static initialize(window: BrowserWindow): void {
    // 获取应用程序版本
    ipcMain.on('msgRequestGetVersion', () => {
      window.webContents.send('msgReceivedVersion', Constants.APP_VERSION)
    })

    // 通过web浏览器打开url
    ipcMain.on('msgOpenExternalLink', async (event, url: string) => {
      await shell.openExternal(url)
    })
  }
}
