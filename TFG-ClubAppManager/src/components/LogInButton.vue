<script setup>
defineProps({
  placeholder:{
    type: String,
    default: "Iniciar Sesión"
  }
})
</script>

<template>
    <div class="container">
        <button>{{placeholder}}</button>
    </div>
</template>
  

<style scoped>
/* Estilo básico para el input */
.container{
    display: flex;
    justify-content: center;
}

button {
  padding: 8px 16px;
  border-radius: 8px;
  width: 100%;
  background-color: #6543E0;
  color:#F6F5F8;

}
</style>