<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import UnitPanelVue from '../../components/unitTesting/UnitPanel.vue'
import UnitHomeVue from '../../components/unitTesting/UnitHome.vue'
const tabs = [
  {
    name: 'home',
    tab: '单元测试'
  },
  {
    name: 'login',
    tab: '登录模块',
    testCase: '使用强健壮等价类设计测试用例。'
  },
  {
    name: 'collect',
    tab: '收藏模块',
    testCase: '使用强一般等价类设计测试用例。'
  },
  {
    name: 'deal-report',
    tab: '受理举报模块',
    testCase: '使用强一般等价类设计测试用例。'
  },
  {
    name: 'confirm',
    tab: '确认订单模块',
    testCase: '使用强一般等价类设计测试用例。'
  }
]
</script>

<template>
  <div class="root-wrapper">
    <div class="left-part">
      <n-tabs
        type="line"
        animated
        default-value="home">
        <n-tab-pane
          v-for="item in tabs"
          :name="item.name"
          :tab="item.tab">
          <unit-home-vue v-if="item.name === 'home'"/>
          <unit-panel-vue :context="item.name" v-else>
            <template #title>
              {{item.tab}}
            </template>
            <template #test-case>
              {{item.testCase}}
            </template>
          </unit-panel-vue>
        </n-tab-pane>       
      </n-tabs>
    </div>
    <div class="right-part">
      <iframe
        src="https://stackblitz.com/edit/vitest-dev-vitest-tz744h?embed=1&file=README.md&view=preview"/>
    </div>
  </div>
</template>

<style scoped>
.root-wrapper {
  display: flex;
  gap: .5em;
  font-size: 1rem;
}
.left-part {
  width: 36em;
}
.right-part {
  width: 48em;
}
iframe {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
}
</style>