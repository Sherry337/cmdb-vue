<template>
  <div class="form-release">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">

      <el-form-item label="项目名" prop="project_name">
        <el-input v-model="form.project_name" readonly></el-input>
      </el-form-item>

      <el-form-item label="上线版本" prop="version">
        <el-input v-model="form.version" placeholder="请输入上线的版本号"></el-input>
      </el-form-item>

      <!-- <el-form-item label="上线描述" prop="info">
        <el-input v-model="form.info" placeholder="请输入描述信息"></el-input>
      </el-form-item> -->

     <el-form-item label="版本描述" prop="info">
            <el-input
            type="textarea"
            placeholder="请输入描述信息"
            v-model="form.info"
            maxlength="100"
            show-word-limit
            >
            </el-input>
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
  name: 'form-release',
  props: {
    form: {  // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          project_name: '',
          version: '',
          info: '',
        }
      }
    }
  },

  data() {
    return {
      rules: {
        version: [
          { required: true, message: '请输入上线的版本号', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
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
.form-release {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>

