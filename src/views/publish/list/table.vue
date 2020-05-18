<template>
  <div class="publish-list" >
  <el-table
    :data="value"
    border
    stripe
    style="width: 100%">

    <el-table-column
      label="项目名"
      prop="project_name"
      align="center">
    </el-table-column>

    <el-table-column
      label="项目描述"
      prop="desc"
      align="center">
    </el-table-column>

    <el-table-column
      label="开发"
      prop="dev_user"
      align="center">

      <template slot-scope="scope">
        <div v-for="(item) in scope.row.dev_user" style="text-align: center">
          <span style="float: left">{{item.user}}, </span>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="项目审核"
      prop="audit_user"
      align="center">

      <template slot-scope="scope">
        <div v-for="(item) in scope.row.audit_user" style="text-align: center">
          <span style="float: left">{{item.user}}, </span>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="测试"
      prop="release_user"
      align="center">

      <template slot-scope="scope">
        <div v-for="(item) in scope.row.release_user" style="text-align: center">
          <span style="float: left">{{item.user}}, </span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">更新</el-button>

        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>

        <el-button
          size="mini"
          type="primary"
          @click="handleRealse(scope.row)">申请发布</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
export default {
  name: 'publish-list',
  props: ['value'],
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 点击角色按钮，将子组件的事件传递给父组件 */
    handleRealse(value) {
      this.$emit('release', value)
    },

    /* 删除 */
    handleDelete(publish) {
      const id = publish.id
      const name = publish.project_name
      this.$confirm(`此操作将删除: ${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang='scss'>
.publish-list {}
</style>

