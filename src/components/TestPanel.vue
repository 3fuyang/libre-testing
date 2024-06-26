<script setup lang="ts">
import { NH2, NTabs, NTabPane, NCard, NCode, NScrollbar, NSpace, NCascader, NUpload, NUploadDragger, NIcon, NText, NP, NButton, NDataTable, useMessage, NSelect } from 'naive-ui'
import type { CascaderOption, UploadProps } from 'naive-ui'
import { type Component, onUpdated, ref, computed } from 'vue'
import { CloudDownloadOutline } from '@vicons/ionicons5'
import type { Row, Column, ECOption, Iteration, IterationData } from '../interface'
import * as echarts from 'echarts/core'
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

const { default: hljs } = await import('highlight.js/lib/core')
const { default: typescript } = await import('highlight.js/lib/languages/typescript')
const { default: Papa } = await import('papaparse')

const props = defineProps<{
  context: string, // 测试上下文
  options: CascaderOption[], // 支持的测试用例类型
  code: string, // 代码字符串
  iteration: Iteration,
  versions: CascaderOption[], // 可选版本集
  ecOption: ECOption // ECharts 选项
}>()

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  PieChart,
  ToolboxComponent,
  BarChart
])

//测试结果饼状图
const echartOption: ECOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 60, name: 'No Output' },
        { value: 80, name: 'Passed' },
        { value: 32, name: 'Not Passed' }
      ]
    }
  ]
}

onUpdated(() => {
  if (currTab.value === 'Visualization') {
    // 加载测试结果饼状图
    const eChart = echarts.init(document.getElementById('chart') as HTMLDivElement)
    eChart.setOption(echartOption)

    // 加载版本迭代柱状图
    const iterationChart = echarts.init(document.getElementById('iterationChart') as HTMLDivElement)
    iterationChart.setOption(props.ecOption)

    // 绘制代码版本迭代表
    iterationColumns.value.length = 0
    iterationTable.value.length = 0
    iterationColumns.value.push(...props.iteration.columns)
    iterationTable.value.push(...props.iteration.data)
  }
})

let composable: (...args: number[]) => string, getArgs: (row: Row) => number[]

const composables = import.meta.glob('../composables/*.ts') as Record<
  string,
  () => Promise<{
    useSingleTest: NonNullable<typeof composable>;
    useGetArgs: NonNullable<typeof getArgs>;
  }>
>

const code = props.code,
  options = ref<CascaderOption[]>(props.options)

const version = ref(null)

const usecaseType = ref(null)

function handleVersionSelect(value: string) {
  for (const index in composables) {
    if (index === `../composables/${props.context}v${value}.ts`) {
      composables[index]()
        .then(({ useSingleTest, useGetArgs }) => {
          [composable, getArgs] = [useSingleTest, useGetArgs]
        })
      break
    }
  }
}

// 传入 `.csv` 对应的数组，创建表头
const createColumns = (rawData: string[][]) => {
  const cols: { title: string; key: string }[] = []
  for (let item of rawData[0]) {
    cols.push({
      title: item,
      key: item,
    })
  }
  return cols
}

const createRows = (rawData: string[][]) => {
  let data = []
  let counter = 0
  const rowNum = rawData.length
  for (let i = 1; i < rowNum; ++i) {
    let row: Row = { key: (counter++).toString() }
    let j = 0
    for (let item of resultColumns.value) {
      row[item.key] = rawData[i][j++]
    }
    data.push(row)
  }
  return data
}

// 测试函数
const executeTesting = (dataContent: Row[]) => {
  let falseNum = 0
  let nullAnsNum = 0
  for (let row of dataContent) {
    let args = getArgs(row)
    row.ActualOutput = composable.apply(this, args)
    if (row.ActualOutput == null) {
      nullAnsNum++
    }
    row.TesterName = `RQD、fuyang`
    let myTime = new Date()
    row.Time = myTime.toLocaleString()
    if (row.ActualOutput === row.ExpectedOutput) {
      row.Correctness = `TRUE`
    } else {
      row.Correctness = `FALSE`
      falseNum++
    }
  }
  return {
    falseNum,
    nullAnsNum
  }
}

