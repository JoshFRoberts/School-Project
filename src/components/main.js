import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css' // Annahme, dass Sie Tailwind CSS verwenden

const app = createApp(App)
app.use(router)
app.mount('#app')