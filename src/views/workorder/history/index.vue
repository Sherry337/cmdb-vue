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
            prop="work_name"
            label="故障名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="content"
            label="故障内容"
            align="center"
            width="400">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="start_time"
            label="开始时间"
            align="center">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="stop_time"
            label="结束时间时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="manager_user.user"
            label="处理人"
            align="center">
          </el-table-column>
          <el-table-column      
            label="状态"
            align="center">
            <template slot-scope="scope">
              <el-tag effect="dark" :type="hemanizeStatus(scope.row.status).type">
                {{ hemanizeStatus(scope.row.status).value }}
              </el-tag>
            </template>
          </el-table-column>
          
          <router-link to='/release' ></router-link>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button 
                size="mini"
                type="primary" 
                @click="showDetail(scope.row)">处理方法
              </el-button>
              <el-dialog title="处理详情" :visible.sync="dialogTableVisible">
              </el-dialog>
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
import { getWorkorderList, updateWorkorder } from '@/api/workorder'
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
        search: '',
        status: 2
      },
      dialogTableVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getWorkorderList(this.params).then(res => {
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
    showDetail(value) {
    //     const { id, ...params } = value  // 很神奇，能把表单的值拆解成自己想要的样子
    //   // console.log(id)       
    //   // console.log(params)
    //   updateWorkorder(id, params).then(res => {
    //     this.$message({
    //       message: '更新成功',
    //       type: 'success'
    //     })
    //     this.fetchData()
    //   })
    this.dialogTableVisible = true
    },
    // 动态标签
    hemanizeStatus(status) {
      // console.log(122, status)
      if (status === 2) {
        return {
          type: 'succees',
          value: '处理完成'
        }
      }     
    },
    // 时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      // console.log(140, date)
      if (date === undefined) {
            return "";
      }
      // return util.formatDate.format(new Date(date), 'yyyy-MM-dd');
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
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