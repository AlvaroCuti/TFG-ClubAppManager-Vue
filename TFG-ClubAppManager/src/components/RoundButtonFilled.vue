<script setup>
const emit = defineEmits(['remove']);

defineProps({
  placeholder: {
    type: String,
    required: true
  }
})

function handleRemove() {
  // Emitimos el evento al componente padre
  // para que elimine el filtro
  emit('remove')
}
</script>


<template>
  <button class="boton">
    {{ placeholder }}
    <img
      src="@/assets/Cross.png"
      width="12"
      height="12"
      @click.stop="handleRemove"
      class="icono"
    />
  </button>
</template>

<style scoped>
.boton {
  background-color: #6543E0;
  color: white;
  border: 1px solid #6543E0;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 18px;
  font-size: smaller;
  font-weight: 700;
  cursor: default;
}

.icono {
  cursor: pointer;
}
</style>
