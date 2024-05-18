import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/StockDetail.vue')
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('../views/RecordView.vue')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/MeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
