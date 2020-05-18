<template>
  <div class="assets-container">
      <div>
        <!--添加按钮-->
        <!-- <el-col :span="16">
          <el-button type="primary" size="small" @click="handleAddBtn">申请权限</el-button>
        </el-col> -->
        <!--搜索-->
        <el-col :span="3" style="float:right; margin-right:10px;">
          <el-input clearable size="small" prefix-icon="el-icon-search" placeholder="搜索 (项目名)" @input="handleInput" @keyup.delete.native="handleInput">
        </el-input>
      </el-col>
    </div>
    <div style="margin-right:10px">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="hostname"
            label="主机名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ip"
            label="IP"
            align="center">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="apply_time"
            label="申请时间"
            align="center">
          </el-table-column>
            <el-table-column      
            label="用户级别"
            align="center">
            <template slot-scope="scope">
              <el-tag effect="dark" :type="hemanizeStatus(scope.row.rank).type">
                {{ hemanizeStatus(scope.row.rank).value }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button 
                size="mini"
                type="primary" 
                @click="handleDel(scope.row)">移除
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

    <!--模态窗增加表单-->
    <el-dialog
      title="授权"
      :visible.sync="dialogVisibleForAdd"
      width="50%">
      <publish-form
        ref="publishForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd">
      </publish-form>
    </el-dialog>

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
import { getJumpserverList, deleteJumpserver,createJumpserver } from '@/api/jumpserver'
import { getInfo } from '@/api/login'
import moment from 'moment'
import PublishForm from './form'

export default {
  name: 'publish',
  components: {
    PublishForm,
  },

  data() {
    return {
      dialogVisibleForAdd: false,
      tableData: [],
      gridData: [],
      // dilteData: [],
      totalNum: 0,
      params: {
        page: 1,
        username: '',
        search: '',
        status: 2
      },
      dialogTableVisible: false
    }
  },
  created() {
    // this.abc()
    this.fetchData()

  },
  methods: {
    // abc() { 
    //     getInfo().then(res => {
    //     // console.log(113, res)
    //     this.params.username__username = res.username
    //     console.log(110,  this.params.username__username)
    //     })
    // },
    
    async fetchData() {
     await getInfo().then(res => {
        // console.log(113, res)
        this.params.username = res.username
        console.log(110,  this.params.username)

            // getJumpserverList(this.params).then(res => {
            // //   debugger
            // this.tableData = res.results
            // // console.log('表格数据', this.tableData)
            // // // this.gridData = res.results
            // // console.log(res.results)
            // this.totalNum = res.count
            // // this.params.out = out
            // console.log(123, this.params.username__username)
            // })
        })
    //     console.log(124,  this.params.username__username)
      getJumpserverList(this.params).then(res => {
        //   debugger
        this.tableData = res.results
        // console.log('表格数据', this.tableData)
        // // this.gridData = res.results
        // console.log(res.results)
        this.totalNum = res.count
        // this.params.out = out
        console.log(123, this.params.username)
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
    handleDel(project) {
      const id = project.id
      const name = project.hostname.server_name
      console.log(111, name)
      this.$confirm(`确定删除主机: ${name}, 是否继续?`, '提示', {  
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        deleteJumpserver(id).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.params.page = 1,
            this.fetchData()
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
   /* 添加,弹出模态窗、提交数据、取消 */
    handleAddBtn() {
      this.dialogVisibleForAdd = true
    },
    handleSubmitAdd(value) {
      // console.log(21, value)
      createJumpserver(value).then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchData()
      })
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.publishForm.$refs.form.resetFields()  // 清除掉子组件表单的数据
    },

    handleEdit(value) {
      const{ id, ...params } = value
      console.log(33, id)
      deleteRelease(id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.params.page = 1,
        this.fetchData()
     },
     err => {
       console.log(err.message)
     })
    },
    dateFormat:function(row, column) {
      var date = row[column.property];
      // console.log(140, date)
      if (date === undefined) {
            return "";
      }
      // return util.formatDate.format(new Date(date), 'yyyy-MM-dd');
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    hemanizeStatus(status) {
      // console.log(122, status)
      if (status === 1) {
        return {
          type: 'success',
          value: 'root'
        }
      }
      if (status === 2) {
        return {
          type: 'success',
          value: 'admin'
        }
      }
      if (status === 3) {
        return {
          type: 'success',
          value: 'rd'
        }
      }
      return {
        type: '',
        value: '-'
      }
    }
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

  .box-card {
    height: 600px;
      overflow-x: auto;
      overflow-y: auto;
  }
</style>