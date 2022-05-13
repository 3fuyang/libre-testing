<template>
  <test-panel 
    :context="context"
    :options="options"
    :code="code">
    <template #header>
      Question 02. 万年历问题
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      本问题输入变量为年份、月份、日期三个，首先需要对输入的日期进行合法性判断，确定输入日期符合规范后再进行计算下一天的日期。
      <br/>① 首先判断年份是否符合取值范围（1900≤year≤2100）；
      <br/>② 再判断月份是否符合取值范围（1≤month≤12）；
      <br/>③ 计算该年份下该月的天数maxDays，然后判断输入日期是否符合取值范围（1≤day≤maxDays）；
      <br/>④ 计算下一天的日期，尤其是当出现跨月份、跨年时需要给出正确的日期。      
    </template>
  </test-panel>
</template>

<script setup lang="ts">
import TestPanel from '../../components/TestPanel.vue'

const context = 'calendarProblem'

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

const code = `function calendarProblem(year: number, month: number, day: number): string {
    if (year < 1900 || year > 2100) {
        return "年份数值越界"
    }
    if (month <= 0 || month > 12) {
        return "月份数值越界"
    }
    let maxDays = getMonthDays(year, month)
    if (day <= 0 || day > maxDays) {
        return "日期数值越界"
    }

    let tomorrowDate = new Date(year, month - 1, day + 1);
    return tomorrowDate.getFullYear() + "/" + (tomorrowDate.getMonth()+ 1) + "/" + tomorrowDate.getDate()
}

function getMonthDays(year: number, month: number): number {
    let thisDate = new Date(year, month, 0); //当天数为0时，js会自动处理为上一月的最后一天
    return thisDate.getDate();
}`
</script>

<style scoped>

</style>