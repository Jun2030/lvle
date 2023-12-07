import { AES, MD5, enc } from 'crypto-js'
import { CRYPTO_SECRET } from '@/config'

export default class CryptoJS {
  /**
   * @description AES加密
   * @param {unknown} data - 需要加密的数据
   * @returns {string} - 返回加密后的字符串
   */
  static encrypt(data: unknown): string {
    const encryptData: string = JSON.stringify(data)
    return AES.encrypt(encryptData, CRYPTO_SECRET).toString()
  }

  /**
   * @description AES解密密文
   * @param cipherText 密文
   * @returns 解密后的原始文本，如果成功解密则返回包含JSON对象的字符串，否则返回null
   */
  static decrypt(cipherText: string): Record<string, unknown> | null {
    const bytes = AES.decrypt(cipherText, CRYPTO_SECRET)
    const originText: string = bytes.toString(enc.Utf8)
    if (originText) { return JSON.parse(originText) }
    return null
  }

  /**
   * @description MD5计算数据
   * @param str 要加密的字符串
   * @returns 加密后的字符串
   */
  static encryptMD5(str: string): string {
    return MD5(str).toString()
  }
}

export const { encrypt, decrypt, encryptMD5 } = CryptoJS
