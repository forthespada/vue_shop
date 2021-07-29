import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'//导入全局样式表
import './assets/fonts/iconfont.css' // 导入字体图标
import axios from "axios";//导入通讯库
Vue.config.productionTip = false

axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'//配置请求根路径
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
