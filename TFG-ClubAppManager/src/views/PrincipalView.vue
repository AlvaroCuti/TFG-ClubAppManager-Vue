<script setup>
import NavBar from '../components/NavBar.vue';

</script>

<template>  
    <div>
        <NavBar class="nav"></NavBar>
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
  overflow: auto;
  z-index: 1;
}



</style>