import dayjs from 'dayjs'
import { pathResolve } from '../index'
import pkg from '../../package.json'

/* env 前缀 */
export const envPrefix = 'V_'
/* env 路径 */
export const envDir: string = pathResolve('vite-assets/env')

/* App信息 */
const { dependencies, devDependencies, name, version } = pkg
export const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
}

/* Chunk 拆包名 */
export const VENDOR_LIBS: { match: string[], output: string }[] = [
  {
    match: ['element-plus'],
    output: 'element-plus',
  },
  {
    match: ['@vue'],
    output: '@vue',
  },
  {
    match: ['axios'],
    output: 'axios',
  },
  {
    match: ['lodash-es', 'moderndash'],
    output: 'dash',
  },
  {
    match: ['crypto-js'],
    output: 'crypto',
  },
  {
    match: ['vue-router'],
    output: 'router',
  },
]

/* 手动拆包优化配置 */
export function manualChunks(id: string): string | undefined {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = VENDOR_LIBS.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig')
      return reg.test(id)
    })
    return matchItem ? matchItem.output : 'vendors'
  }
}
