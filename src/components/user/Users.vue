<template>
<div>
  <!-- 面包屑导航区 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区 -->
  <el-card >
    <!-- 搜索与添加区  -->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容"  v-model="queryInfo.query" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList" ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表区域 -->
    <el-table :data="userlist" border stripe>// 这种border默认为真，也就是true了
      <el-table-column type="index" label="No"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态" >
        <template slot-scope="scope">
          <!--
          其实prop = "mg-state" 可以删掉了，如果同时有插巢和 prop ，插槽优先一点
          scope.row 代表这一行的全部数据 {{scope.row}}
          -->
          <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>

          <!-- 删除按钮 -->
          <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>

          <!-- 设置按钮 -->
          <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable="false">
          <el-button size="mini" type="warning" icon="el-icon-setting" circle></el-button>
          </el-tooltip>

        </template>

      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"

        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>


  </el-card>

  <!-- 添加用户的对话框 -->
  <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="50%">
    <!-- 内容主体区 -->
    <span>这是一段信息</span>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: "Users",
  data(){
    return {
      //获取用户列表的参数对象
      queryInfo:{
        query:'',
        // 当前的页数
        pagenum:1,
        //当前每页显示多少条数据
        pagesize:2
      },
      userlist:[],
      total:0,
      //控制添加用户对话框的显示与隐藏
      addDialogVisible:false

    }
  },
  created() {
    this.getUserList();
  },
  methods:{
   async getUserList(){
     const {data : res} = await this.$http.get('users',{params: this.queryInfo})
     if(res.meta.status !== 200)
       return this.$message.error("获取用户列表失败！")
     this.userlist = res.data.users
     this.total = res.data.total
     console.log(res)
    },
    // 监听 pageSize 改变的事件
    handleSizeChange(newSize){
      //console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值 改变的事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getUserList()

    },
    //监听 switch 状态的改变
    async userStateChanged(userInfo)
    {
      //console.log(userInfo);
      const {data:res} = await this.$http.put(
          `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      //console.log(res.meta.status)
      if(res.meta.status !== 200)
      {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error("更新用户数据失败")
      }
      this.$message.success("更新用户状态成功")

    }
  }
}


</script>

<style scoped>

</style>