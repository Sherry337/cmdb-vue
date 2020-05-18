<template>
  <div class="user-form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">

      <el-form-item label="故障名称" prop="work_name">
        <el-input v-model="form.work_name" placeholder="请输入故障名称"></el-input>
      </el-form-item>

      <el-form-item label="故障内容" prop="content">
        <el-input v-model="form.content" placeholder="请输入故障内容"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-wrapper">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm">保存</el-button>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'user-form',
  props: {
    form: {  // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          work_name: '',
          content: '',
        }
      }
    }
  },

  data() {
    return {
      rules: {
        work_name: [
          { required: true, message: '请输入故障名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入故障内容', trigger: 'blur' }
        ],
      },
      state: 0 
    }
  },

  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.$emit('submit', this.form)
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  },

}
</script>

<style lang='scss' scoped>
.user-form {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>

