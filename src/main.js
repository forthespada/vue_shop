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
Vue.filter('dataFormat',function (originVal){
  const dt = new Date(originVal)
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + ' ').padStart(2,'0')
  const day = (dt.getDate() + '').padStart(2,'0')

  const hour = (dt.getHours() + '').padStart(2,'0')
  const minute = (dt.getMinutes() + '').padStart(2,'0')
  const second = (dt.getSeconds() + '').padStart(2,'0')

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
