<template>
<div>
  <!-- 面包屑导航区 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 卡片视图区 -->
  <el-card>
      <el-row>
          <el-col>
              <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
          </el-col>
      </el-row>

    <!-- 为表格占位 -->
<tree-table class="treeTable" :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="No" border>
<!-- 是否有效的模板 -->
  <template slot="isok" slot-scope="scope">
  <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen"></i>
  <i class="el-icon-error" v-else  style="color:red"></i>
</template>

  <!-- 排序模板 -->
  <template slot="order" slot-scope="scope">
    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
    <el-tag  size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
    <el-tag  size="mini" type="warning" v-else>三级</el-tag>
  </template>
  <!-- 操作 -->
  <template slot="opt" slot-scope="scope">
    <el-button  size = "mini" type="primary" icon="el-icon-search"> 编辑</el-button>
    <el-button size = "mini" type="danger" icon="el-icon-delete">删除 </el-button>

  </template>
</tree-table>

    <!-- 分页区域 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

  </el-card>

  <!-- 添加分类对话框 -->
  <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
    @close="addCateDialogClosed"
  >
   <!-- 添加分类的表单 -->
    <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRdf" label-width="100px" >
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类：">
        <!-- 级联选择器 -->
        <!-- options指定数据源  props用来指定配置对象-->
        <el-cascader
            style="height: 150px;width: 100%"
            v-model="selectedKeys"
            :options="parentList"
            :props="cascaderProps"
            @change="parentCateChanged"
        clearable>
        </el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addCateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
    export default {
        name: "Categories",
        data(){
            return {
              //查询条件
              queryInfo:{
                type:3,
                pagesize:5,
                pagenum:1
              },

              //商品分类的数据列表，默认为空
              cateList:[],
              total:0,

              //为table指定列的定义
              columns:[
                  {
                label:"分类名称",
                prop:"cat_name"
              },{
                label:'是否有效',
                  type:'template',//表示监督岗前列定义为模板列
                  template:'isok'// 表示当前使用这一列模板名称

              },{
                  label:'排序',
                  type:'template',//表示监督岗前列定义为模板列
                  template:'order'// 表示当前使用这一列模板名称

                },{
                  label:'操作',
                  type:'template',//表示监督岗前列定义为模板列
                  template:'opt'// 表示当前使用这一列模板名称

                }
              ],
              //控制添加分类对话框的显示与隐藏
              addCateDialogVisible:false,
              //添加分类的表单数据对象
              addCateForm:{
                //将要添加的分类名称
                cat_name:'',
                //父级的分类id
                cat_pid:0,
                //分类的等级默认是1级分类
                cat_level:0

              },
              // 添加分类表单的验证规则对象  checkStrictly： 允许选中任意一级
              addCateFormRules:{
                cat_name:[
                  {
                    required:true,message:'请输入分类名称',trigger:'blur'
                  }
                ]
              },
              //父级的数据列表
              parentList:[],
              //指定级联选择器的配置对象
              cascaderProps:{
                expandTrigger: 'hover',
                value:'cat_id',
                label:'cat_name',
                children:'children',
                checkStrictly:true
              },
              //选中的父级分类的ID数组
              selectedKeys:[]
            }
        },
        created(){
          this.getCateList()
        },
        methods:{

          //获取商品分类数据
          async getCateList(){

            const {data:res} = await this.$http.get('categories',{params:this.queryInfo})
            if(res.meta.status !== 200){
              return this.$message.error("获取商品分类数据失败")
            }

            // 把数据列表赋值给list
            this.cateList = res.data.result
            this.total = res.data.total // 为总数据条数赋值

           // console.log(this.cateList)
          },
          //监听pagesize改变的事件
          handleSizeChange(newPage){
            this.queryInfo.pagesize = newPage
            this.getCateList()

          },
          // 监听pagenum改变
          handleCurrentChange(newSzie){
            this.queryInfo.pagesize = newSzie
            this.getCateList()
          },
          //点击按钮，展示添加按钮的对话框
          showAddCateDialog(){
            //先获取父级分类的数据列表，再展示对话框
            this.getParentCateList()
            this.addCateDialogVisible = true
          },
          //获取父级分类的列表
          async getParentCateList(){
            const { data:res} = await this.$http.get('categories',{params:{
              type:2
              }})
            if(res.meta.status !== 200){
              return this.$message.error("获取父级数据失败")
            }
            this.parentList = res.data
          },
          //选择项发生变化触发函数
          parentCateChanged(){

            console.log(this.selectedKeys)
            //如果selecteKey中的length 大于 0，证明选中了父级分类
            if(this.selectedKeys.length > 0){
              //父级分类的ID 其实一直是最后一个，只显示1 2级，不会显示3级，最差就是2级，最好就是1级
              this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
              //为当前分类的等级赋值
              this.addCateForm.cat_level = this.selectedKeys.length
            }else{
              this.addCateForm.cat_pid = 0
              //为当前分类的等级赋值
              this.addCateForm.cat_level = 0
            }

          },
          //点击按钮，添加新的分类
          addCate(){
            //console.log(this.addCateForm)
            this.$refs.addCateFormRdf.validate(async valid => {
              if(!valid) return
              const {data:res} = await this.$http.post('categories',this.addCateForm)

              if(res.meta.status !== 201){
                return this.$message.error('分类添加失败')
              }

              this.$message.success('添加分类成功')
              this.getCateList()
              this.addCateDialogVisible = false
            })
          },
          //监听对话框的关闭事件
          addCateDialogClosed(){
            this.$refs.addCateFormRdf.resetFields()
            this.selectedKeys = []
            this.addCateForm.cat_pid = 0
            this.addCateForm.cat_level = 0
          }

        }
    }
</script>

<style scoped>

.el-cascader-panel { height: 200px; }

.treeTable{
  margin-top: 15px;
}

.el-cascader-menu{
  height: 200px !important;
}
.el-cascader-panel{
  top:300px !important;
}
.el-cascader__d{
  height: 200px;
  overflow: auto;
}
.el-scrollbar__wrap{
  overflow: auto;
}
.el-cascader__suggestion-panel{
  height: 200px;
}
</style>
