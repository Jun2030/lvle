import { ElMessage, ElMessageBox } from 'element-plus'
import App from '@/App.vue'
import i18n from '@/plugins/i18n'
import pinia from '@/plugins/pinia'
import router from '@/routers'
import 'virtual:uno.css'

const app = createApp(App)
app.use(i18n).use(router).use(pinia).mount('#app')

// 添加全局属性
window.$message = ElMessage
window.$messageBox = ElMessageBox
