<script setup>
defineProps({
  placeholder: {
    type: String,
    default: "Iniciar Sesión"
  },
  to: {
    type: String,
    default: null
  }
})

const emit = defineEmits(["click"])
</script>

<template>
  <div class="container">
    <RouterLink v-if="to" :to="to">
      <button @click="emit('click')">{{ placeholder }}</button>
    </RouterLink>
    <button v-else @click="emit('click')">{{ placeholder }}</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

button {
  padding: 8px 16px;
  border-radius: 8px;
  width: 100%;
  background-color: #6543E0;
  color: #F6F5F8;
  border: 0;
  transition: transform 0.2s ease;
}

button:hover {
  background-color: #593bc8;
  transform: scale(1.02);
}
</style>
