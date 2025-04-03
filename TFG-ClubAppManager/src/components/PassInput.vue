<script setup>
defineProps({
  value: {
    type: String,
    required: true,
  },
  placeholder:{
    type: String,
    default: "Contraseña"
  }
})
</script>

<template>
    <div class="container">
      <input :value="value" type="password" :placeholder="placeholder" />
    </div>
</template>
  

<style scoped>
input {
  padding: 8px 16px;
  border-radius: 8px;
  width: 100%;
  background-color: #E1E0E7;
  border: 0;
}

input:focus{
  outline: none;
  border: none; 
}
</style>