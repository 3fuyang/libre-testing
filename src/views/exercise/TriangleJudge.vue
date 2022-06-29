<template>
  <test-panel :context="context" :options="options" :code="code" :versions="versions" :ec-option="ecOption"
    :iteration="iteration">
    <template #header>
      Question 01. 判断三角形类型
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      本题输入变量有a, b, c三个，首先判断其两边之和是否大于第三边，若大于则判断可以构成三角形，再进一步判断该三角形是什么三角形；否则不能构成三角形。
      <br />① 从键盘输入三角形的三条边；
      <br />② 判断两边之和是否大于第三边，若条件成立则判断可构成三角形，否则判断其不能构成三角形；
      <br />③ 继续判断三角形类型；
      <br />④ 首先判断其是否三边相等，条件成立则判断其为等边三角形；否则判断其是否有两边相等，条件成立则判断其为等腰三角形；否则判断其为普通三角形。
    </template>
  </test-panel>
</template>

<script setup lang="ts">
import type { ECOption } from '@/interface'
import * as echarts from 'echarts/core'
import TestPanel from '../../components/TestPanel.vue'

// 上下文
const context = 'triangleJudge'

// 测试用例集选项
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
        value: 'robustness-boundary',
      },
    ]
  },
  {
    label: '等价类',
    value: 'equivalence',
    children: [
      {
        label: '弱一般等价类',
        value: 'weak-general-equivalent',
      },
      {
        label: '强一般等价类',
        value: 'strong-general-equivalent',
      },
      {
        label: '弱健壮等价类',
        value: 'weak-robustness-equivalent',
      },
      {
        label: '强健壮等价类',
        value: 'strong-robustness-equivalent',
      },
    ]
  }
]

// 实现代码
const code = `function triangleJudge(a: number, b: number, c: number): string {
    if (a <= 0 || b <= 0 || c <= 0 ||  a > 200 || b > 200 || c > 200){
        return '边长数值越界'
    }
    if (
        a + b > c &&
        a + c > b &&
        b + c > a
    ) {
        if (a === b && a === c){
            return '该三角形是等边三角形'
        }else if (a === b || a === c || b === c){
            return '该三角形是等腰三角形'
        }else {
            return '该三角形是普通三角形'
        }
    } else {
        return '所给三边数据不能构成三角形'
    }
}`

// 程序版本集
const versions = [
  {
    label: '0.0.0',
    value: '0.0.0'
  },
  {
    label: '0.1.0',
    value: '0.1.0'
  },
]

// ECharts 绘图选项
const ecOption: ECOption = {
  xAxis: {
    type: 'category',
    data: ['0.0.0版本', '0.1.0版本']
  },
  yAxis: [
    {
      type: 'value',
      name: '测试用例通过率',
      alignTicks: true,
      position: 'left',
      axisLabel: {
        formatter: '{value} %'
      }
    },
    {
      type: 'value',
      name: '测试用例通过数',
      position: 'right',
    }
  ],
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      data: [
        {
          value: 97.2,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.8, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          }
        },
        {
          value: 100,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.8, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          }
        }
      ],
      type: 'bar',
      yAxisIndex: 0,
      name: '测试用例通过率',
      tooltip: {
        valueFormatter: (value) => value + ' %'
      }
    },
    {
      data: [
        {
          value: 35,
          itemStyle: {
            color: 'green'
          }
        },
        {
          value: 36,
          itemStyle: {
            color: 'green'
          }
        }
      ],
      type: 'line',
      yAxisIndex: 1,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' }
        ]
      },
      name: '测试用例通过数',
      tooltip: {
        valueFormatter: (value) => value + ' 个'
      }
    }
  ]
}

// 代码版本迭代信息
const iteration = {
  columns: [{
    title: '版本号',
    key: 'version'
  }, {
    title: '测试数据集',
    key: 'dataset'
  }, {
    title: '测试情况',
    key: 'result'
  }, {
    title: '缺陷描述',
    key: 'bug'
  }],
  data: [{
    key: '0',
    version: '0.0.0',
    dataset: '强健壮等价类',
    result: '通过35/36',
    bug: '等腰与等边条件判断逻辑顺序有误'
  }, {
    key: '1',
    version: '0.1.0',
    dataset: '强健壮等价类',
    result: '通过36/36',
    bug: '测试全部通过'
  }]
}
</script>

<style scoped>
</style>