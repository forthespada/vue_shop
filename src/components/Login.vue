<template>

  <div class="login_container">
  <div class="login_box">
    <!-- 头像区 -->
    <div class = "avatar_box">
      <img src="../assets/logo.png" alt="缺失头像提示">
    </div>

    <!-- 登录表单区 -->
    <el-form  label-width="0px" :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="login_form">
      <el-form-item prop="username" > <!-- 用户名 -->
        <el-input   v-model="loginForm.username"  prefix-icon="el-icon-user" ></el-input>
      </el-form-item>

      <el-form-item prop="password"> <!-- 密码 -->
        <el-input   type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" ></el-input>
      </el-form-item>

      <el-form-item class="btns"> <!-- 按钮区 -->
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      //登录表单的数据绑定对象
      loginForm:{
        username:'admin',
        password:'123456',
      },

    //验证登录表单的规则对象
    loginFormRules:{
        //验证用户名是否合法
        username:[
          {required:true,message:"请输入登录昵称",trigger:'blur'},
          {min:3,max:10,message:"长度在3-10之间",tigger:"blur"}
        ],
      //验证密码是否合法
      password:[
        {required:true,message:"请输入密码",trigger:"blur"},
        {min:6,max:15,message:"密码长度在6-15之间",trigger: "blur"}
      ]
    }
    }


  },
  methods:{
    //重置按钮，重置登录表单
    resetLoginForm(){
      //console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    login(){
      this.$refs.loginFormRef.validate( async (vaild) => {
        if(!vaild) return;//验证失败 返回
       const {data:res} = await this.$http.post('login',this.loginForm);//目前是异步请求
       // console.log(res)
        // console.log(vaild)
        if(res.meta.status !== 200)
          //return console.log('登录失败');
          return this.$message.error('登录失败');
        //console.log("登录成功！");
        this.$message.success('登录成功');
        // 1、将登陆成功之后的token保存在客户端的 sessionStorage 中
        // 1.1 项目中的其余组件不需再登陆成功后才能访问
        // 1.2 token 只应该在当前打开网站生效，所以保存在sessionStorage中1

        window.sessionStorage.setItem('token',res.data.token);

        //通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home');
      })
    }
  }
}
</script>

<style   scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;

}
.login_box{
  width:450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}

.login_form{
 position: absolute;
 bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.avatar_box{
  height: 180px;
  width: 180px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #eee;
  img{
    width: 10%;
    height: 50%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

</style>