<script setup>
defineProps({
  value: {
    type: String,
    required: true,
  },
  placeholder:{
    type: String,
    default: "Teléfono"
  }
})
</script>

<template>
    <div class="container">
      <input :value="value" type="text" :placeholder="placeholder"/>
    </div>
</template>
  

<style scoped>
/* Estilo básico para el input */
input {
  padding: 8px 16px;
  border-radius: 8px;
  width: 100%;
  background-color: #E1E0E7;
  border: 0;

}

input:focus{
  outline: none;
  border: none; /* Opcional, si también quieres quitar el borde */
}
</style>