<script lang="ts" setup>
import { NCard, NText, NA, NBlockquote, NH2 } from 'naive-ui'
import IconVitestVue from '../icons/IconVitest.vue'

</script>

<template>
  <n-card class="unit-home-wrapper">
    <n-h2>集成测试</n-h2>
    <n-blockquote>
      在 Vue 应用中，主要用组件来构建<strong>用户界面</strong>。因此，当验证应用的行为时，组件是一个很自然的独立单元。
    </n-blockquote>
    <n-text tag="div">
      从粒度的角度来看，<strong>组件测试</strong>位于单元测试之上，可以被认为是集成测试的一种形式。组件测试应该捕捉组件中的 prop、事件、提供的插槽、样式、CSS class 名、生命周期钩子，和其他相关的问题。
    </n-text>
    <br />
    <n-text tag="div">
      组件测试主要需要关心组件的公开接口而不是内部实现细节。对于大部分的组件来说，公开接口包括触发的事件、prop 和插槽。
    </n-text>
    <n-h2>测试工具</n-h2>
    <n-text tag="div">
      本项目使用组件测试框架
      <n-a href="https://vitest.dev/" target="_blank">
        <icon-vitest-vue class="vitest-logo" />Vitest
      </n-a>
      作为测试工具，它对组件和组合式函数都采用无头渲染的方式，其执行上下文是 Node，比浏览器要快几个数量级。
    </n-text>
    <n-h2>测试库</n-h2>
    <n-text tag="div">
      组件测试通常涉及到单独挂载被测试的组件，触发模拟的用户输入事件，并对渲染的 DOM 输出进行断言。本项目使用官方底层组件测试库
      <n-a href="https://test-utils.vuejs.org/" target="_blank">@vue/test-utils</n-a>
      ，用来提供给用户访问 Vue 特有的 API。
    </n-text>
  </n-card>
</template>

<style scoped>
.unit-home-wrapper {
  height: 41.5em;
  box-sizing: border-box;
}

.vitest-logo {
  width: 1.4em;
  height: 1.4em;
}
</style>