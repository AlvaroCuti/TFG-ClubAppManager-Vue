<script setup>
import NavBarTrainer from '@/components/NavBarTrainer.vue';

</script>

<template>  
    <div>
        <NavBarTrainer class="nav"></NavBarTrainer>
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