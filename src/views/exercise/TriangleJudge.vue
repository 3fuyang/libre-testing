<template>
  <div class="flex-wrapper">
    <div class="left-flex-item">
      <n-tabs
        v-model:value="currTab">
        <n-tab-pane name="Question" tab="问题描述">
          <n-card 
            class="description" 
            size="small" 
            header-style="padding: .8em;">
            <template #header>
              Question 01. 判断三角形类型
            </template>
            <p class="subtitle">算法思想</p>
            <p class="text-body">
              首先判断其两边之和是否大于第三边，若大于则判断可以构成三角形，再进一步判断该三角形是什么三角形，并计算这个三角形的面积；否则不能构成三角形。
              <br/>① 从键盘输入三角形的三条边。
              <br/>② 判断两边之和是否大于第三边。
              <br/>③ 若条件成立则判断可构成三角形，计算其面积，并判断其类型；否则判断其不能构成三角形。
              <br/>④ 在类型判断中首先判断其是否三边相等，条件成立则判断其为等边三角形；否则判断其是否有两边相等，条件成立则判断其为等腰三角形；否则判断其是否有两边的平方和等于第三边的平方，条件成立则判断其为直角三角形；否则判断其为普通三角形。
            </p>
            <p class="subtitle">代码实现</p>
            <n-card 
              class="code-block" 
              embedded 
              :bordered="false" 
              content-style="padding: .5em;">
              <n-scrollbar style="max-height: 42vh;">
                <n-code 
                  :hljs="hljs" 
                  :code="code" 
                  language="js"></n-code>
              </n-scrollbar>
            </n-card>
          </n-card>
        </n-tab-pane>
        <n-tab-pane name="Result" tab="测试结果">
          <n-card 
            class="output" 
            size="small" 
            header-style="padding: .8em;">
            <template #header>
              Testing Result
            </template>
            <!-- 打印测试结果 -->
            <n-data-table
              size="small"
              :max-height="420"
              :bordered="false"
              :columns="columns"
              :data="result"
              :pagination="pagination">
            </n-data-table>
          </n-card>          
        </n-tab-pane>    
      </n-tabs>
    </div>
    <div class="right-flex-item">
      <n-card class="upload-box" size="small" header-style="padding: .8em;margin-bottom: .8em;">
        <template #header>
          Program Test
        </template>
        <p class="subtitle">Step 01. 选择用例集</p>
        <n-space vertical>
          <n-cascader
            class="cascader-input"
            v-model:value="usecaseType"
            :options="options"
            :show-path="false"
            :check-strategy="'child'"
            placeholder="Click to select"/>
        </n-space>
        <p class="subtitle">Step 02. 上传用例集 (Optional)</p>
        <n-space justify="center">
          <n-upload
            ref="uploadRef"
            action="#"
            :default-upload="false"
            accept=".csv"
            @change="handleChange">
            <n-upload-dragger class="upload-content">
              <div style="margin-bottom: 12px">
                <n-icon size="2.5em" :depth="3">
                  <cloud-download-outline />
                </n-icon>
              </div>
              <n-text>
                点击或者拖动文件到该区域来上传
              </n-text>
              <n-p depth="3" style="margin-top: .5em;">
                请上传 .csv 格式的文件<br/>(若上面已经选择了测试集，请直接跳转到第三步)
              </n-p>                                      
            </n-upload-dragger>
          </n-upload>
        </n-space>
        <p class="subtitle">Step 03. 运行测试集</p>
        <n-space justify="center">
          <n-button
            class="upload-btn"
            :disabled="!fileListLength"
            @click="handleUpload"
            strong
            type="primary">
            开始测试
          </n-button>
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { NTabs, NTabPane, NCard, NCode, NScrollbar, NSpace, NCascader, NUpload, NUploadDragger, NIcon, NText, NP, NButton, NDataTable } from 'naive-ui'
import { ref } from 'vue'
import { CloudDownloadOutline } from '@vicons/ionicons5'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import Papa from 'papaparse'
import { judgeTriangle } from '../../composables/triangleJudgeTest'

