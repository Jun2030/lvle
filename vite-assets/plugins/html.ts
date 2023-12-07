import { createHtmlPlugin } from 'vite-plugin-html'
import type { PluginOption } from 'vite'
import pkg from '../../package.json'

export default (viteEnv: ViteEnv, isBuild: boolean): PluginOption[] => {
  const { V_APP_NAME, V_APP_DESC, V_PUBLIC_PATH } = viteEnv
  const PATH: string = V_PUBLIC_PATH.endsWith('/') ? V_PUBLIC_PATH : `${V_PUBLIC_PATH}/`
  const GLOBAL_JS = `${PATH || '/'}_global.js?v=${pkg.version}-${Date.now()}`

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        appName: V_APP_NAME,
        appDesc: V_APP_DESC,
        injectScript: `<script src="${GLOBAL_JS}"></script>`,
        loadingScript: !isBuild && `
          <div class="loading-container">
            <div class="loading-drop"></div>
            <div class="loading-drop"></div>
            <div class="loading-drop"></div>
            <div class="loading-collection"></div>
            <div class="loading-text">
              ${V_APP_NAME}
            </div>
          </div>
        `,
      },
    },
  })
}
