<template>
  <test-panel 
    :context="context"
    :options="options"
    :code="code">
    <template #header>
      Question 04. 电信收费问题
    </template>
    <template #sub-title>
      
    </template>
    <template #detail>
      罗老师，别这样
    </template>
  </test-panel>
</template>

<script setup>
import TestPanel from '../../components/TestPanel.vue'

const context = 'telecomSystem'

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

const code = `// 看到了吗
// 这
// 就是我的代码！`
</script>

<style scoped>

</style>