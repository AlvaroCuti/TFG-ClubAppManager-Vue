<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'

const auth = useAuthStore()
const showMenu = ref(false)
const router = useRouter()
const perfilRef = ref(null)

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function logout() {
  auth.logout()
  router.push('/login')
}

function handleClickOutside(event) {
  if (perfilRef.value && !perfilRef.value.contains(event.target)) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>

<template>
   <div class="completo">
        <div class="logo">
            <img alt="logo" class="logo" src="@/assets/LogoFinal.png" width="50" height="50" />
        </div>

        <div class="apartados">
            <nav>
                <li class="apartado apartado1">
                    <router-link class="link" to="/vistaEntrenador/entrenador" active-class="activo">
                        <img alt="logo" class="logo" src="@/assets/IconEquipo.png" width="18" height="18" />
                        Mis Equipos
                    </router-link>
                </li>
            </nav>
        </div>
        
        <div class="perfil" @click="toggleMenu" ref="perfilRef">
            <div class="imagen">
                <img alt="logo" class="logo" src="@/assets/Avatar.png" width="35" height="35" />
            </div>
            <div class="infoPerfil">
                <h4>{{ auth.nombre }}</h4>
                <h5>{{ auth.rol && auth.rol.charAt(0).toUpperCase() + auth.rol.slice(1).toLowerCase() }}</h5>
            </div>

            <transition name="slide">
            <div v-if="showMenu" class="menu-perfil">
                <button @click.stop="logout" class="cerrar-sesion">Cerrar sesión</button>
            </div>
            </transition>
        </div>
   </div> 
</template>
  

<style scoped>

.link{
    color: #000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    padding-right: 16px;
    transition: color 0.4s ease; /* transición para el texto */
}

.apartado{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

nav{
    gap: 16px;
}

.apartado1:hover{
    transition: color 0.4s ease; /* transición para el texto */
    background-color: #6543E0;
    color: #E1E0E7;
    border-radius: 8px;
}

.link:hover{
    color: #E1E0E7;
}

.apartado img {
    transition: filter 0.4s ease; /* transición para el icono */
}

.apartado:hover img {
    filter: brightness(0) invert(1);
}

.link.activo{
    background-color: #6543E0;
    color: #E1E0E7;
    border-radius: 8px;
}

.link.activo img {
    filter: brightness(0) invert(1);
}

.completo{
    background-color: #E1E0E7;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.logo{
    margin-left: 10px;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.apartados{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
}

.apartados > nav{
    display: flex;
    flex-direction: row;
}

.perfil{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.imagen{
    padding-right: 10px;
}

.perfil{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 17px;
}

.infoPerfil > h4{
    color: #000;
    font-size: smaller;
    font-weight: 500;
}

.infoPerfil > h5{
    color: #6543E0;
    font-size: smaller;
    font-weight: 400;
}


.menu-perfil {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1100;
}

.cerrar-sesion {
  background-color: #6543E0;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.cerrar-sesion:hover {
  background-color: #5234b5;
}

/* Animación de transición */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>