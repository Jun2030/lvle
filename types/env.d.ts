/**
 * 服务环境类型
 * - "development": 开发环境
 * - "testing": 测试环境
 * - "staging": 预发布环境
 * - "production": 生产环境
 */
type ServiceType = 'development' | 'testing' | 'staging' | 'production'

interface GlobalConfig {
  appName: string
  request: {
    authKey: string
    timeout: number
    successCode: (string | number)[]
    customHeaderKey: string
    customHeaderValue: string
  }
  baseApi: string
}

/**
 * 打包压缩类型
 * - "gzip": gz
 * - "brotli": br
 * - "gzip,brotli": gz+br
 * - "none": 不压缩
 */
type CompressType = 'gzip' | 'brotli' | 'gzip,brotli' | 'none'

interface ViteEnv {
  /* 项目名称 */
  readonly V_APP_NAME: string
  /* 项目描述 */
  readonly V_APP_DESC: string
  /* 项目基础路径 */
  readonly V_PUBLIC_PATH: string
  /* 后端基础服务 */
  readonly V_BASE_API: string
  /* OSS基础服务 */
  readonly V_OSS_API: string
  /* 是否使用Mock数据 */
  readonly V_USE_MOCK: boolean
  /* 是否使用Electron应用并构建,如果是，V_BUILD_COMPRESS将不生效 */
  readonly V_USE_ELECTRON: boolean
  /* 构建压缩类型：gzip|brotli|none */
  readonly V_BUILD_COMPRESS: CompressType
  /* 是否删除Console打印 */
  readonly V_DROP_CONSOLE: boolean
}
