<template>
  <test-panel :context="context" :options="options" :code="code" :versions="versions" :ec-option="ecOption"
    :iteration="iteration">
    <template #header>
      Question 04. 电信收费问题
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      本问题输入变量为本月通话时间、用户本年度未按时缴费次数两个。
      <br />① 首先判断本月通话时长是否符合取值范围，通话时间应该≥0，且不能超过一个月的分钟数，这里为了方便直接使用31*24*60=44640作为最大值；
      <br />② 之后还需要判断用户本年度未按时缴费次数是否符合取值范围，显然次数应该≥0，同时在本月之前本年度最多有11个月缴费，所以未按时缴费次数≤11；
      <br />③ 计算用户本月的通话时长处于哪一个折扣等级；
      <br />④ 计算用户本年度未按时缴费次数是否超出当前折扣等级容许的未按时缴费次数。
      <br />⑤ 通过折后费用加上月租费计算出最终的本月通话费用。
    </template>
  </test-panel>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import TestPanel from '../../components/TestPanel.vue'
import type { ECOption } from '@/interface'

// 上下文
const context = 'telecomSystem'

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
  },
  {
    label: '决策表',
    value: 'decision',
    children: [
      {
        label: '决策表',
        value: 'decision-table',
      }
    ]
  }
]

// 实现代码
const code = `function telecomSystem(callingTime: number, count: number): string {
    if (callingTime < 0 || callingTime > 31 * 24 * 60) {
        return "通话时长数值越界"
    }
    if (count < 0 || count > 11) {
        return "未按时缴费次数越界"
    }

    let maxNum: number[] = [1, 2, 3, 3, 6]
    let level: number = getLevel(callingTime)
    if (count <= maxNum[level - 1]) {
        return String(Math.round((25 + 0.15 * callingTime * (1 - (level + 1) * 0.005)) * 100) / 100)
    } else {
        return String(Math.round((25 + 0.15 * callingTime) * 100) / 100)
    }
}

function getLevel(time: number): number {
    if (time > 0 && time <= 60)
        return 1
    else if (time > 60 && time <= 120)
        return 2
    else if (time > 120 && time <= 180)
        return 3
    else if (time > 180 && time <= 300)
        return 4
    else
        return 5
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
  {
    label: '0.2.0',
    value: '0.2.0'
  },
]

// ECharts 绘图选项
const ecOption: ECOption = {
  xAxis: {
    type: 'category',
    data: ['0.0.0版本', '0.1.0版本', '0.2.0版本']
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
          value: 79.6,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.8, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          }
        },
        {
          value: 93.9,
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
          value: 39,
          itemStyle: {
            color: 'green'
          }
        },
        {
          value: 46,
          itemStyle: {
            color: 'green'
          }
        },
        {
          value: 49,
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
    result: '通过39/49',
    bug: '获取最大允许未按时缴费次数时索引值有误'
  }, {
    key: '1',
    version: '0.1.0',
    dataset: '强健壮等价类',
    result: '通过46/49',
    bug: '最终计算结果没有保留两位小数'
  }, {
    key: '2',
    version: '0.2.0',
    dataset: '强健壮等价类',
    result: '通过49/49',
    bug: '测试全部通过'
  }]
}
</script>

<style scoped>
</style>