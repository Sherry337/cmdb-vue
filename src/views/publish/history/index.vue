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
          :default-sort = "{prop: 'deploy_time', order: 'descending'}"
          style="width: 100%">
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="version"
            label="上线版本"
            align="center">
          </el-table-column>
          <el-table-column
            prop="info"
            label="上线描述"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicant.user"
            label="申请人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reviewer.user"
            label="审核人员"
            align="center">
          </el-table-column>
          <el-table-column
            prop="assign_to.user"
            label="发布人员"
            align="center">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="apply_time"
            label="申请时间"
            align="center">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="deploy_time"
            label="发布时间"
            align="center"
            sortable>
          </el-table-column>
            <el-table-column      
            label="上线状态"
            align="center">
            <template slot-scope="scope">
              <el-tag effect="dark" :type="hemanizeStatus(scope.row.release_status).type">
                {{ hemanizeStatus(scope.row.release_status).value }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button 
                size="mini"
                type="primary" 
                @click="showDetail(scope.row)">日志详情
              </el-button>
                <el-dialog title="日志信息" :visible.sync="dialogTableVisible">
                  <div style="margin-top: 10px;" class="box-card">
                   <pre> {{ gridData }} </pre>
                  </div>
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
import { getReleaseList, deleteRelease } from '@/api/publish/release'
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
        status: 4
      },
      dialogTableVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getReleaseList(this.params).then(res => {
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
      // this.$router.replace('/release01')
      console.log(135, row)
      // this.$router.push({path: '/release', query: {project_name: row.project_name, version: row.version, id: row.id }})
      console.log(136, row.id)
        console.log('当前行数据', row)
        this.dialogTableVisible = true
        // 内层表格赋值
        // debugger //调试
        this.gridData = row.console_output
        // this.gridData = row.servicedir
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
          value: '发布成功'
        }
      }
      if (status === 2) {
        return {
          type: 'info',
          value: '终止发布'
        }
      }
      if (status === 3) {
        return {
          type: 'danger',
          value: '发布失败'
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