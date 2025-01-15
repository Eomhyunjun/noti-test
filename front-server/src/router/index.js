import { createRouter, createWebHistory } from 'vue-router'
import StaticNoti from '@/views/StaticNoti.vue'
import WebsoketView from '@/views/WebsoketView.vue'
import SSEView from '@/views/SSEView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'static',
      component: StaticNoti,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: WebsoketView,
    },
    {
      path: '/sse',
      name: 'sse',
      component: SSEView,
    }
  ],
})

export default router
