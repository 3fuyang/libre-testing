<template>
  <test-panel 
    :context="context"
    :composable="composable"
    :options="options"
    :code="code"
    :get-args="getArgs">
    <template #header>
      Question 02. 万年历问题
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      罗老师，别这样
    </template>
  </test-panel>
</template>

<script setup>
import TestPanel from '../../components/TestPanel.vue'
import { judgeTriangle } from '../../composables/triangleJudgeTest'

const context = 'triangleJudge'

const composable = judgeTriangle

const getArgs = function(row){
  let args = [parseInt(row.Edge1), parseInt(row.Edge2), parseInt(row.Edge3)]
  return args
}

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
        value: 'weak-robust-equivalent',        
      },
      {
        label: '强健壮等价类',
        value: 'strong-robust-equivalent',        
      },                  
    ]    
  }
]

const code = `// 看到了吗
// 这
// 就是我的代码！`
</script>

<style scoped>

</style>