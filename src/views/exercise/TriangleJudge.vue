<template>
  <test-panel 
    :context="context"
    :options="options"
    :code="code"
    :versions="versions"
    :ec-option="ecOption"
    >
    <template #header>
      Question 01. 判断三角形类型
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      本题输入变量有a, b, c三个，首先判断其两边之和是否大于第三边，若大于则判断可以构成三角形，再进一步判断该三角形是什么三角形；否则不能构成三角形。
      <br/>① 从键盘输入三角形的三条边；
      <br/>② 判断两边之和是否大于第三边，若条件成立则判断可构成三角形，否则判断其不能构成三角形；
      <br/>③ 继续判断三角形类型；
      <br/>④ 首先判断其是否三边相等，条件成立则判断其为等边三角形；否则判断其是否有两边相等，条件成立则判断其为等腰三角形；否则判断其为普通三角形。      
    </template>
  </test-panel>  
</template>

<script setup lang="ts">
import { ECOption } from '@/interface';
import TestPanel from '../../components/TestPanel.vue'

const context = 'triangleJudge'

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
  tooltip: {
    triggerOn: 'mousemove',
    trigger: 'item'
  },  
  xAxis: {
    data: ['25 Apr', '26 Apr', '27 Apr', '28 Apr', '29 Apr', '30 Apr', '1 May']
  },
  yAxis: {},
  series: [
    {
      data: [1, 3, 4, 5, 7, 8, 9],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#43B5F4',
        width: 2,
      },
      itemStyle: {
        color: '#43B5F4',
      },
      tooltip: {
        valueFormatter: (value: number) => `${value} Events`
      }
    }
  ],
  grid: {
    top: 20,
    bottom: 20
  }  
}

// 可选用例集
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

// 程序代码
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
</script>

<style scoped>

</style>