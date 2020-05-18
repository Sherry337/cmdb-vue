<template>
<div class="release">
    <el-card shadow="never">
    <div class="connet">
        <el-steps :active="status" finish-status="success">
        <el-step title="申请"></el-step>
        <el-step title="审核"></el-step>
        <el-step title="上线"></el-step>
        </el-steps>
    </div>

    <div class="connet1">
        <td style="width:200px">
        <li>{{ this.$route.query.project_name }}</li> 
        </td>
        <td style="width:200px">
        <li>{{ this.$route.query.version }}</li>
        </td>
    </div>
    
    <div class="connet2">
      <el-progress  :text-inside="true" :stroke-width="20" :percentage="used">
      </el-progress>
      <div v-loading="loading"
        element-loading-text=""
        element-loading-spinner="el-icon-loading"
        class="connet5">

      </div>
    </div>

    <div class="connet3">
       <el-button  v-if="show" style="margin-top: 12px;" @click="next">下一步</el-button> 
       <router-link to='/publish/history'></router-link> 
       <router-view></router-view>
    </div>
    </el-card>

    <!-- <hr style="height:1px;border:none;border-top:1px solid #555555;" /> -->

    <div class="connet4">
    <el-card shadow="never">

      <div slot="header" class="clearfix">
        <span>日志输出：</span>
      </div>

    <div  @click="jenkins_log">
       <pre> {{ jenkins_console }}</pre>
    </div>
    </el-card>
    </div>

    <!-- <div class="connet4" @click="jenkins_log">
       <pre> {{ jenkins_console }}</pre>
    </div> -->

</div>
</template>

<script>
import { getReleaseList, updateRelease, deleteRelease } from '@/api/publish/release'
import { getInfo } from '@/api/login'

  export default {
    data() {
      return {
        status: 1,
        data: [],
        username: '',
        show: "ture",
        jenkins_console: "log",
        timer: null,
        used: "",
        loading: false,
        release_status: "",
        // project_name : ''
        params: {
          status: 1,
          page: 1,
        }
      }
    }, 
    created() {
    this.fetchData()
    // setInterval(this.fetchData(), 30000);
    // window.setInterval(() => {
    //       setTimeout( this.fetchData(), 0)
    //   }, 3000)
    // this.getFamilyBase_info()
    clearInterval(this.timer)
    this.timer = null
    this.setTimer()
    },
    methods: {
      fetchData() {
        getReleaseList(this.params).then(res => {
          // console.log(121, res)
        this.data = res.results.find(o=>o.id == this.$route.query.id)
        // console.log(120, this.data)
        // console.log(122, this.$route.query.id)
        this.status = this.data.status
        // console.log(114, this.status)
        this.jenkins_console = this.data.console_output
        this.release_status = this.data.release_status
      //   console.log(120, this.jenkins_console)
            }),
        getInfo().then(res => {
          // console.log(113, res)
          this.username = res.id
          // console.log(110,  this.username)
         })
        //  this.show = ()
       },
      // sleep睡眠函数 使用方法： this.sleep(1800)
      async next() {
        // if (this.active++ > 2) this.active = 3;
        // let project_name = this.$route.query.project_name
        // getReleaseList(this.params).then(res => {
        //   debugger
        // for(var i in res.results) {
        //     if(this.$route.query.version == res.results[i] ){
        //         this.status = i.status
        //     }
        // }

        // for( let i of res.results){
        //     // if(this.$route.query.version == i.id ){
        //     //    console.log(101, i);
        //     //    console.log(102, this.$route.query.id);
        //     //  }
        //     // (this.$route.query.id == i.id) ? this.status = i.status : this.status = 1
        //     this.status = (this.$router.query.id === i.id) ? i.status : 1
        //  }
        
        // console.log(100 , this.status)
        // console.log('表格数据', this.tableData)
        // // this.gridData = res.results
        // console.log(res.results)
        // this.totalNum = res.count
        // this.params.out = out

        // this.data = res.results.find(o=>o.id == this.$route.query.id)
        // console.log(120, this.data)
        // this.status = this.data.status + 1
        // console.log(this.status)
            // })

      const id =  this.$route.query.id // 很神奇，能把表单的值拆解成自己想要的样子
      const project_name =  this.$route.query.project_name
      if (this.status === 1) {
          const formdata = {'project_name': project_name,'status':this.status+1,'reviewer':this.username }
           updateRelease(id, formdata).then(res => {
              this.$message({
                message: '审核成功',
                type: 'success'
              })
              this.fetchData()
            },
            err => {
              //  console.log(err.message)
              this.$message({
                message: '没有权限',
                type:  'error'
              })
            })
      } else if (this.status === 2) {
          const formdata = {'project_name': project_name,'status':this.status+1,'assign_to':this.username }
          updateRelease(id, formdata).then(res => {
               this.$message({
                message: '正在发布',
                type: 'success'
              })
              this.fetchData()
              this.show = false
              this.loading = true
            },
            err => {
              //  console.log(err.message)
              this.$message({
                message: '发生错误',
                type:  'error'
              })
            }
            )
            this.params.status = 3
            this.used = 0
            // this.used = 20
            // this.sleep(10000)
            // this.used = 40
            // this.sleep(10000)
            // this.used = 80

            
          // this.$router.push({path: '/publish/history', query: {id: id }})
          console.log(117, this.params.status)
          // deleteRelease(id).then(res => {
          //     this.$message({
          //       message: '加入历史列表',
          //       type: 'success'
          //     })
          //     this.fetchData()
          //     },
          //     err => {
          //       console.log(err.message)
          //     })
      } else {
        console.log(200)
      }
        },
      // 这是一个定时器
      jenkins_log() {
        // this.params.status = 3
        // console.log(125,this.params.status)
        // window.setInterval(() => {
        //       setTimeout( this.fetchData(), 0)
        //   }, 30000)
        },
      setTimer() {
            if(this.timer == null) {
                this.timer = setInterval( () => {
                  if (this.status == 3) {
                    // this.params.status = 3
                    // 动态进度条
                    if(this.used != 99) {
                      this.used = this.used + 1
                    }
                    this.fetchData()
                    console.log('开始定时...每过一秒执行一次')
                  }
                }, 1000)
            }
        },
      },
    destroyed() {
      clearInterval(this.timer)
            this.timer = null
       },
    watch: {
        release_status(now, old){
          console.log(200, now)
          console.log(200, old)
          if(now == 1 | now == 2 | now == 3 ) {
            // 进度条
            this.used = 100
            // 加载圈
            this.loading = false
            console.log(this.release_status)
            clearInterval(this.timer)
            this.timer = null
          }
          
        }
      },
    }
</script>

<style lang="scss" scoped>
    .release {
        width: 70%;
        height: 80%;
        // margin-top: 40px;
        // text-align: center;
        margin: auto;
        margin-top: 40px;
        
        
    }
    .connet {
        // width: 70%; 
        // margin-top: 20px;
    }
    .connet1 {
        // margin-left: 20px;
        margin-top: 20px;
    }
    .connet2 {
        // margin-left: 20px;
        margin-top: 20px;
        // width: 70%;
    }
    .connet3 {
        margin-top: 40px;
        text-align: right;
    }
    .connet4 {
      // margin-left: 20px;
      margin-top: 20px;
      height: 400px;
      overflow-x: auto;
      overflow-y: auto;
      // width: 70%;
    }
    .connet5 {
      float:right;
      margin-right:17px;
      margin-top: 2px;
    }
</style>

