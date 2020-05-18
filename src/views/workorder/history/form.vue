<template>
  <div class="publish-user">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">

      <el-form-item label="项目名" prop="project_name">
        <el-input v-model="form.project_name" placeholder="请输入项目名"></el-input>
      </el-form-item>

      <el-form-item label="项目描述" prop="desc">
        <!-- <el-input v-model="form.desc" placeholder="请输入项目名"></el-input> -->
            <el-input
            type="textarea"
            placeholder="请输入项目描述"
            v-model="form.desc"
            maxlength="50"
            show-word-limit
            >
            </el-input>
      </el-form-item>

      <el-form-item label="开发" prop="dev_user">
        <el-select v-model="form.dev_user" multiple filterable style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in publish_list"
            :key="item.index"
            :label="item.chinese_name"
            :value="item.id">
          </el-option>
        </el-select> 
      </el-form-item>

     <el-form-item label="审核人" prop="audit_user">
        <el-select v-model="form.audit_user" multiple filterable style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in publish_list"
            :key="item.index"
            :label="item.chinese_name"
            :value="item.id">
          </el-option>
        </el-select> 
      </el-form-item>

     <el-form-item label="测试" prop="release_user">
        <el-select v-model="form.release_user" multiple filterable style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in publish_list"
            :key="item.index"
            :label="item.chinese_name"
            :value="item.id">
          </el-option>
        </el-select> 
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

import { getUserList } from '@/api/users/user'

export default {
  name: 'publish-user',
  props: {
    form: {  // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          project_name: '',
          desc: '',
          dev_user: [],
          audit_user: [],
          release_user: []
        }
      }
    }
  },

  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
      },
      publish_list: [],
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

  created() {
    this.state = 1
  },
  watch: {
    state() {
      getUserList({ page_size: 100 }).then(res => {
        this.publish_list = res.results
        // console.log(this.publish_list) 
      })
    }
  } 

}
</script>

<style lang='scss' scoped>
.publish-user {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>

