<script setup>
import { RouterView } from 'vue-router'

</script>

<template>  
 <div id="app">
    <Navbar />
    <router-view></router-view>  <!-- Aquí se renderizan las vistas -->
  </div>
</template>
