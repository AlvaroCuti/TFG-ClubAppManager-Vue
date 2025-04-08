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
}

.contenido {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    margin-top: 60px; /* Ajusta a la altura de tu navbar */
    background-color: #f6f6f8;
}


</style>