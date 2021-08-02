import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'//导入home组件 路由跳转
import Welcome from '../components/Welcome'
import Users from  '../components/user/Users'

Vue.use(Router)

const router =  new Router({
  routes:[
    {
      path:'/login',
      component:Login
    },
    { // 重定向
      path:'/',
      redirect:'/login'
    },
    {
      //home页面
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[
        {path:'/welcome',component:Welcome},
        {path:'/users',component:Users}
      ]
    }
  ]
})


//挂载路由导航守卫
router.beforeEach((to,from,next) =>{
  //to 将要访问的路劲  from 从哪个路劲跳转而来 next是一个函数，表示放行
  // next()直接放行 next('/login') 强制跳转
  if(to.path === '/login')  return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  //没有token 则必须强势回去登录
  if(!tokenStr)  return next('/login')
  next()//有token则直接放行好了

})

export default router;
