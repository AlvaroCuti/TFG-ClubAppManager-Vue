<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder:{
    type: String,
    default: "Contraseña"
  }
})

const emit = defineEmits(["update:modelValue"]);

</script>

<template>
    <div class="container">
      <input :value="modelValue" type="password" :placeholder="placeholder" @input="event => emit('update:modelValue', event.target.value)"/>
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