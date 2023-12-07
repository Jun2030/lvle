import viteCompression from 'vite-plugin-compression'
import type { PluginOption } from 'vite'

export default (viteEnv: ViteEnv): PluginOption[] => {
  const { V_BUILD_COMPRESS, V_USE_ELECTRON } = viteEnv
  const COMPRESS_LIST: string[] = !V_USE_ELECTRON && V_BUILD_COMPRESS ? V_BUILD_COMPRESS.split(',') : []
  const compressData: PluginOption | PluginOption[] = []
  const filter = (fileUrl: string): boolean => {
    // 只压缩assets目录下的js文件
    return fileUrl.includes('assets') && /\.(js)$/i.test(fileUrl)
  }
  if (COMPRESS_LIST.includes('GZIP') || COMPRESS_LIST.includes('gzip')) {
    compressData.push(viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 0,
      filter,
      deleteOriginFile: true,
    }))
  }
  if (COMPRESS_LIST.includes('BROTLI') || COMPRESS_LIST.includes('brotli')) {
    compressData.push(viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 0,
      filter,
      deleteOriginFile: true,
    }))
  }
  return compressData
}
