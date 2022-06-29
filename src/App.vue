<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NLayout, NLayoutContent, NLayoutSider, NLayoutHeader, NConfigProvider, NMessageProvider } from 'naive-ui'
import SideNav from './components/SideNav.vue'
import TopNav from './components/TopNav.vue'
import { ref } from 'vue'
const collapsed = ref<boolean>(false)
</script>

<template>
  <n-message-provider>
    <n-layout has-sider class="body">
      <n-config-provider>
        <n-layout-sider class="side-bar" width="13vw" :native-scrollbar="false" bordered collapse-mode="width"
          :collapsed-width="48" :collapsed="collapsed">
          <SideNav :showTitle="!collapsed" />
        </n-layout-sider>
      </n-config-provider>
      <n-layout bordered class="embedded-body">
        <n-layout-header bordered class="top-bar">
          <TopNav @collapse-sider="collapsed = true" @expand-sider="collapsed = false" />
        </n-layout-header>
        <n-layout-content embedded class="main-content" :native-scrollbar="false" bordered>
          <router-view v-slot="{ Component }">
            <!--learn more about <router-view>'s slot API-->
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-message-provider>
</template>

<style>
.body {
  height: 100vh;
  width: 100vw;
}

.side-bar {
  height: 100vh;
}

.embedded-body {
  height: 100vh;
}

.top-bar {
  height: 8vh;
  padding: .6em;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-content {
  height: 92vh;
  padding: .6em;
}
</style>
