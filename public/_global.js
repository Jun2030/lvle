window.$config = {
  /** **********************      通用配置        */
  // Axios相关配置
  axios: {
    // 请求超时时间
    timeout: 15000,
    // 批量上传超时时间
    timeoutUpload: 60 * 1000,
    // 业务层（非协议层）接口定义的成功码
    successCode: [0, 200],
  },
  // 基本的api地址 > env配置
  baseApiUrl: '',
  ossApiUrl: '',
}
