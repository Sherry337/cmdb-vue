<template>
  <div class="user">
    <div>
      <!--添加按钮-->
      <el-col :span="16">
        <el-button type="primary" size="small" @click="handleAddBtn">创建用户</el-button>
      </el-col>

      <!--搜索-->
      <el-col :span="3"  style="float:right;">
          <el-input clearable size="small" prefix-icon="el-icon-search" placeholder="搜索 (主机名&IP)" @input="handleInput" @keyup.delete.native="handleInput">
        </el-input>
      </el-col>
 
    </div> 
   
    <!--表格-->
    <user-list :value="users" @edit="handleEdit" @role="handleRole"  @delete="handleDelete"></user-list>

    <!--模态窗增加表单-->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisibleForAdd"
      width="50%">
      <user-form
        ref="userForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd">
      </user-form>
    </el-dialog>
  
    <!--模态窗更新表单-->
    <el-dialog
      title="更新"
      :visible.sync="dialogVisibleForEdit"
      width="50%">
      <user-form
        ref="userForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit">
      </user-form>
    </el-dialog>

    <!--模态窗角色表单-->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisibleForRole"
      width="50%">
      <user-role
        ref="userRole"
        :form="currentValue"
        @submit="handleSubmitRole"
        @cancel="handleCancelRole">
      </user-role>
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
import { getUserList, createUser, updateUser, deleteUser, updateUserGroup } from '@/api/users/user'
import UserList from './table'
import UserForm from './form'
import UserRole from './form_role'

export default {
  name: 'user',
  components: {
    UserList,
    UserForm,
    UserRole
  },

  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      dialogVisibleForRole: false,
      currentValue: {},
      users: [],
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
      getUserList(this.params).then(
        res => {
          this.users = res.results
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
      createUser(value).then(res => {
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
      this.$refs.userForm.$refs.form.resetFields()  // 清除掉子组件表单的数据
    },

    /* 更新，弹出模态窗、提交数据、取消 */
    handleEdit(value) {
      this.currentValue = { ...value }   // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      // console.log(20 ,this.currentValue)
      this.dialogVisibleForEdit = true
    },

    handleSubmitEdit(value) {
      // console.log(value)
      const { id, ...params } = value  // 很神奇，能把表单的值拆解成自己想要的样子
      // console.log(id)       
      // console.log(params)
      updateUser(id, params).then(res => {
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
      this.$refs.userForm.$refs.form.resetFields()
    }, 

    /* 分配角色，弹出模态窗、提交数据、取消 */
    handleRole(value) {
      this.currentValue = { ...value }   // 将table子组件传来的值给父组件的变量，然后渲染更新表单
      this.currentValue['role'] = this.currentValue['role'].map(it => it.id)
      console.log(13, this.currentValue['role'])
      this.dialogVisibleForRole = true
    },

    handleSubmitRole(value) {
      // console.log(14, value)
      const { id, ...params } = value  // 很神奇，能把表单的值拆解成自己想要的样子
      updateUserGroup(id, params).then(res => {
        // console.log(15, params)
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.handleCancelRole()
        this.fetchData()
      })
    },
    handleCancelRole() {
      this.dialogVisibleForRole = false
      this.$refs.userRole.$refs.form.resetFields()
    }, 

   /* 删除 */
   handleDelete(id) {
     deleteUser(id).then(res => {
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
.user {
  padding: 10px;
}
</style>

