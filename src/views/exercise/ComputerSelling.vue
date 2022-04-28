<template>
  <test-panel 
    :context="context"
    :options="options"
    :code="code">
    <template #header>
      Question 03. 电脑销售问题
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      最开始需要判断的是主机的销售数量，当这个变量值为-1时是对系统发出进行月度统计的指令，当值不为-1时才继续进行如下计算：
      <br/>① 因为每月至少销售出一台整机，首先判断各配件的销售数量是否大于1；
      <br/>② 分别判断各配件是否销售数量超过各自的最大数量；
      <br/>③ 若①②条件均成立，可进行销售额计算；
      <br/>④ 判断月度销售额在哪个佣金分段，在不同分段获得不同的佣金比例，计算出最终获得的佣金金额。      
    </template>
  </test-panel>
</template>

<script setup lang="ts">
import TestPanel from '../../components/TestPanel.vue'

const context = 'computerSelling'

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

const code = `function computerSelling(host, monitor, peripheral) {
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

    let totalSales = host * 25 + monitor * 30 + peripheral * 45;
    if (totalSales <= 1000) {
        return totalSales * 0.1
    } else if (totalSales <= 1800) {
        return totalSales * 0.15
    } else {
        return totalSales * 0.2
    }
}`
</script>

<style scoped>

</style>