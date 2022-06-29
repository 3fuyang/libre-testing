<script lang="ts" setup>
import { NCard, NText, NA, NBlockquote, NH2, NUl, NLi } from 'naive-ui'
import IconVitestVue from '../icons/IconVitest.vue'

</script>

<template>
  <n-card class="unit-home-wrapper">
    <n-h2>单元测试</n-h2>
    <n-blockquote>
      单元测试（Unit Testing），是指对软件中的最小可测试单元进行检查和验证。
    </n-blockquote>
    <n-text tag="div">
      单元测试通常适用于独立的业务逻辑、组件、类、模块或函数，不涉及 UI 渲染、网络请求或其他环境问题。
    </n-text>
    <br />
    <n-text tag="div">
      这些通常是与 Vue 无关的纯 JavaScript/TypeScript 模块。一般来说，在 Vue 应用中为业务逻辑编写单元测试与使用其他框架的应用没有明显区别。
    </n-text>
    <n-h2>测试工具</n-h2>
    <n-text tag="div">
      本项目使用单元测试框架
      <n-a href="https://vitest.dev/" target="_blank">
        <icon-vitest-vue class="vitest-logo" />Vitest
      </n-a>
      作为测试工具，因为由 create-vue 创建的官方项目配置是基于 Vite 的，而 Vitest 可以利用同一套 Vite 配置和转换管道。
    </n-text>
    <br />
    <n-text tag="div">
      同时作为新一代测试框架，Vitest 还具备以下特点：
      <n-ul>
        <n-li>智能、快速的监察模式，支持测试运行时的热模块更新</n-li>
        <n-li>开箱即用的 TypeScript / JSX 支持</n-li>
        <n-li>首选 ESM 模块系统，支持顶级 await</n-li>
        <n-li>套件与测试的筛选、延时和并发</n-li>
        <n-li>内置 Tinyspy 提供 mocking</n-li>
        <n-li>支持类似 Rust 的源码行内测试 ……</n-li>
      </n-ul>
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