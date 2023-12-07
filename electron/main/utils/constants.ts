import { join } from 'node:path'
import { name, version } from '../../../package.json'

export default class Constants {
  // 显示应用名称(首字母大写)
  static APP_NAME = name.charAt(0).toUpperCase() + name.slice(1)
  // 显示应用版本
  static APP_VERSION = version
  // 是否是开发环境
  static IS_DEV_ENV = process.env.NODE_ENV === 'development'
  // 是否是 macOS 平台
  static IS_MAC = process.platform === 'darwin'
  // 默认的 webPreferences
  static DEFAULT_WEB_PREFERENCES = {
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    preload: join(__dirname, '../preload/index.js'),
  }

  static APP_INDEX_URL_DEV = 'http://localhost:5173/index.html'
  static APP_INDEX_URL_PROD = join(__dirname, '../index.html')
}
