import Vue from 'vue'
import {Button,Form,FormItem,Input} from 'element-ui'
import {Container, Header, Aside, Main} from "element-ui";//导航菜单头部
import  {Menu,Submenu,MenuItem} from "element-ui";  //导航左侧
import {Breadcrumb,BreadcrumbItem} from 'element-ui'
import  {Card} from 'element-ui'
import {Row,Col,Table,TableColumn} from 'element-ui'
//导入消息提示
import {Message} from 'element-ui'
import {
    Switch,
    Tooltip,
    Pagination,
    Dialog
} from 'element-ui'

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

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)

Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)

Vue.use(Pagination)
Vue.use(Dialog)

Vue.prototype.$message = Message