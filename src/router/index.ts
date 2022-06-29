import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/triangle-judge',
      name: 'triangle-judge',
      component: () => import('../views/exercise/TriangleJudge.vue')
    },
    {
      path: '/calendar-problem',
      name: 'calendar-problem',
      component: () => import('../views/exercise/CalendarProblem.vue')
    },
    {
      path: '/computer-selling',
      name: 'computer-selling',
      component: () => import('../views/exercise/ComputerSelling.vue')
    },
    {
      path: '/telecom-system',
      name: 'telecom-system',
      component: () => import('../views/exercise/TelecomSystem.vue')
    },
    {
      path: '/unit-testing',
      name: 'unit-testing',
      component: () => import('../views/project/UnitTesting.vue')
    },
    {
      path: '/integration-testing',
      name: 'integration-testing',
      component: () => import('../views/project/IntegrationTesting.vue')
    },
    {
      path: '/system-testing',
      name: 'system-testing',
      component: () => import('../views/project/SystemTesting.vue')
    },
  ]
})

export default router
