<template>
  <div class="user-form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="中文名" prop="chinese_name">
        <el-input v-model="form.chinese_name" placeholder="请输入中文名"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
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
          username: '',
          chinese_name: '',
          email: '',
        }
      }
    }
  },

  data() {
    return {
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        chinese_name: [
          { required: true, message: '请输入中文名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
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

