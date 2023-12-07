export default class IPCEmit {
  /**
   * 打开外链
   * @param url - 外链Url
   */
  static async openExternal(url: string): Promise<void> {
    await window.mainApi.send('msgOpenExternalLink', url)
  }
}

export const { openExternal } = IPCEmit