const uploadRef = ref<Component | null>(null)
const fileData = ref<string[][] | null>(null)
const fileListLength = ref(0)
const handleUpload: UploadProps['onChange'] = ({ fileList }) => {
  fileListLength.value = fileList.length;
  const { file } = fileList[0];
  if (file) {
    // 获取手动上传的 `.csv` 文件对象,转化为数组
    Papa.parse<string[]>(file, {
      complete: ({ data }) => {
        fileData.value = data
      }
    })
  } else {
    fileData.value = null
  }
}

function getLocalFile(filePath: string) {
  // 使用 XMLHttpRequest 读取服务端文件
  let xhr = null
  xhr = new XMLHttpRequest()
  const okStatus = document.location.protocol === 'file' ? 0 : 200
  xhr.open('GET', filePath, false)
  xhr.overrideMimeType('text/html;charset=utf-8')
  xhr.send()
  return xhr.status === okStatus ? xhr.responseText : null
}

const iterationColumns = ref<Column[]>([])
const iterationTable = ref<IterationData[]>([])

const resultColumns = ref<Column[]>([])
const result = ref<Row[]>([])
const pagination = {
  pageSize: 7
}
const currTab = ref('Question')
const message = useMessage()
function handleTesting() {
  if (fileListLength.value) {
    // 使用客户端上传的 `.csv` 文件
    message.info(`使用用户手动上传的测试用例。`)
  } else {
    // 使用服务端预设的 `.csv` 文件
    const rawFile = getLocalFile(`/testUsecases/${props.context}/${usecaseType.value}.csv`)
    if (!rawFile) {
      message.warning(`暂时未准备该类型测试用例，请选择其他用例集或手动上传用例集。`)
      return false
    }
    Papa.parse<string[]>(rawFile, {
      complete: ({ data }) => {
        fileData.value = data
      }
    })
  }
  if (!fileData.value) {
    message.error(`未找到测试用例，请重新选择测试用例集或手动上传用例集。`)
    return false
  }
  // 绘制表头
  resultColumns.value = createColumns(fileData.value)
  // 绘制表格
  result.value = createRows(fileData.value)
  // 进行测试并回填结果
  const { falseNum, nullAnsNum } = executeTesting(result.value)
  message.success(`测试完毕，共执行 ${result.value.length} 个用例，通过 ${result.value.length - falseNum} 个用例。`)

  // @ts-expect-error a mutation
  echartOption.series[0].data[0].value = nullAnsNum
  // @ts-expect-error a mutation
  echartOption.series[0].data[1].value = result.value.length - falseNum
  // @ts-expect-error a mutation
  echartOption.series[0].data[2].value = falseNum

  currTab.value = 'Result'
}

// 导出 `.csv` 文件
function exportCsv() {
  const tableData = []
  const cols = []
  for (const col of resultColumns.value) {
    cols.push(col.title)
  }
  tableData.push(cols)
  for (const rowObj of result.value) {
    const rowData: string[] = []
    Object.keys(rowObj).forEach((key) => {
      rowData.push(rowObj[key] as string)
    })
    rowData.shift()
    tableData.push(rowData)
  }
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
  el.download = `${props.context}_${fileListLength.value ? 'manual' : usecaseType.value}.csv`
  // 模拟点击事件，开始下载
  el.click()
  // 移除链接，释放资源
  urlObject.revokeObjectURL(url)
}

hljs.registerLanguage('typescript', typescript)

const ellipsisColumns = computed(() => {
  return resultColumns.value.map((col) => {
    return {
      ...col,
      ellipsis: true
    }
  })
})

</script>

