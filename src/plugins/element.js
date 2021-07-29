import Vue from 'vue'
import {Button,Form,FormItem,Input} from 'element-ui'

//导入消息提示
import {Message} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message