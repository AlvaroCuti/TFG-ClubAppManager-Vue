<script setup>
defineProps({
  placeholder:{
    type: String,
    default: "Iniciar Sesión"
  },
  to: {
    type: String,
    required: true
  }
})
const emit = defineEmits(["click"]);

</script>

<template>
    <RouterLink :to="to" class="container">
        <button @click="emit('click')">{{placeholder}}</button>
    </RouterLink>
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
  border: 0;
}

button:hover{
  background-color: #593bc8; /* Verde más oscuro */
  transform: scale(1.02); /* Hace el botón un poco más grande */
}

</style>