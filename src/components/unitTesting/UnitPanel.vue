<script lang="ts" setup>
import { ref } from 'vue'
import { NCard, NText, NH2, NDataTable, type DataTableColumns } from 'naive-ui'
import Papa from 'papaparse'

const props = defineProps<{
  context: string
}>()

// 列数据
const columns = ref<DataTableColumns>([])
// 行数据
const data = ref<{ [index: string]: any }[]>([])
// 分页
const pagination = {
  pageSize: 6
}

function getLocalFile() {
  // 使用XMLHttpRequest读取本地文件
  let xhr = new XMLHttpRequest()
  const okStatus = document.location.protocol === 'file' ? 0 : 200
  xhr.open('GET', `/testUsecases/unitTesting/${props.context}.csv`, false)
  xhr.overrideMimeType('text/html;charset=utf-8')
  xhr.send()
  return xhr.status === okStatus ? xhr.responseText : null
}

// 生成列
const createColumns = (cols: string[]) => {
  cols.forEach(item => {
    columns.value.push({
      key: item,
      title: item
    })
  })
  //console.log(columns.value)
}

// 生成行
const createRows = (rows: any[]) => {
  rows.forEach(row => {
    const rowTmp: { [index: string]: any } = {}
    let counter: number = 0
    for (let prop of columns.value) {
      rowTmp[(prop as { key: string }).key] = row[counter++]
    }
    data.value.push(rowTmp)
  })
  //console.log(data.value)
}

const fileData = getLocalFile()
Papa.parse(fileData as string, {
  complete: (res) => {
    const parsedResult = res.data as string[][]
    createColumns(parsedResult[0])
    parsedResult.splice(0, 1)
    createRows(parsedResult)
  }
})


getLocalFile()
</script>

<template>
  <n-card class="unit-panel-wrapper">
    <n-h2>
      <slot name="title" />
    </n-h2>
    <n-text tag="div">
      <slot name="test-case" />
    </n-text>
    <br />
    <n-data-table size="small" :max-height="420" :bordered="false" :columns="columns" :data="data"
      :pagination="pagination" />
  </n-card>
</template>

<style scoped>
.unit-panel-wrapper {
  box-sizing: border-box;
  height: 41.5em;
}
</style>