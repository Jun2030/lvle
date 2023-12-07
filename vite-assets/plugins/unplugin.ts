import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { pathResolve } from '../index'

export default [
  VueMacros({
    plugins: {
      vue: Vue(),
      vueJsx: VueJsx(),
    },
  }),
  AutoImport({
    imports: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core', '@vueuse/head'],
    dirs: [pathResolve('src/**/hooks'), pathResolve('src/**/composables'), pathResolve('src/stores/modules')],
    dts: './auto-imports.d.ts',
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
    eslintrc: { enabled: true },
  }),
  Components({
    dts: true,
    dirs: ['components'],
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
  }),
  VueI18nPlugin({
    runtimeOnly: true,
    compositionOnly: true,
    fullInstall: true,
    include: [pathResolve('src/locales/**')],
  }),
]
