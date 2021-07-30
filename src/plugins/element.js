import Vue from 'vue'
import {Button,Form,FormItem,Input} from 'element-ui'
import {Container, Header, Aside,Main} from "element-ui";//导航菜单头部
import  {Menu,Submenu,MenuItem} from "element-ui";  //导航左侧
//导入消息提示
import {Message} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

//不要忘记注册
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.prototype.$message = Message