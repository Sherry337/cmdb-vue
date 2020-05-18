<template>
  <div>
    <el-card shadow="hover">
        数据图
        <ve-line :data="chartData"></ve-line>
    </el-card>
    <div style="margin-top:20px">  
        <el-row :gutter="24">
            <el-col :span="12">
                <el-card shadow="hover">
                每天点击量
                <ve-histogram :data="chartData01" ></ve-histogram>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                发布情况
                <ve-pie :data="chartData02" :settings="chartSettings"></ve-pie>
                </el-card>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line.common'
  import VeHistogram from 'v-charts/lib/histogram.common' 
  import VePie from 'v-charts/lib/pie.common'
    export default {
        name: "index",
        components: {
             VeLine,
             VeHistogram,
             VePie },
    
        data () {
            this.chartSettings = {
            radius: 150,
            //  offsetY: 200
        }
          return {
            chartData: {
              columns: ['date', 'PV'],
              rows: [
                { 'date': '01-01', 'PV': 1231 },
                { 'date': '01-02', 'PV': 1223 },
                { 'date': '01-03', 'PV': 2123 },
                { 'date': '01-04', 'PV': 4123 },
                { 'date': '01-05', 'PV': 3123 },
                { 'date': '01-06', 'PV': 7123 }
             ]
            },
            
            chartData01: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                ]
             },
            chartData02: {
                columns: ['名称', '访问用户'],
                rows: [
                    // { '名称': 'a', '日期': '1/1', '访问用户': 1393 },
                    // { '名称': 'b', '日期': '1/2', '访问用户': 3530 },
                    // { '名称': 'c', '日期': '1/3', '访问用户': 2923 },
                    // { '名称': 'd', '日期': '1/4', '访问用户': 1723 },
                    // { '名称': 'e', '日期': '1/5', '访问用户': 3792 },
                    // { '名称': 'f', '日期': '1/6', '访问用户': 4593 }
                    { '名称': 'a', '访问用户': 1393 },
                    { '名称': 'b', '访问用户': 3530 },
                    { '名称': 'c', '访问用户': 2923 },
                    { '名称': 'd', '访问用户': 1723 },
                    { '名称': 'e', '访问用户': 3792 },
                    { '名称': 'f', '访问用户': 4593 }
                ]
            },
          }
        }
    }
</script>
<style scoped>
</style>
