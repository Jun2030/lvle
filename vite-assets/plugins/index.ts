import type { PluginOption } from 'vite'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import html from './html'
import unplugin from './unplugin'
import compress from './compress'
import electron from './electron'

export function createPlugins(viteEnv: ViteEnv, isBuild: boolean): (PluginOption | PluginOption[])[] {
  const { V_USE_ELECTRON } = viteEnv
  const plugins: (PluginOption | PluginOption[])[] = [
    html(viteEnv, isBuild),
    !V_USE_ELECTRON && VueDevTools(),
    Unocss(),
    ...unplugin,
    ...compress(viteEnv),
    ...electron(viteEnv, isBuild),
  ]
  return plugins
}