<template>
  <div class="flex-wrapper">
    <div class="left-flex-item">
      <n-tabs v-model:value="currTab">
        <n-tab-pane
          name="Question"
          tab="问题描述"
        >
          <n-card
            class="description"
            size="small"
            header-style="padding: .8em;"
          >
            <template #header>
              <slot name="header">
                Question 00. 问题名
              </slot>
            </template>
            <p class="subtitle">
              <slot name="sub-title">
                问题描述 / 算法思想
              </slot>
            </p>
            <p class="text-body">
              <slot name="detail">
                先这样，再那样
              </slot>
            </p>
            <p class="subtitle">
              代码实现
            </p>
            <n-card
              class="code-block"
              embedded
              :bordered="false"
              content-style="padding: .5em;"
            >
              <n-scrollbar style="max-height: 42vh;">
                <n-code
                  :hljs="hljs"
                  :code="code"
                  language="ts"
                  show-line-numbers
                />
              </n-scrollbar>
            </n-card>
          </n-card>
        </n-tab-pane>
        <n-tab-pane
          v-if="result.length"
          name="Result"
          tab="测试结果"
        >
          <n-card
            size="small"
            header-style="padding: .8rem;"
          >
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
                @click="exportCsv"
              >
                导出
              </n-button>
            </template>
            <!-- 打印测试结果 -->
            <n-data-table
              size="small"
              :max-height="420"
              :bordered="false"
              :columns="ellipsisColumns"
              :data="result"
              :pagination="pagination"
            />
          </n-card>
        </n-tab-pane>
        <n-tab-pane
          v-if="result.length"
          name="Visualization"
          tab="可视化分析"
        >
          <n-card
            class="visualization"
            size="small"
            header-style="padding: .8em;"
          >
            <n-scrollbar style="max-height: 78vh;">
              <n-h2>
                测试情况
              </n-h2>
              <div
                id="chart"
                class="chart"
              />
              <n-h2>
                版本迭代
              </n-h2>
              <n-card
                class="description"
                embedded
                :bordered="false"
                content-style="padding: .5em;"
              >
                <div
                  id="iterationChart"
                  class="chart"
                />
              </n-card>
              <n-data-table
                size="small"
                :bordered="false"
                :columns="iterationColumns"
                :data="iterationTable"
              />
            </n-scrollbar>
          </n-card>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="right-flex-item">
      <n-card
        class="upload-box"
        size="small"
        header-style="padding: .8em; margin-bottom: .8em;"
      >
        <template #header>
          Program Test
        </template>
        <p class="subtitle">
          Step 01. 选择程序版本
        </p>
        <n-space vertical>
          <n-select
            v-model:value="version"
            class="cascader-input"
            :options="props.versions"
            placeholder="Click to select"
            @update:value="handleVersionSelect"
          />
        </n-space>
        <p class="subtitle">
          Step 02. 选择用例集
        </p>
        <n-space vertical>
          <n-cascader
            v-model:value="usecaseType"
            class="cascader-input"
            :options="options"
            :show-path="false"
            :check-strategy="'child'"
            placeholder="Click to select"
          />
        </n-space>
        <p class="subtitle">
          Step 03. 上传用例集 (Optional)
        </p>
        <n-space justify="center">
          <n-upload
            ref="uploadRef"
            action="#"
            :default-upload="false"
            accept=".csv"
            @change="handleUpload"
          >
            <n-upload-dragger class="upload-content">
              <div style="margin-bottom: 12px">
                <n-icon
                  size="2.5em"
                  :depth="3"
                >
                  <cloud-download-outline />
                </n-icon>
              </div>
              <n-text>
                点击或者拖动文件到该区域来上传
              </n-text>
              <n-p
                depth="3"
                style="margin-top: .5em;"
              >
                请上传 .csv 格式的文件<br>(若上面已经选择了测试集，请直接跳转到第三步)
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-space>
        <p class="subtitle">
          Step 04. 运行测试集
        </p>
        <n-space justify="center">
          <n-button
            class="upload-btn"
            :disabled="!((fileListLength || usecaseType) && version)"
            strong
            type="primary"
            @click="handleTesting"
          >
            开始测试
          </n-button>
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.flex-wrapper {
  display: flex;
  gap: .5rem;
}

.left-flex-item {
  flex: 3;
  overflow-y: auto;
}

.visualization {
  width: 100%;
  box-sizing: border-box;
}

.chart {
  font-size: 1rem;
  width: 42rem;
  height: 20rem;
}

.right-flex-item {
  padding-top: 2.8rem;
  flex: 2;
}

.description {
  box-sizing: border-box;
  width: 100%;
}

.subtitle {
  margin: 0;
  font-size: .875rem;
  font-weight: 600;
}

.text-body {
  margin-bottom: .5rem;
  font-size: .875rem;
}

.code-block {
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.upload-box {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

.cascader-input {
  width: max(10rem, 50%);
  margin: 1rem auto;
  overflow-x: hidden;
}

.upload-content {
  margin: 1rem 0;
}

.upload-btn {
  margin: 1rem 0;
}
</style>