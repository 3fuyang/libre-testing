<template>
  <test-panel :context="context" :options="options" :code="code" :versions="versions" :ec-option="ecOption"
    :iteration="iteration">
    <template #header>
      Question 03. 电脑销售问题
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      最开始需要判断的是主机的销售数量，当这个变量值为-1时是对系统发出进行月度统计的指令，当值不为-1时才继续进行如下计算：
      <br />① 因为每月至少销售出一台整机，首先判断各配件的销售数量是否大于1；
      <br />② 分别判断各配件是否销售数量超过各自的最大数量；
      <br />③ 若①②条件均成立，可进行销售额计算；
      <br />④ 判断月度销售额在哪个佣金分段，在不同分段获得不同的佣金比例，计算出最终获得的佣金金额。
    </template>
  </test-panel>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import TestPanel from '../../components/TestPanel.vue'
import type { ECOption } from '@/interface'

// 上下文
const context = 'computerSelling'

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
      }
    ]
  }
]

// 实现代码
const code = `function computerSelling(host: number, monitor: number, peripheral: number): string {
    if (host == -1) {
        return "系统开始统计月度销售额"
    }
    if (host <= 0 || monitor <= 0 || peripheral <= 0) {
        return "数据非法，各部件销售数量不能小于1"
    }
    if (host > 70) {
        return "数据非法，主机销售数量不能超过70"
    }
    if (monitor > 80) {
        return "数据非法，显示器销售数量不能超过80"
    }
    if (peripheral > 90) {
        return "数据非法，外设销售数量不能超过90"
    }

    let totalSales: number = host * 25 + monitor * 30 + peripheral * 45;
    if (totalSales <= 1000) {
        return String(totalSales * 0.1)
    } else if (totalSales <= 1800) {
        return String(totalSales * 0.15)
    } else {
        return String(totalSales * 0.2)
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
          value: 95,
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
          value: 19,
          itemStyle: {
            color: 'green'
          }
        },
        {
          value: 20,
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
    dataset: '健壮边界值',
    result: '通过19/20',
    bug: '没有考虑主机销售数量为-1时进行统计月度销售额的特殊情况'
  }, {
    key: '1',
    version: '0.1.0',
    dataset: '健壮边界值',
    result: '通过20/20',
    bug: '测试全部通过'
  }]
}
</script>

<style scoped>
</style>