import { decrypt, encrypt } from '../crypto'
import { DEFAULT_CACHE_TIME, IS_ENCRYPT } from '@/config'

export class LocalStg {
  private _isEncrypt: boolean

  constructor(isEncryPt = IS_ENCRYPT) {
    this._isEncrypt = isEncryPt
  }

  /**
   * @description localStorage存储-存
   * @param {string} k - 键名
   * @param {T} v - 键值
   * @param {number} m - 缓存时间（单位：分，默认：0分钟，永久缓存）
   * @returns {void} - 返回一个对象，该对象的值为缓存数据的值
   */
  public setItem(k: string, v: unknown, m = DEFAULT_CACHE_TIME): void {
    const data = {
      data: v,
      expires: m ? new Date().getTime() + m * 60 * 1000 : 0,
    }
    localStorage.setItem(k, this._isEncrypt ? encrypt(data) : JSON.stringify(data))
  }

  /**
   * @description localStorage存储-取
   * @param k - 要获取的键名
   * @returns 键名对应的值，如果不存在或已过期则返回 null
   */
  public getItem<T>(k: string): T | null {
    const json: string | null = localStorage.getItem(k)
    if (json) {
      const value = this._isEncrypt ? decrypt(json) : JSON.parse(json)
      if (value) {
        if (value.expires && (value.expires as number > new Date().getTime() || value.expires === 0)) {
          return value.data
        }
      }
      return null
    }
    return null
  }

  /**
   * @description 移除本地存储的键值对
   * @param {string} k - 要移除的键名
   * @returns {void}
   */
  public removeItem(k: string): void {
    localStorage.removeItem(k)
  }

  /**
   * @description localStorage存储-清空所有
   * @returns {void}
   */
  public clear(): void {
    localStorage.clear()
  }
}

export default new LocalStg()
