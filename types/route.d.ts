declare namespace LeRoute {
  /**
   * 路由组件
   * - basic: 基础组件,具有公共部分布局
   * - page: 单页面组件
   * - blank: 空白页面组件
   */
  type RouteLayout = 'basic' | 'self' | 'page' | 'blank'

  interface Route {
    // 路由路径
    path: string
    // 路由名称
    name?: string
    // 路由重定向
    redirect?: string
    // 路由组件
    component?: RouteLayout
    // 路由嵌套路由
    children?: Route[]
    // 路由配置
    meta?: RouteMeta
    // 路由属性
    props?: boolean | Record<string, any> | ((to: any) => Record<string, any>)
  }

  interface RouteMeta {
    // 路由标题
    title: string
    // 菜单和面包屑图标
    icon?: string
    // 路由顺序，用于菜单排序
    order?: number
    // 是否需要登录权限
    auth?: boolean
    // 哪些类型的用户有权限才能访问(空的话则表示不需要权限)
    roles?: LeAuth.RoleType[]
    // 是否缓存页面
    keepAlive?: boolean
    // 菜单和面包屑是否隐藏
    hide?: boolean
    // 外链链接
    href?: string
    // 当前路由需要选中的菜单项(用于跳转至不在左侧菜单显示的路由且需要高亮某个菜单的情况)
    activeMenu?: string
  }

  type RouteModule = Record<string, { default: LeRoute.Route }>
}
