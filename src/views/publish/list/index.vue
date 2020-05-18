<template>
  <div class="publish">
    <div>
      <!--添加按钮-->
      <el-col :span="16">
        <el-button type="primary" size="small" @click="handleAddBtn">创建项目</el-button>
      </el-col>

      <!--搜索-->
      <el-col :span="3"  style="float:right;">
          <el-input clearable size="small" prefix-icon="el-icon-search" placeholder="搜索 (项目名)" @input="handleInput" @keyup.delete.native="handleInput">
        </el-input>
      </el-col>
 
    </div> 
   
    <!--表格-->
    <publish-list :value="publish" @edit="handleEdit" @release="handleRole"  @delete="handleDelete"></publish-list>

    <!--模态窗增加表单-->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisibleForAdd"
      width="50%">
      <publish-form
        ref="publishForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd">
      </publish-form>
    </el-dialog>
  
    <!--模态窗更新表单-->
    <el-dialog
      title="更新"
      :visible.sync="dialogVisibleForEdit"
      width="50%">
      <publish-form
        ref="publishForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit">
      </publish-form>
    </el-dialog>

    <!--模态窗角色表单-->
    <el-dialog
      title="发布申请"
      :visible.sync="dialogVisibleForRole"
      width="50%">
      <form-release
        ref="formRelease"
        :form="currentValue"
        @submit="handleSubmitRole"
        @cancel="handleCancelRole">
      </form-release>
    </el-dialog>

    <!--分页-->
    <div style="text-align: right;">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :page-size="pagesize"
        :total="totalNum"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getPublishList, createPublish, updatePublish, deletePublish } from '@/api/publish/list'
import { createRelease } from '@/api/publish/release'
// import { getInfo } from '@/api/login'
import PublishList from './table'
import PublishForm from './form'
import FormRelease from './form_release'

export default {
  name: 'publish',
  components: {
    PublishList,
    PublishForm,
    FormRelease
  },

  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      dialogVisibleForRole: false,
      currentValue: {},
      publish: [],
      totalNum: 0,
      pagesize: 10,
      params: {
        page: 1,
        search: ''
      } 
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getPublishList(this.params).then(
        res => {
          this.publish = res.results
          // console.log(15, res.results)
          this.totalNum = res.count
        })
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
      // console.log(this.params.page)
    },
    // searchClick() {
    //   this.fetchData()
    // },
        // 搜索
    handleInput(e) {
      this.params.search = e
      this.params.page = 1
      this.fetchData()
    },
    /* 添加,弹出模态窗、提交数据、取消 */
    handleAddBtn() {
      this.dialogVisibleForAdd = true
    },
    handleSubmitAdd(value) {
      // console.log(21, value)
      createPublish(value).then(res => {
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

    /* 更新，弹出模态窗、提交数据、取消 */
    handleEdit(value) {
      // console.log(28, value)
      this.currentValue = { ...value }   // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      this.currentValue['audit_user'] = this.currentValue['audit_user'].map(it => it.id)
      this.currentValue['dev_user'] = this.currentValue['dev_user'].map(it => it.id)
      this.currentValue['release_user'] = this.currentValue['release_user'].map(it => it.id)
      // console.log(27, this.currentValue)
      this.dialogVisibleForEdit = true
    },

    handleSubmitEdit(value) {
      // console.log(23, value)
      const { id, ...params } = value  // 很神奇，能把表单的值拆解成自己想要的样子
      // console.log(24, id)       
      // console.log(26, params)
      updatePublish(id, params).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchData()
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.publishForm.$refs.form.resetFields()
    }, 

    /* 分配角色，弹出模态窗、提交数据、取消 */
    handleRole(value) {
      this.currentValue = { ...value }   // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      // this.currentValue['role'] = this.currentValue['role'].map(it => it.id)
      // console.log(this.currentValue)
      this.dialogVisibleForRole = true
    },

    handleSubmitRole(value) {
      // console.log(value)
      // const { id, ...params } = value  // 很神奇，能把表单的值拆解成自己想要的样子
      // createRelease(params).then(res => {
      //   this.$message({
      //     message: '更新成功',
      //     type: 'success'
      //   })
      //   this.handleCancelRole()
      //   this.fetchData()
      // })
        const { id, desc, audit_user, dev_user, release_user, ...params } = value
        // console.log(31, params)
        createRelease(params).then(res => {
          // console.log(30, params)
        this.$message({
          message: '申请成功',
          type: 'success'
        })
        this.handleCancelRole()
        this.fetchData()
      },
      err => {
      //  console.log(err.message)
      this.$message({
        message: '没有权限',
        type:  'error'
      })
     })
      // this.dialogVisibleForRole = false
    },
    handleCancelRole() {
      this.dialogVisibleForRole = false
      this.$refs.formRelease.$refs.form.resetFields()
    }, 

   /* 删除 */
   handleDelete(id) {
     deletePublish(id).then(res => {
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
    }

  }

}
</script>

<style lang='scss' scoped>
.publish {
  padding: 10px;
}
</style>

