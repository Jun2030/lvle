declare namespace LeRequest {
  /* 协议层自定义错误 */
  interface HttpErrorCode {
    code: number
    msg: string
  }

  /* 请求的额外参数 */
  interface RequestExtraConfig {
    // 是否展示请求前加载动画
    showPrevLoading?: boolean
    // 是否隐藏请求后加载动画
    hidePostLoading?: boolean
    // 动画加载文字
    loadingText?: string
    // 是否展示错误提示
    showError?: boolean
    // 是否忽略重复请求
    ignoreRepeat?: boolean
    // 是否开启简洁数据结构响应
    reduceResponse?: boolean
    // 自定义处理业务层code码
    businessCodeMap?: (msg: string) => Map<number, { msg: string, action: (msg: string, data: any) => void }>
    // 后台返回数据格式
    backendConfig?: RequestBackendConfig
  }

  /* 后台返回数据格式 */
  interface RequestBackendConfig {
    // 业务code码-字段名称
    codeKey: string
    // 业务数据-字段名称
    dataKey: string
    // 业务消息-字段名称
    msgKey: string
    // 成功code码
    successCode: (string | number)[]
  }

  /* 请求返回数据 */
  interface RequestResData<T> {
    code: string | number
    data: T
    message?: string
  }

  /* 请求方式 */
  type RequestMethod = 'get' | 'post' | 'put' | 'delete'
}
