<template>
  <div class="publish-user">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">

      <el-form-item label="机器名称" prop="hostname">
        <el-select v-model="form.hostname" multiple filterable style="width:100%" placeholder="请选择主机">
          <el-option
            v-for="item in server_list"
            :key="item.index"
            :label="item.server_name"
            :value="item.id">
          </el-option>
        </el-select> 
      </el-form-item>

      <el-form-item label="用户级别" prop="rank">
        <el-input v-model="form.rank" placeholder="请选择"></el-input>
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

import { getAssetsList } from '@/api/assets'
export default {
  name: 'publish-user',
  props: {
    form: {  // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          hostname: [],
          rank: '',
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
      server_list: [],
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
      getAssetsList({ size: 44 }).then(res => {
        this.server_list = res.results
        console.log(this.server_list) 
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

