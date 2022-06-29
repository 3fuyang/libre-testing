<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import UnitPanelVue from '../../components/unitTesting/UnitPanel.vue'
import UnitHomeVue from '../../components/unitTesting/UnitHome.vue'
import sdk from '@stackblitz/sdk'
import { onMounted } from 'vue'

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

onMounted(() => {
  // 嵌入stackblitz项目
  const stackblitz = document.getElementById('stackblitz')

  sdk.embedProjectId(
    stackblitz as HTMLElement,
    'vitest-dev-vitest-tz744h',
    {
      forceEmbedLayout: true,
      openFile: 'README.md',
      view: 'preview',
      height: '99.5%',
      width: '100%',
      //initialPath: '/__vitest__',
    }
  )
    .then(() => {
      const iframe = document.getElementById('stackblitz')
      iframe?.setAttribute('style', 'border: none;border: 1px solid #eee;')
    })
})
</script>

<template>
  <div class="root-wrapper">
    <div class="left-part">
      <n-tabs type="line" animated default-value="home">
        <n-tab-pane v-for="item in tabs" :name="item.name" :tab="item.tab">
          <unit-home-vue v-if="item.name === 'home'" />
          <unit-panel-vue :context="item.name" v-else>
            <template #title>
              {{ item.tab }}
            </template>
            <template #test-case>
              {{ item.testCase }}
            </template>
          </unit-panel-vue>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="right-part">
      <div id="stackblitz" />
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
  box-sizing: border-box;
  width: 45.6em;
}
</style>