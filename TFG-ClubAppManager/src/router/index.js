import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import Principal from '../views/PrincipalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/app',
      name: 'Principal',
      component: Principal,
    }
  ],
})

export default router
