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
              <slot name="header">Question 00. 问题名</slot>
            </template>
            <p class="subtitle">
              <slot name="sub-title">问题描述 / 算法思想</slot>
            </p>
            <p class="text-body">
              <slot name="detail">
                先这样，再那样
              </slot>
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
        <n-tab-pane v-if="result.length" name="Result" tab="测试结果">      
          <n-card 
            class="output" 
            size="small" 
            header-style="padding: .8em;">
            <template #header>
              Testing Result
            </template>
            <template #header-extra>
              <n-button
                v-if="result.length"
                quaternary
                size="small"
                round
                type="success"
                @click="exportCsv">
                导出
              </n-button>
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
            :disabled="!fileListLength && !usecaseType"
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
import { NTabs, NTabPane, NCard, NCode, NScrollbar, NSpace, NCascader, NUpload, NUploadDragger, NIcon, NText, NP, NButton, NDataTable, useMessage, NPopover } from 'naive-ui'
import { ref } from 'vue'
import { CloudDownloadOutline } from '@vicons/ionicons5'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import Papa from 'papaparse'

const props = defineProps({
  context: String,  // 测试上下文
  options: Array,  // 支持的测试用例类型
  code: String, // 代码字符串
})

let composable, getArgs
const composables = import.meta.glob('../composables/*.js')
for(let key in composables){
  if(key === `../composables/${props.context}.js`){
    composables[key]().then(({useSingleTest, useGetArgs}) => {
      [ composable, getArgs ] = [ useSingleTest, useGetArgs ]
      //console.log(composable)
      //console.log(getArgs)
    })
    break
  }
}

/* import(`../composables/${props.context}`).then(({useSingleTest, useGetArgs}) => {
  [ composable, getArgs ] = [ useSingleTest, useGetArgs ]
}) */

const code = ref(props.code),
options = ref(props.options)

const usecaseType = ref(null)

// 传入.csv对应的数组，创建表头
const createColumns = (rawData) => {
  let cols = []
  //console.log(rawData[0])
  for(let item of rawData[0]){
    cols.push({
      title: item,
      key: item,
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
    //console.log(getArgs)
    //console.log(composable)
    let args = getArgs(row)
    row.ActualOutput = composable.apply(this, args)
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
function handleChange (options){
  fileListLength.value = options.fileList.length;
  if(fileListLength.value !== 0){
    // 获取手动上传的.csv文件对象,转化为数组
    //console.log(options.fileList[0].file)
    Papa.parse(options.fileList[0].file, {
      complete: (res) => {
        fileData.value = res.data
        //console.log(fileData.value)
      }
    })
  }else{
    fileData.value = null
  }
}
function getLocalFile (filePath){
  // 使用XMLHttpRequest读取本地文件
  let xhr = null
  if (window.XMLHttpRequest){
    xhr = new XMLHttpRequest()
  }else{
    xhr = new ActiveXObject(`Microsoft.XMLHTTP`)
  }
  const okStatus = document.location.protocol === 'file' ? 0 : 200
  xhr.open('GET', filePath, false)
  xhr.overrideMimeType('text/html;charset=utf-8')
  xhr.send()
  return xhr.status === okStatus ? xhr.responseText : null
}
const columns = ref([])
const result = ref([])
const pagination = {
  pageSize: 7
}
const currTab = ref('Question')
const message = useMessage()
function handleUpload(){
  if(fileListLength.value){
    // 使用手动上传的.csv文件
    message.info(`使用用户手动上传的测试用例。`)
  }else{
    // 使用项目本地的.csv文件
    let rawFile = getLocalFile(`/testUsecases/${props.context}/${usecaseType.value}.csv`)
    if(!rawFile){
      message.warning(`暂时未准备该类型测试用例，请选择其他用例集或手动上传用例集。`)
      return false
    }
    //console.log(rawFile)
    Papa.parse(rawFile, {
      complete: (res) => {
        fileData.value = res.data
      }
    })
    //console.log(fileData.value)
  }
  // 绘制表头
  columns.value = createColumns(fileData.value)
  // 绘制表格
  result.value = createRows(fileData.value)
  // 进行测试并回填结果
  executeTesting(result.value)
  message.success( `测试完毕，共执行 ${result.value.length} 个用例。`)
  currTab.value = 'Result'
}
// 导出.csv文件
function exportCsv() {
  const tableData = []
  const cols = []
  for(let col of columns.value){
    cols.push(col.title)
  }
  tableData.push(cols)
  for(let item of result.value){
    let row = []
    for(let property in item){
      row.push(item[property])
    }
    row.shift()
    tableData.push(row)
  }
  console.log(tableData)
  const csv = Papa.unparse(tableData)
  // 定义文件内容，类型为Blob
  let content = new Blob([csv])
  // 生产url对象
  let urlObject = window.URL || window.webkitURL || window
  let url = urlObject.createObjectURL(content)
  // 生产<a></a>DOM元素
  let el = document.createElement('a')
  // 链接赋值
  el.href = url
  el.download = `${props.context}_${fileListLength.value?'manual':usecaseType.value}.csv`
  // 模拟点击事件，开始下载
  el.click()
  // 移除链接，释放资源
  urlObject.revokeObjectURL(url)
}

hljs.registerLanguage('javascript', javascript)
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