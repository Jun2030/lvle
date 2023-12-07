import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'
import { AppConfig } from '@/config'

/**
 * @description 定义持久化配置
 * @param key - 存储的键名
 * @param paths - 存储的路径列表（可选）
 * @returns 返回一个包含键名、存储方式和路径列表的PersistedStateOptions对象
 */
function piniaPersistConfig(key: string, paths?: string[]): PersistedStateOptions {
  return {
    key,
    storage: AppConfig.DEFAULT_PERSIST_STORE,
    paths,
  }
}

export { piniaPersistConfig }
