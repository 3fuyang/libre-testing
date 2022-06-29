<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import IntegrationHomeVue from '../../components/integrationTesting/IntegrationHome.vue'
import sdk from '@stackblitz/sdk'
import { onMounted } from 'vue'

const tabs = [
  {
    name: 'home',
    tab: '集成测试'
  }
]

onMounted(() => {
  // 嵌入stackblitz项目
  const stackblitz = document.getElementById('stackblitz')

  sdk.embedProjectId(
    stackblitz as HTMLElement,
    'vitest-dev-vitest-1vejnm',
    {
      forceEmbedLayout: true,
      openFile: 'README.md',
      view: 'preview',
      height: '99.5%',
      width: '100%',
      theme: 'light',
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
          <integration-home-vue v-if="item.name === 'home'" />
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