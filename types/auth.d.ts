declare namespace LeAuth {
  interface UserInfo {
    // 用户id
    userId: string
    // 用户名
    userName: string
    // 邮箱
    email?: string
    // 手机号
    phone?: string
    // 用户角色
    role?: RoleType
    // 用户权限
    permission?: string[]
    // 用户头像
    avatar?: string
    // 用户状态
    status?: string
    // 用户昵称
    userNickName?: string
  }

  // 角色类型
  // super: 超级管理员
  // admin: 管理员
  // user: 普通用户
  // guest: 游客
  type RoleType = 'super' | 'admin' | 'user' | 'guest'
}
