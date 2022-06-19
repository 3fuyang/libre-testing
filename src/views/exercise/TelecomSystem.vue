<template>
  <test-panel 
    :context="context"
    :options="options"
    :code="code"
    :versions="versions"
    >
    <template #header>
      Question 04. 电信收费问题
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      本问题输入变量为本月通话时间、用户本年度未按时缴费次数两个。
      <br/>① 首先判断本月通话时长是否符合取值范围，通话时间应该≥0，且不能超过一个月的分钟数，这里为了方便直接使用31*24*60=44640作为最大值；
      <br/>② 之后还需要判断用户本年度未按时缴费次数是否符合取值范围，显然次数应该≥0，同时在本月之前本年度最多有11个月缴费，所以未按时缴费次数≤11；
      <br/>③ 计算用户本月的通话时长处于哪一个折扣等级；
      <br/>④ 计算用户本年度未按时缴费次数是否超出当前折扣等级容许的未按时缴费次数。   
      <br/>⑤ 通过折后费用加上月租费计算出最终的本月通话费用。    
    </template>
  </test-panel>
</template>

<script setup lang="ts">
import TestPanel from '../../components/TestPanel.vue'

const context = 'telecomSystem'

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
  }
]

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
</script>

<style scoped>

</style>