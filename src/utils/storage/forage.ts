import forage from 'localforage'
import { decrypt, encrypt } from '../crypto'
import { DEFAULT_CACHE_TIME, DEFAULT_FORAGE_CONFIG, IS_ENCRYPT } from '@/config'

export class ForageStg {
  private _forage
  private _isEncrypt: boolean

  /**
   * @param forageConfig forage配置
   * @param isEncrypt 是否加密
   */
  constructor(forageConfig: Partial<ForageConfig>, isEncrypt = IS_ENCRYPT) {
    this._forage = forage.createInstance({
      ...Object.assign(DEFAULT_FORAGE_CONFIG, forageConfig),
      ...{ driver: [forage.INDEXEDDB, forage.LOCALSTORAGE] },
    })
    this._isEncrypt = isEncrypt
  }

  /**
   * @description 将对应键名的数据保存到离线仓库
   * @param {string} k - 键名
   * @param {T} v - 键值
   * @param {number} m - 缓存时间（单位：分，默认：0分钟，永久缓存）
   * @returns {Promise<T>} - 返回一个Promise对象，该对象的值为缓存数据的值
   */
  public async setItem<T>(k: string, v: T, m = DEFAULT_CACHE_TIME): Promise<T> {
    try {
      const data = {
        data: this._isEncrypt ? encrypt(v) : v,
        expires: m ? new Date().getTime() + m * 60 * 1000 : DEFAULT_CACHE_TIME,
      }
      const value = await this._forage.setItem(k, data)
      return Promise.resolve(this._isEncrypt ? decrypt(value.data) : value.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * @description 从离线仓库中获取对应键名的值
   * @param {string} k - 键名
   * @returns {Promise<T>} - 返回一个Promise对象，该对象的值是对应键名的值
   */
  public async getItem<T>(k: string): Promise<T | null> {
    try {
      const value: ExpiresData<T> | null = await this._forage.getItem(k)
      if (value && (value.expires > new Date().getTime() || value.expires === 0)) {
        const resData = (this._isEncrypt ? decrypt(value.data as string) : value.data) as T
        return Promise.resolve(resData)
      } else {
        return Promise.resolve(null)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * @description 从离线仓库中删除对应键名的值
   * @param {string} k - 键名
   * @returns {Promise<void>} - Promise对象，删除成功时解析为void，删除失败时拒绝并返回错误信息
   */
  public async removeItem(k: string): Promise<void> {
    try {
      await this._forage.removeItem(k)
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  }

  /**
   * @description 从离线仓库中删除所有的键名，重置数据库
   * @returns {Promise<void>} - Promise对象，清除成功时解析为void，清除失败时拒绝并返回错误信息
   */
  public async clear(): Promise<void> {
    try {
      await this._forage.clear()
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  }
}

export default new ForageStg({})
