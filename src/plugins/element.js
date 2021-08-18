import Vue from 'vue'
import {Alert, Button, Form, FormItem, Input, TabPane, use} from 'element-ui'
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
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Select,
    Option,
    Cascader,
    Tabs,
    tab,
    Step,
    Steps,
    Timeline,
    TimelineItem
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
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)


Vue.use(Alert)
Vue.use(Tabs)
Vue.use(Steps)
Vue.use(Step)
Vue.use(TabPane)

Vue.use(Timeline)
Vue.use(TimelineItem)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
