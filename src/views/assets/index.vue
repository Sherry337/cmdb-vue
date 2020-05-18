<template>
  <div class="assets-container">

    <div style="margin-right:10px;">
      
      <el-col :span="3"  style="float:right; margin-right:10px;">
        <!-- <el-input placeholder="搜索" v-model="params.name" @keyup.enter.native="searchClick" @keyup.delete.native="searchClick"> -->
          <el-input clearable size="small" prefix-icon="el-icon-search" placeholder="搜索 (主机名&IP&所属用户)" @input="handleInput" @keyup.delete.native="handleInput">
          <!-- <el-button slot="append" icon="el-icon-search" @click="handleInput"></el-button> -->
        </el-input>
      </el-col>

        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="server_name"
            label="主机名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="out_ip"
            label="外网IP"
            align="center">
          </el-table-column>
          <el-table-column
            prop="in_ip"
            label="内网IP"
            align="center">
          </el-table-column>
          <el-table-column
            prop="env"
            label="环境"
            align="center">
          </el-table-column>
          <el-table-column
            prop="product.product"
            label="所属产品"
            align="center">
          </el-table-column>
          <el-table-column
            prop="os"
            label="OS类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="yun_company"
            label="厂商"
            align="center">
          </el-table-column>
          <el-table-column
            prop="user.user"
            label="所属用户"
            align="center">
          </el-table-column>
          <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-col :span="24">
              <el-button 
                size="small"
                type="primary" 
                @click="showDetail(scope.row)">详情
              </el-button>
                <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
                  <div style="margin-top: 10px;">
                    <el-table :data="gridData" stripe border>
                        <el-table-column prop="directory" label="目录" ></el-table-column>
                        <el-table-column prop="prot" label="端口"></el-table-column>
                        <el-table-column prop="start_way" label="启动方式"></el-table-column>
                        <el-table-column prop="description" label="项目描述" ></el-table-column>
                    </el-table>
                  </div>
                </el-dialog>
                <el-button type="primary" size="small" @click="handleAddBtn(scope.row)">权限</el-button>
                <el-button type="primary" size="mini">性能</el-button>
              </el-col>

              <!--模态窗增加表单-->
              <el-dialog
                title="授权"
                :visible.sync="dialogVisibleForAdd"
                width="50%">
                <user-form
                  :form="currentValue"
                  @submit="handleSubmitAdd"
                  @cancel="handleCancelAdd">
                </user-form>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>

    <!--模态窗增加表单-->
    <!-- <el-dialog
      title="授权"
      :visible.sync="dialogVisibleForAdd"
      width="50%">
      <publish-form
        ref="publishForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd">
      </publish-form>
    </el-dialog> -->
   
    <div style="text-align: right; margin-top:10px;">
      <el-pagination
        background
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
        :total="totalNum"
        :page-size="10" >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAssetsList } from '@/api/assets'
import { createJumpserver } from '@/api/jumpserver'
import UserForm from './form'

export default {
  name: 'publish',
  components: {
    UserForm,
  },

  data() {
    return {
      dialogVisibleForAdd: false,
      currentValue: {},
      tableData: [],
      gridData: [],
      dilteData: [],
      totalNum: 0,
      params: {
        page: 1,
        // server_name: '',
        // out_ip: '',
        search: '',
        size: '',
      },
      dialogTableVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAssetsList(this.params).then(res => {
        //   debugger
        this.tableData = res.results
        // console.log('表格数据', this.tableData)
        // // this.gridData = res.results
        // console.log(res.results)
        this.totalNum = res.count
        // this.params.out = out
      })
    },
    handleCurrentChange(val) {
        // console.log(1, val)
        this.params.page = val
        this.fetchData()
    },
    // 点击列表详情操作
    handleInput(e) {
      this.params.search = e
      this.params.page = 1
      this.fetchData()
    },
    showDetail(row) {
        // console.log('当前行数据', row)
        this.dialogTableVisible = true
        // 内层表格赋值
        // debugger //调试
        // this.gridData = row.servers
        this.gridData = row.servicedir
    },
    
    /* 添加,弹出模态窗、提交数据、取消 */
    handleAddBtn(value) {
      this.currentValue = { ...value }   // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      this.dialogVisibleForAdd = true
      // console.log(1234, this.currentValue)
    },
    handleSubmitAdd(value) {
      console.log(21, value)
      const { id, url, in_ip, os, yun_company, env ,district, user, product, servicedir, ...params } = value 
      console.log(22, params)
      createJumpserver(params).then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchData()
      },
      err => {
      this.handleCancelAdd()
      //  console.log(err.message)
      this.$message({
        message: '已有此机器,为授权或删除后在申请',
        type:  'error'
      })
     })
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      // this.$refs.userForm.$refs.form.resetFields()  // 清除掉子组件表单的数据
    },
  
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .assets {
    &-container {
      margin: 10px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  // .text {
  //   font-size: 14px;
  // }

  // .item {
  //   padding: 18px 0;
  // }

  // .box-card {
  //   width: 480px;
  // }
</style>