export default class FilesUtils {
  /**
   * @description 获取指定目录下所有文件内容
   * @returns {Recordable<unknown>} 文件内容
   */
  static getDirContent(files) {
    let content: Recordable<unknown> = {}
    for (const path in files) {
      content = { ...content, ...files[path] }
    }
    return content
  }
}

export const { getDirContent } = FilesUtils
