<template>
  <div class="logo">
    <n-icon
      class="image"
      :size="32"
      color="#5FBC21"
    >
      <LogoCss3 />
    </n-icon>
    <h1
      v-if="showTitle"
      class="title"
    >
      Libre Testing
    </h1>
  </div>
  <n-menu
    :options="menuOptions"
    :default-expanded-keys="defaultExpandedKeys"
  />
</template>

<script setup lang="ts">
import { h, ref, onUpdated, type Component } from 'vue'
import { RouterLink } from 'vue-router'
import { NMenu, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { MenuOutline, EaselSharp, LogoCss3 } from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '课程练习',
    key: 'course-exercise',
    icon: renderIcon(MenuOutline),
    children: [
      {
        label: () => h(RouterLink, {
          to: {
            path: "/triangle-judge"
          }
        }, { default: () => "判断三角形类型" }),
        key: 'triangle-judge'
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/calendar-problem"
          }
        }, { default: () => "万年历问题" }),
        key: 'calendar-problem'
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/computer-selling"
          }
        }, { default: () => "电脑销售系统" }),
        key: 'computer-selling'
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/telecom-system"
          }
        }, { default: () => "电信收费系统" }),
        key: 'telecom-system'
      },
    ]
  },
  {
    label: '期末项目',
    key: 'final-project',
    icon: renderIcon(EaselSharp),
    children: [
      {
        label: () => h(RouterLink, {
          to: {
            path: '/unit-testing'
          }
        }, { default: () => '单元测试' }),
        key: 'unit-testing'
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: '/integration-testing'
          }
        }, { default: () => '集成测试' }),
        key: 'integration-testing'
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: '/system-testing'
          }
        }, { default: () => '系统测试' }),
        key: 'system-testing'
      },
    ]
  }
]

const defaultExpandedKeys = ['course-exercise', 'final-project']

const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true
  }
})
const showTitle = ref(props.showTitle)
onUpdated(() => {
  showTitle.value = props.showTitle
})
</script>

<style scoped>
.logo {
  padding: 0 .5rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  height: 3rem;
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.title {
  font-size: 1.25rem;
  color: rgb(51, 54, 57);
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>