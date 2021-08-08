import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'//导入全局样式表
import './assets/fonts/iconfont.css' // 导入字体图标
import axios from "axios" //导入通讯库
import TreeTable from 'vue-table-with-tree-grid'



Vue.config.productionTip = false

axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'//配置请求根路径

//添加拦截器
axios.interceptors.request.use(config=>{
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  //在最后必须return config
  return config
})
Vue.prototype.$http = axios

Vue.component('tree-table',TreeTable)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
