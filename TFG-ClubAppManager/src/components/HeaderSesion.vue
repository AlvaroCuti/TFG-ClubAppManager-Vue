<script setup>
defineProps({
  msgPrincipal: {
    type: String,
    required: true,
  },
  msgSecundario: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <h1>{{ msgPrincipal }}</h1>
    <h3>{{ msgSecundario }}</h3>
  </div>
</template>

<style scoped>
h1{
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
    color: #0E0A1C;
}

h3{
    font-weight: 100;
    font-size: 1rem;
    position: relative;
    top: -10px;
    color: #5A5370;
}

h1,h3{
    text-align: center;
}
</style>
