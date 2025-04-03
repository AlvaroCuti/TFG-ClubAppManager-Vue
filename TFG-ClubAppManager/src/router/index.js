import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import Register from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
  ],
})

export default router
