<template>
    <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>参数列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
        <!-- 头部警告区 -->
        <el-alert
            title="注意：只允许为第三级分类设置相关参数！"
            type="warning"
        :closable="false"
        show-icon>
        </el-alert>

        <!-- 选择分类区 -->
        <el-row class="cat_opt">
          <el-col>
            <span>选择商品分类：</span>
            <!-- 选择商品分类的级联框 -->
            <el-cascader
                  v-model="selectedCateKeys"
                  :options="cateList"
                  :props="cateProps"
                  @change="handleChange">
            </el-cascader>
          </el-col>
        </el-row>
      </el-card>

      <!-- table页签区 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数的按钮 -->
          <el-button type="primary" sizi="mini" :disabled="isBtnDisable">
            添加参数
          </el-button>
        </el-tab-pane>
        <!-- 动态参数表格 -->
        <el-table :data="manyTableData" border stripe>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>

        </el-table>

        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性的按钮 -->
          <el-button type="primary" sizi="mini" :disabled="isBtnDisable">
            添加属性
          </el-button>
        </el-tab-pane>
      </el-tabs>

    </div>
</template>

<script>
    export default {
        name: "Params",
      data(){
          return{

            cateList:[],
            //级联选择器配置选项
            cateProps:{
              expandTrigger: 'hover',
              value:'cat_id',
              label:'cat_name',
              children:'children'
            },
            //级联选择器双向绑定到的数据
            selectedCateKeys:'',
            //被激活的页签的名称
            activeName:'many',
            //动态参数的数据
            manyTableData:[],
            //静态参数的数据
            onlyTableData:[],
          }
      },
      created() {
          //获取所有的商品分类数据
          this.getCateList()
      },
      methods:{
          async getCateList(){
            const {data:res} = await this.$http.get('categories')
            if(res.meta.status !== 200){
              return this.$message.error('获取商品列表失败')
            }
            this.cateList = res.data
            //console.log(this.cateList)
          },
        //级联选择框选中项变化，会触发该函数
         handleChange(){
           this.getParamsData()
        },
        //tab页签被激活时的函数
        handleTabClick(){
          this.getParamsData()
          console.log(this.activeName)
        },
       async getParamsData(){
          //console.log(this.selectedCateKeys)
          //如果选中的是三级子分类，长度为3，否则不是
          if(this.selectedCateKeys.length !== 3)
          {
            this.selectedCateKeys = []
            return
          }
          //证明是三级
          console.log(this.selectedCateKeys)
          //根据所选的Id和当前所属的面板获取对应的参数
          const{data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}})

          if(res.meta.status !== 200){
            return this.$message.error('获取参数列表失败')
          }
          //console.log(res.data)
         if(this.activeName === 'many')
         {
           this.manyTableData = res.data
         }else{
           this.onlyTableData = res.data
         }
        }
      },
      computed:{
          //如果按钮需要被禁用，则返回true
          isBtnDisable(){
            if(this.selectedCateKeys.length !== 3){
              return true
            }
            return false
          },
        //当前选中的三级分类的Id
        cateId(){
            if(this.selectedCateKeys.length === 3){
              return this.selectedCateKeys[2]
            }
            return null
        }
      }

    }
</script>

<style scoped>

.cat_opt{
  margin: 15px 0;
}
</style>
