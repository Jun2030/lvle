import { rmSync } from 'fs'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { __APP_INFO__, convertEnv, createPlugins, envDir, envPrefix, pathResolve, manualChunks } from './vite-assets'

export default defineConfig(({ command, mode }) => {
  const isBuild: boolean = command === 'build';
  const viteEnv: ViteEnv = convertEnv(loadEnv(mode, envDir, envPrefix));
  rmSync('dist', { recursive: true, force: true })

  /* Vite具体配置  */
  return {
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.vue', '.json', 'css', '.scss', '.yaml'],
      alias: {
        '@': pathResolve('src'),
        '~': pathResolve('')
      }
    },
    base: './',
    root: resolve('./src'),
    envDir,
    envPrefix,
    publicDir: resolve('./public'),
    clearScreen: false,
    esbuild: { pure: viteEnv.V_DROP_CONSOLE ? ["console.log", "debugger"] : [] },
    build: {
      outDir: resolve('./dist'),
      sourcemap: !isBuild,
      minify: 'esbuild',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks
        }
      }
    },
    plugins: createPlugins(viteEnv, isBuild)
  }
})
