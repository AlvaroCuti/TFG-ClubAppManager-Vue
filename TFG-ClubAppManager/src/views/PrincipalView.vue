<script setup>
import NavBar from '../components/NavBar.vue';

</script>

<template>  
    <div class="nav">
        <NavBar ></NavBar>
    </div>
    <RouterView></RouterView>
</template>

<style scoped>
.nav{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
}
</style>