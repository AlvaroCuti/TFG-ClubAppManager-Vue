import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import Principal from '../views/PrincipalView.vue'
import Jugadores from '../views/JugadoresView.vue'
import Entrenadores from '../views/EntrenadoresView.vue'
import Equipos from '../views/EquiposView.vue'
import General from '../views/GeneralUsersView.vue'
import EntrenamientosJugador from '../views/EntrenamientosJugadorView.vue'
import EntrenamientosEntrenador from '../views/EntrenamientosEntrenadorView.vue'
import Trainer from '../views/TrainerView.vue'
import EquipoInfoView from '../views/EquipoInfoView.vue'
import CambiarPass from '../views/CambiarPassView.vue'

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
      path: '/cambiarPass',
      name: 'cambiarPass',
      component: CambiarPass,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/app',
      component: Principal,
      children: [
        {
          path: 'jugadores',
          name: 'Jugadores',
          component: Jugadores,
        },
        {
          path: 'equipos',
          name: 'Equipos',
          component: Equipos, // lazy load
        },
        {
          path: 'equipos/:nombre',
          name: 'EquipoInfoView',
          component: EquipoInfoView,
          props: true,
        },
        {
          path: 'entrenadores',
          name: 'Entrenadores',
          component: Entrenadores,
        },
        
      ],
    },
    {
      path: '/vistaJugador',
      component: General,
      children: [
        {
          path: 'jugador',
          name: 'Jugador',
          component: EntrenamientosJugador,
        },
      ],
    },
    {
      path: '/vistaEntrenador',
      component: Trainer,
      children: [
        {
          path: 'entrenador',
          name: 'Entrenador',
          component: EntrenamientosEntrenador,
        },
      ],
    },
  ],
})

export default router
