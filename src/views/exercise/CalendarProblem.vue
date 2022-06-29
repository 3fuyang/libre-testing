<template>
  <test-panel :context="context" :options="options" :code="code" :versions="versions" :ec-option="ecOption"
    :iteration="iteration">
    <template #header> Question 02. 万年历问题 </template>
    <template #sub-title> 算法思想 </template>
    <template #detail>
      本问题输入变量为年份、月份、日期三个，首先需要对输入的日期进行合法性判断，确定输入日期符合规范后再进行计算下一天的日期。
      <br />① 首先判断年份是否符合取值范围（1900≤year≤2100）； <br />②
      再判断月份是否符合取值范围（1≤month≤12）； <br />③
      计算该年份下该月的天数maxDays，然后判断输入日期是否符合取值范围（1≤day≤maxDays）；
      <br />④ 计算下一天的日期，尤其是当出现跨月份、跨年时需要给出正确的日期。
    </template>
  </test-panel>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import TestPanel from "../../components/TestPanel.vue"
import type { ECOption } from '@/interface'

// 上下文
const context = "calendarProblem"

// 测试用例集选项
const options = [
  {
    label: "边界值",
    value: "boundary-value",
    children: [
      {
        label: "基本边界值",
        value: "basic-boundary",
      },
      {
        label: "健壮边界值",
        value: "robustness-boundary",
      },
    ],
  },
  {
    label: "等价类",
    value: "equivalence",
    children: [
      {
        label: "弱一般等价类",
        value: "weak-general-equivalent",
      },
      {
        label: "强一般等价类",
        value: "strong-general-equivalent",
      },
      {
        label: "弱健壮等价类",
        value: "weak-robustness-equivalent",
      },
      {
        label: "强健壮等价类",
        value: "strong-robustness-equivalent",
      },
    ],
  },
  {
    label: "决策表",
    value: "decision",
    children: [
      {
        label: "决策表",
        value: "decision-table",
      },
    ],
  },
];

// 实现代码
const code = `function calendarProblem(year: number, month: number, day: number): string {
    if (year < 1900 || year > 2100) {
        return "年份数值越界"
    }
    if (month <= 0 || month > 12) {
        return "月份数值越界"
    }

    let monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let isLeap: number = 0
    if (year % 400 == 0) {
        isLeap = 1
    } else if (year % 100 != 0 && year % 4 == 0) {
        isLeap = 1;
    }

    monthDays[1] += isLeap
    let maxDays: number = monthDays[month - 1]
    if (day <= 0 || day > maxDays) {
        return "日期数值越界"
    }

    let result: number[] = [year, month, day + 1]

    if (day == maxDays) {
        result[2] = 1
        result[1]++
    }
    if (result[1] > 12) {
        result[1] = 1
        result[0]++
    }
    return result[0] + "/" + result[1] + "/" + result[2]
}`

// 程序版本集
const versions = [
  {
    label: "0.0.0",
    value: "0.0.0",
  },
  {
    label: "0.1.0",
    value: "0.1.0",
  },
  {
    label: "0.2.0",
    value: "0.2.0",
  },
]

// ECharts 绘图选项
const ecOption: ECOption = {
  xAxis: {
    type: "category",
    data: ["0.0.0版本", "0.1.0版本", "0.2.0版本"],
  },
  yAxis: [
    {
      type: "value",
      name: "测试用例通过率",
      alignTicks: true,
      position: "left",
      axisLabel: {
        formatter: "{value} %",
      },
    },
    {
      type: "value",
      name: "测试用例通过数",
      position: "right",
    },
  ],
  tooltip: {
    trigger: "axis",
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      data: [
        {
          value: 81.5,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.8, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
        },
        {
          value: 99.4,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.8, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
        },
        {
          value: 100,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.8, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
        },
      ],
      type: "bar",
      yAxisIndex: 0,
      name: "测试用例通过率",
      tooltip: {
        valueFormatter: (value) => value + " %",
      },
    },
    {
      data: [
        {
          value: 137,
          itemStyle: {
            color: "green",
          },
        },
        {
          value: 167,
          itemStyle: {
            color: "green",
          },
        },
        {
          value: 168,
          itemStyle: {
            color: "green",
          },
        },
      ],
      type: "line",
      yAxisIndex: 1,
      markPoint: {
        data: [{ type: "max", name: "Max" }],
      },
      name: "测试用例通过数",
      tooltip: {
        valueFormatter: (value) => value + " 个",
      },
    },
  ],
}

// 代码版本迭代信息
const iteration = {
  columns: [
    {
      title: '版本号',
      key: 'version'
    },
    {
      title: '测试数据集',
      key: 'dataset'
    },
    {
      title: '测试情况',
      key: 'result'
    },
    {
      title: '缺陷描述',
      key: 'bug'
    }
  ],
  data: [
    {
      key: '0',
      version: '0.0.0',
      dataset: '强健壮等价类',
      result: '通过137/167',
      bug: '当处于当月最后一天、当月为12月时的年月计算逻辑有误'
    },
    {
      key: '1',
      version: '0.1.0',
      dataset: '强健壮等价类',
      result: '通过167/168',
      bug: '闰年判断逻辑有误，整百年的特殊情况误判'
    },
    {
      key: '2',
      version: '0.2.0',
      dataset: '强健壮等价类',
      result: '通过168/168',
      bug: '测试全部通过'
    }
  ]
}
</script>

<style scoped>
</style>