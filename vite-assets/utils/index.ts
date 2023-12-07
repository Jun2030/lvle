import { resolve } from 'node:path'

/* 路径（环境） */
export const getRootPath = (): string => resolve(process.cwd())
export const pathResolve = (pathStr: string): string => resolve(getRootPath(), '.', pathStr)

/* 转换env文件（字符串转为应为类型） */
export function convertEnv(envConfig: Record<string, string>): ViteEnv {
  const resEnvConfig: any = {}
  for (const envName of Object.keys(envConfig)) {
    let realName: string | boolean = (envConfig[envName].replace(/\\n/g, '\n') as string).toLocaleUpperCase()
    switch (realName) {
      case 'Y':
      case 'TRUE':
        realName = true
        break
      case 'N':
      case 'FALSE':
        realName = false
        break
      default:
        break
    }
    resEnvConfig[envName] = realName
  }
  return resEnvConfig
}
