<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder:{
    type: String,
    default: "Teléfono"
  }
})

const emit = defineEmits(["update:modelValue"]);

</script>

<template>
    <div class="container">
      <input :value="modelValue" type="text" :placeholder="placeholder" @input="event => emit('update:modelValue', event.target.value)"/>
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