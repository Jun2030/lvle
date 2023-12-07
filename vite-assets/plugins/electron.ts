import { builtinModules } from 'node:module'
import type { PluginOption } from 'vite'
import type { ElectronOptions } from 'vite-plugin-electron'
import ElectronPlugin from 'vite-plugin-electron'
import RendererPlugin from 'vite-plugin-electron-renderer'

export default (viteEnv: ViteEnv, isBuild: boolean): PluginOption[] => {
  const { V_USE_ELECTRON } = viteEnv

  const electronConfig: ElectronOptions[] = [
    {
      entry: 'electron/main/index.ts',
      onstart({ startup }) {
        startup()
      },
      vite: {
        build: {
          assetsDir: '.',
          outDir: 'dist/main',
          rollupOptions: {
            external: ['electron', ...builtinModules],
          },
        },
      },
    },
    {
      entry: 'electron/preload/index.ts',
      onstart({ reload }) {
        reload()
      },
      vite: {
        build: {
          outDir: 'dist/preload',
        },
      },
    },
  ]
  if (!isBuild) {
    electronConfig.push({
      entry: 'electron/main/index.dev.ts',
      vite: {
        build: {
          outDir: 'dist/main',
        },
      },
    })
  }

  return V_USE_ELECTRON ? [ElectronPlugin(electronConfig), RendererPlugin()] : []
}
