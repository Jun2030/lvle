// ! 警告:此文件仅在开发环境中使用,并在构建时删除
// 除非必要，否则不要编辑文件
import { VUEJS_DEVTOOLS, installExtension } from 'electron-extension-installer'

installExtension(VUEJS_DEVTOOLS, {
  loadExtensionOptions: {
    allowFileAccess: true,
  },
})
