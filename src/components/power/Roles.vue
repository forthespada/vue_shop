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
        <el-col :span="5" >
          <el-tag closable @close="removeRightByID(scope.row,item1.id)">
            {{item1.authName}}
          </el-tag><i class="el-icon-caret-right"></i>
        </el-col>

        <!-- 渲染二级和三级权限 -->
        <el-col :span="19">
          <!-- 通过for循环嵌套渲染二级权限 -->
          <el-row :class="[index2 === 0?'':'bdtop','vcenter']"  v-for="(item2,index2) in item1.children" :key="item2.id">
            <el-col :span="6">
              <el-tag type="success" closable @close="removeRightByID(scope.row,item2.id)">
                {{item2.authName}}
              </el-tag><i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="18">
              <el-tag type="warning" v-for="(item3,index3) in item2.children" :key="item3.id" closable @close="removeRightByID(scope.row,item3.id)">
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
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRole(scope.row)">编辑</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
      <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
    </template>
  </el-table-column>
</el-table>
  </el-card>



  <!-- 编辑角色的对话框 -->
  <el-dialog
      title="编辑角色"
      :visible.sync="editDialogVisible"
      width="50%"
>
    <el-form :model="editRoleForm"  :rules="editRoleRules" ref="editRuleForm" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input  v-model="editRoleForm.roleName" ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="editRoleForm.roleDesc" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRight">确 定</el-button>
  </span>
  </el-dialog>

<!-- 分配权限的对话框 -->
  <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
 >
    <!-- 树形控件 -->
    <el-tree :data="rightList" :props="treeProps" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="defKeys" ref="treeRef"></el-tree>
    <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
    export default {
        name: "role",
      data(){
          return{
            //所有角色列表数据
            roleList:[],
            //编辑角色的对话框
            editDialogVisible:false,
            //控制分配权限对话框的显示与隐藏
            setRightDialogVisible:false,
            //所有权限的数据
            rightList:[],
            //  树形对象的属性绑定对象
            treeProps: {
              label: 'authName',
              children: 'children'
            },
            //默认选中的节点ID值数组
            defKeys:[
            ],
            //当前即将分配权限的角色Id
            roleId:'',
            //当前编辑的角色信息
            editRoleForm:'',
            //编辑当前角色的校验规则
            editRoleRules:{
              roleName:[{
                required:true,message:"请输入当前角色名称"
              }]

            },
            //确认
            submitForm(){

            },
            //取消
            restForm(){

            }
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
         //console.log(this.roleList)



        },
        //根据ID删除对应的权限
        async removeRightByID(role,rightId){
         //弹框提示用户是否删除权限
            const confirmResult =  await  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err => err)// 这里可以直接return  出去

          if(confirmResult !== 'confirm'){
            return this.$message.info("取消了删除")
          }
         //console.log("删除确定")
          const {data:res}  =  await  this.$http.delete(`roles/${role.id}/rights/${rightId}`)

          if(res.meta.status !== 200){
            return this.$message.error("删除权限失败")
          }
          this.$message.success("删除权限成功")
          //this.getRolesList()
          role.children = res.data

        },

        //展示分配权限的对话框
        async showSetRightDialog(role){
         //获取所有权限列表的数值
          this.roleId = role.id

          const {data:res} = await this.$http.get('rights/tree')
          if(res.meta.status !== 200){
            return this.$message.error('获取权限数据失败')
          }
          //把获取到的权限数据保存到rightList
          this.rightList = res.data
          //console.log(this.rightList)

          //递归获取三级节点的id
          this.getLefKeys(role,this.defKeys)
         this.setRightDialogVisible = true
        },
        //通过递归的形式获取所有三级权限的id，并保存在 defKey数组中
        getLefKeys(node,arr){
         if(!node.children){
           //如果没有children属性则是三级节点，就直接返回
           return arr.push(node.id)
         }

         //循环调用，直到
         node.children.forEach(item=>
         this.getLefKeys(item,arr))
        },

        // 每次技结束前都应该清空权限
        setRightDialogClosed(){
         this.defKeys = []
        },
        //为角色分配权限
        async allotRights(){
         // 使用展开运算符将获取到的元素转化为以 , 分割的数组元素
         const keys = [
             ...this.$refs.treeRef.getCheckedKeys(),
             ...this.$refs.treeRef.getHalfCheckedKeys()
         ]
         // console.log(keys)
          const idStr = keys.join(',')

          const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
          if(res.meta.status !== 200){
            return this.$message.error('分配权限失败')
          }
          this.$message.success('分配权限成功')
          this.getRolesList()
          this.setRightDialogVisible = false
       },
        //编辑用户信息
        async editRole(row){
         var id = row.id
          //console.log(id)
          this.editDialogVisible = true

      const {data : res} = await this.$http.get(`roles/${row.id}`)
      if(res.meta.status !== 200){
        return this.$message.error('获取用户信息失败')
      }
      //console.log(res.data)
          this.editRoleForm = res.data

        },
        //编辑当前权限
        editRight(){
         this.$refs.editRuleForm.validate(async  vaild =>{
           if(!vaild) return
           const {data : res} = await this.$http.put(`roles/${this.editRoleForm.roleId}`,{
             "roleName": this.editRoleForm.roleName,
             "roleDesc": this.editRoleForm.roleDesc
           })
           if(res.meta.status !== 200){
             return this.$message.error('修改角色失败')
           }

           this.editDialogVisible = false
           this.getRolesList()
           this.$message.success("修改角色成功！")


         })


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
