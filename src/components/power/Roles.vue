<template>
<div>

  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>


  <el-card>
    <!--- 添加角色按钮区 --->
    <el-row><el-col>
      <el-button type="primary">添加角色</el-button>
    </el-col></el-row>

    <!-- 角色列表区 -->
<el-table :data="roleList" border stripe>

  <!-- 展开列 -->
  <el-table-column type="expand">
    <template slot-scope="scope">
      <el-row  :class="['bdbottom','vcenter',index1 == 0?'bdtop':'']"   v-for="(item1,index1) in scope.row.children"  :key="item1.id">
        <!-- 渲染一级权限 -->
        <el-col :span="5">
          <el-tag>
            {{item1.authName}}
          </el-tag><i class="el-icon-caret-right"></i>
        </el-col>

        <!-- 渲染二级和三级权限 -->
        <el-col :span="19">
          <!-- 通过for循环嵌套渲染二级权限 -->
          <el-row :class="[index2 === 0?'':'bdtop','vcenter']"  v-for="(item2,index2) in item1.children" :key="item2.id">
            <el-col :span="6">
              <el-tag type="success">{{item2.authName}}</el-tag><i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="18">
              <el-tag type="warning" v-for="(item3,index3) in item2.children" :key="item3.id">
                {{item3.authName}}
              </el-tag>

            </el-col>
          </el-row>
        </el-col>
      </el-row>

<!--     <pre>
    {{scope.row}}
      </pre>-->
    </template>

  </el-table-column>

  <!-- 索引列 -->
  <el-table-column type="index" label="No"></el-table-column>
  <el-table-column label ="角色名称" prop="roleName"></el-table-column>
  <el-table-column label ="角色描述" prop="roleDesc"></el-table-column>
  <el-table-column label ="操作"  width="300px">
    <template slot-scope="scope">
      <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
      <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
    </template>
  </el-table-column>
</el-table>


  </el-card>



</div>
</template>

<script>
    export default {
        name: "role",
      data(){
          return{
            //所有角色列表数据
            roleList:[]
          }
      },
      created() {
          this.getRolesList()
      },
      methods:{
       async getRolesList(){//获取全部数据
        const {data:res} = await this.$http.get('roles')
         if(res.meta.status !== 200){
           return this.$message.error('角色数据获取失败')
         }
         this.roleList = res.data
         console.log(this.roleList)



        }
      }

    }
</script>

<style scoped>
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}

.bdbottom{
  border-bottom: 1px solid #eee;
}

.vcenter{
  display: flex;
  align-items: center;
}
</style>
