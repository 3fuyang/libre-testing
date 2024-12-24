<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NBreadcrumb, NBreadcrumbItem, NIcon, NDropdown, NA } from 'naive-ui'
import { LogoGithub, ChevronBackSharp, ChevronForwardSharp } from '@vicons/ionicons5'
import type { Crumb } from '../interface'

const router = useRouter()

const exerciseCrumb: Crumb = {
  label: '课程练习',
  path: '#'
}, projectCrumb: Crumb = {
  label: '期末项目',
  path: '#'
}
// 生成面包屑
const crumbs = computed<Crumb[]>(() => {
  const result = [{
    label: '主页',
    path: '/'
  }]
  // 获取标准化的路由地址，得到匹配的路由记录数组
  let params = router.resolve(router.currentRoute.value).matched
  for (let param of params) {
    if (param.path === '/triangle-judge') {
      Array.prototype.push.apply(result, [exerciseCrumb, {
        label: '判断三角形类型',
        path: param.path
      }])
      continue
    } else if (param.path === '/calendar-problem') {
      Array.prototype.push.apply(result, [exerciseCrumb, {
        label: '万年历问题',
        path: param.path
      }])
      continue
    } else if (param.path === '/computer-selling') {
      Array.prototype.push.apply(result, [exerciseCrumb, {
        label: '电脑销售系统',
        path: param.path
      }])
      continue
    } else if (param.path === '/telecom-system') {
      Array.prototype.push.apply(result, [exerciseCrumb, {
        label: '电信收费系统',
        path: param.path
      }])
      continue
    } else if (param.path === '/unit-testing') {
      Array.prototype.push.apply(result, [projectCrumb, {
        label: '单元测试',
        path: param.path
      }])
      continue
    } else if (param.path === '/integration-testing') {
      Array.prototype.push.apply(result, [projectCrumb, {
        label: '集成测试',
        path: param.path
      }])
      continue
    } else if (param.path === '/system-testing') {
      Array.prototype.push.apply(result, [projectCrumb, {
        label: '系统测试',
        path: param.path
      }])
      continue
    }
  }
  return result
})

const options1 = [
  {
    label: '判断三角形类型',
    path: '/triangle-judge'
  },
  {
    label: '万年历问题',
    path: '/calendar-problem'
  },
  {
    label: '电脑销售系统',
    path: '/computer-selling'
  },
  {
    label: '电信收费系统',
    path: '/telecom-system'
  }
], options2 = [
  {
    label: '单元测试',
    path: '/unit-testing'
  },
  {
    label: '集成测试',
    path: '/integration-testing'
  },
  {
    label: '系统测试',
    path: '/system-testing'
  }
]

// 下拉框选择条目，跳转到对应页面
function handleSelect(path: string): void {
  router.push(path)
}

// 折叠边导航
const emits = defineEmits(['collapse-sider', 'expand-sider'])
const collapsed = ref(false)
function handleCollapse() {
  collapsed.value = !collapsed.value
  if (collapsed.value) {
    emits('collapse-sider')
  } else {
    emits('expand-sider')
  }
}
</script>

<template>
  <div class="flex-wrapper">
    <n-icon
      size="18"
      class="arrow"
      :component="collapsed ? ChevronForwardSharp : ChevronBackSharp"
      @click="handleCollapse"
    />
    <n-breadcrumb class="crumb">
      <n-breadcrumb-item
        v-for="{ path, label } in crumbs"
        :key="path"
        :href="path"
      >
        <n-dropdown
          v-if="path === '#'"
          key-field="path"
          :options="label === '课程练习' ? options1 : options2"
          @select="handleSelect"
        >
          {{ label }}
        </n-dropdown>
        <span v-else>
          {{ label }}
        </span>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <a
      class="icon-link"
      href="https://github.com/3fuyang/software-testing"
      target="_blank"
    >
      <n-icon
        class="icon"
        size="1.6em"
        :component="LogoGithub"
      />
    </a>
    <n-a
      href="https://v2.libretesting.xyz"
      target="_blank"
      class="v2-link"
    >
      V2
    </n-a>
  </div>
</template>

<style scoped>
.flex-wrapper {
  display: flex;
  align-items: center;
  padding-right: 1rem;
}

.arrow {
  cursor: pointer;
  padding-right: .6em;
}

.crumb {
  flex: 1 1 auto;
}

.icon-link {
  color: initial;
}

.icon {
  cursor: pointer;
}

.v2-link {
  padding-left: .75rem;
}
</style>
