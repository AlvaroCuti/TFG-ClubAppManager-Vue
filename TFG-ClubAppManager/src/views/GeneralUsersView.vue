<script setup>
import NavBarGeneral from '../components/NavBarGeneral.vue';

</script>

<template>  
    <div>
        <NavBarGeneral class="nav"></NavBarGeneral>
        <div class="contenido">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
.nav{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 1000;
}

.contenido {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 55px;
  background-color: #f6f6f8;
  overflow: auto; /* Asegura scroll si hace falta */
  z-index: 1; /* Menor al de la navbar */
}

</style>