const usecaseType = ref(null)
const options = [
  {
    label: '边界值',
    value: 'boundary-value',
    children: [
      {
        label: '基本边界值',
        value: 'basic-boundary',        
      },
      {
        label: '健壮边界值',
        value: 'robust-boundary',        
      },
      {
        label: '最坏边界值',
        value: 'worst-boundary',        
      },            
    ]
  },
  {
    label: '等价类',
    value: 'equivalence',
    children: [
      {
        label: '弱一般等价类',
        value: 'weak-equivalence',        
      },
      {
        label: '强一般等价类',
        value: 'strong-equivalence',        
      },
      {
        label: '弱健壮等价类',
        value: 'weak-robust',        
      },
      {
        label: '强健壮等价类',
        value: 'strong-robust',        
      },                  
    ]    
  }
]

// 传入.csv对应的数组，创建表头
const createColumns = (rawData) => {
  let cols = []
  //console.log(rawData[0])
  for(let item of rawData[0]){
    cols.push({
      title: item,
      key: item
    })
  }
  return cols
}
const createRows = (rawData) => {
  let data = []
  let counter = 0
  const rowNum = rawData.length
  for(let i=1;i<rowNum;++i){
    let row = { key: counter++ }
    let j = 0
    for(let item of columns.value){
      row[item.key] = rawData[i][j++]
    }
    data.push(row)
  }
  return data
}

// 测试函数
const executeTesting = (dataContent) => {
  for(let row of dataContent){
    console.log(row)
    row.ActualOutput = judgeTriangle(parseInt(row.Edge1), parseInt(row.Edge2), parseInt(row.Edge3))
    row.TesterName = `RQD、fuyang`
    let myTime = new Date()
    row.Time = myTime.toLocaleString()
    myTime = null
    if(row.ActualOutput === row.ExpectedOutput){
      row.Correctness = `TRUE`
    }else{
      row.Correctness =  `FALSE`
    }
    //console.log(row)
  }
}

const uploadRef = ref(null)
const fileData = ref(null)
const fileListLength = ref(0)
function handleChange(options){
  fileListLength.value = options.fileList.length;
  if(fileListLength.value !== 0){
    // 获取上传的.csv文件对象,转化为数组
    //console.log(options.fileList[0].file)
    Papa.parse(options.fileList[0].file, {
      complete: (result) => {
        fileData.value = result.data
        //console.log(fileData.value)
      }
    })
  }else{
    fileData.value = null
  }
}
const columns = ref([])
const result = ref([])
const pagination = {
  pageSize: 7
}
const currTab = ref('Question')
function handleUpload(){
  // 绘制表头
  columns.value = createColumns(fileData.value)
  // 绘制表格
  result.value = createRows(fileData.value)
  // 进行测试并回填结果
  executeTesting(result.value)
  currTab.value = 'Result'
}

hljs.registerLanguage('javascript', javascript)
const code = `export function judgeTriangle(a, b, c) {
    let result
    
    if (a < 0) result = "数据非法，边长数值越界";
    if (b < 0) result = "数据非法，边长数值越界";
    if (c < 0) result = "数据非法，边长数值越界";
    if (a >= 999) result = "数据非法，边长数值越界";
    if (b >= 999) result = "数据非法，边长数值越界";
    if (c >= 999) result = "数据非法，边长数值越界";
    if (
        a + b > c &&
        a + c > b &&
        b + c > a
    ) {
        if (a == b && a == c)
            result = "该三角形的是等边三角形";
        else if (a == b || a == c || b == c)
            result = "该三角形的是等腰三角形";
        else result = "该三角形的是普通三角形";
    } else result = "所给三边数据不能构成三角形";
    
    return result;
}
`
</script>

<style scoped>
.flex-wrapper{
  display: flex;
  flex-direction: row;
}
.left-flex-item{
  max-width: 63%;
  overflow-x: hidden;
  flex: 1 0 auto;
  overflow-y: auto;
}
.right-flex-item{
  padding-top: 3.2em;
  margin-left: .6em;
  flex: 1 1 auto;
}
.description{
  box-sizing: border-box;
  width: 100%;
  max-height: 85vh;
}
.output{
  width: 100%;
  min-height: 70vh;
  max-height: 85vh;
}
.subtitle{
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;
}
.text-body{
  margin: 0 0 .8em 0;
  font-size: 1em;
}
.code-block{
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.upload-box{
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
.cascader-input{
  width: 50%;
  margin: 1.2em auto;
  overflow-x: hidden;
}
.upload-content{
  margin: 1.2em 0;
}
.upload-btn{
  margin: 1.2em 0;
}
</style>