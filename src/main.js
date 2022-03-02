import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

window.Kakao.init("7811efa3c94e080e50c733875157a948");