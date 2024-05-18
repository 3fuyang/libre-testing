<script lang="ts" setup>
import { ref } from 'vue'
import { NCard, NText, NH2, NDataTable, type DataTableColumns } from 'naive-ui'
import Papa from 'papaparse'
import type { RowData } from 'naive-ui/es/data-table/src/interface';

const props = defineProps<{
  context: string
}>()

// 列数据
const columns = ref<DataTableColumns>([])
// 行数据
const data = ref<RowData[]>([])
// 分页
const pagination = {
  pageSize: 6
}

function getLocalFile() {
  // 使用 XMLHttpRequest 读取服务端文件
  let xhr = new XMLHttpRequest()
  const okStatus = document.location.protocol === 'file' ? 0 : 200
  xhr.open('GET', `/testUsecases/unitTesting/${props.context}.csv`, false)
  xhr.overrideMimeType('text/html;charset=utf-8')
  xhr.send()
  return xhr.status === okStatus ? xhr.responseText : null
}

// 生成列
function createColumns(cols: string[]) {
  for (const col of cols) {
    columns.value.push({
      key: col,
      title: col
    })
  }
}

// 生成行
function createRows(rows: string[][]) {
  for (const row of rows) {
    const rowTmp: RowData = {}
    let counter = 0
    for (const prop of columns.value) {
      rowTmp[(prop as { key: string }).key] = row[counter++]
    }
    data.value.push(rowTmp)
  }
}

const fileData = getLocalFile()
Papa.parse <string[]>(fileData as string, {
  complete: ({ data }) => {
    const parsedResult = [...data]
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
    <br>
    <n-data-table
      size="small"
      :max-height="420"
      :bordered="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-card>
</template>

<style scoped>
.unit-panel-wrapper {
  box-sizing: border-box;
  height: 41.5em;
}
</style>