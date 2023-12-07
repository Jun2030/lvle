import { createI18n } from 'vue-i18n'

// Element-plus 的ui框架国际化语言配置
import zhCnEl from 'element-plus/es/locale/lang/zh-cn'
import enEl from 'element-plus/es/locale/lang/en'
import { getDirContent } from '@/utils'
import { getBrowserLang } from '~/src/utils/browser'

// 自定义的语言配置
const zhCnLocale = getDirContent(import.meta.glob(`/locales/zh-cn/*.yaml`, { eager: true, import: 'default' }))
const enLocale = getDirContent(import.meta.glob(`/locales/en/*.yaml`, { eager: true, import: 'default' }))

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLang(),
  fallbackLocale: 'zh-cn',
  globalInjection: true,
  messages: {
    [zhCnEl.name]: {
      ...zhCnEl,
      ...zhCnLocale,
    },
    [enEl.name]: {
      ...enEl,
      ...enLocale,
    },
  },
})

export default i18n
