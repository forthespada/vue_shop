<template>


  <el-container class="home-container">

    <!-- 头部区 -->
    <el-header class="">
      <div>
        <img src="../assets/heima.png" alt="">
        <span>
          电商后台管理系统
        </span>
      </div>
      <el-button type="info" @click="loginOut"> 退出 </el-button>
    </el-header>

    <el-container>
      <!-- 页面侧边栏区 -->
      <el-aside :width="isCollapse ?'64px' : '200px'"><!-- 折叠的时候一起合上 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409BFF"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition='false'
        >
          <!-- 一级菜单 -->
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id.toString()">
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本-->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
              <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.id.toString()">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本-->
                <span>{{subItem.authName}}</span>

              </el-menu-item>

          </el-submenu>
        </el-menu>

      </el-aside>

      <!-- 主题区 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>


</template>

<script>
export default {
  data(){
    return{
      //左侧菜单数据
      menuList:[],
      iconObj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      //是否折叠菜单栏，默认不折叠
      isCollapse:false
    }
  },
  created() {
    this.getMenuList()//生命周期函数，在开始就获取信息
  },

  methods:{
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push('/login')

    },
    // 获取所有请求菜单
    async getMenuList(){
      const {data:res}=await this.$http.get('menus');
      console.log(res)
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data

    },
    //点击按钮切换菜单折叠和展开
    toggleCollapse(){

      this.isCollapse = !this.isCollapse
    }

  }
}
</script>

<style Lang = 'less' scoped>

.home-container{
  height:100%;
}
.el-header{
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color:#333744;
  .el-menu{
    border-right: none;
  }
}
.el-main{
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px;

}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>