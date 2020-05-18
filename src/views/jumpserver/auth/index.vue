<template>
  <div class="assets-container">
      <div>
      <el-col :span="3"  style="float:right; margin-right:10px;">
        <!-- <el-input placeholder="搜索" v-model="params.name" @keyup.enter.native="searchClick" @keyup.delete.native="searchClick"> -->
          <el-input clearable size="small" prefix-icon="el-icon-search" placeholder="搜索 (主机名&IP&所属用户)" @input="handleInput" @keyup.delete.native="handleInput">
          <!-- <el-button slot="append" icon="el-icon-search" @click="handleInput"></el-button> -->
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
            prop="username"
            label="申请人"
            align="center">
          </el-table-column>
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
            align="center"
            sortable>
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
                @click="handleUpdata(scope.row)">通过
              </el-button>
              <el-button 
                size="mini"
                type="danger" 
                @click="handleDel(scope.row)">拒绝
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div>
        <router-view></router-view>
      </div>

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
import { getJumpserverList, updateJumpserver, deleteJumpserver } from '@/api/jumpserver'
import moment from 'moment'

export default {
  data() {
    return {
      tableData: [],
      gridData: [],
      // dilteData: [],
      totalNum: 0,
      params: {
        page: 1,
        // username__username: '',
        search: '',
        status: 1
      },
      dialogTableVisible: false
    }
  },
  created() {
    // this.abc()
    this.fetchData()

  },
  methods: {   
    fetchData() {
      getJumpserverList(this.params).then(res => {
        //   debugger
        this.tableData = res.results
        // console.log('表格数据', this.tableData)
        // // this.gridData = res.results
        // console.log(res.results)
        this.totalNum = res.count
        // this.params.out = out
        console.log(123, this.params.username__username)
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
    handleUpdata(value) {
      const { id, ...params } = value
      console.log(222, id)
      console.log(111, params)
      updateJumpserver(id, params).then(res => {
              this.$message({
                message: '审核成功',
                type: 'success'
              })
              this.fetchData()
            },
            err => {
              //  console.log(err.message)
              this.$message({
                message: '没有权限',
                type:  'error'
              })
            })
      },
    handleDel(project) {
      const id = project.id
      const name = project.hostname
      console.log(111, name)
      this.$confirm(`是否拒绝授权: ${name}, 是否继续?`, '提示', {  
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