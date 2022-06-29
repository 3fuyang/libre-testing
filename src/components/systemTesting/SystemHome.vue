<script lang="ts" setup>
import { NCard, NText, NA, NBlockquote, NH2, NImage, NUl, NLi } from 'naive-ui'

</script>

<template>
  <n-card class="unit-home-wrapper">
    <n-h2>系统测试</n-h2>
    <n-blockquote>
      在 Vue 环境下的单元与组件测试，都是在<strong>开发模式</strong>下进行的，在部署到生产时，对应用整体覆盖的能力有限。
    </n-blockquote>
    <n-text tag="div">
      <strong>端到端（E2E）测试</strong> 旨在对系统进行整体测试，对 Web 应用进行贯穿前、后端的测试，。因此，端到端测试针对的可以说是应用最重要的方面：当用户实际使用你的应用时发生了什么。
    </n-text>
    <br />
    <n-text tag="div">
      端到端测试通常会捕捉到路由、状态管理库、顶级组件（常见为 App 或 Layout）、公共资源或任何请求处理方面的问题。如上所述，它们可以捕捉到单元测试或组件测试无法捕捉的关键问题。
    </n-text>
    <n-h2>测试工具</n-h2>
    <n-text tag="div">
      本项目使用端到端测试框架
      <n-a href="https://www.cypress.io/" target="_blank">
        <n-image src="/cypress-logo.png" class="cypress-logo" />
      </n-a>作为测试工具，
      它提供了最完整的端到端解决方案，其具有信息丰富的图形界面、出色的调试性、内置断言和存根、抗剥落性、并行化和快照等诸多特性。
      并且运行在真实的<strong>浏览器环境</strong>中。
    </n-text>
    <br />
    <n-text tag="div">
      同时作为现代测试框架，Cypress 还具备以下特点：
      <n-ul>
        <n-li>基于测试快照的时间旅行功能</n-li>
        <n-li>实时热更新，开箱即用的观察模式</n-li>
        <n-li>集成高度自动化的截屏与录屏功能 ……</n-li>
      </n-ul>
    </n-text>
  </n-card>
</template>

<style scoped>
.unit-home-wrapper {
  height: 41.5em;
  box-sizing: border-box;
}

.cypress-logo {
  height: 1.2em;
}
</style>