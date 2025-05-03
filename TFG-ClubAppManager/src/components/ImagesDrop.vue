<script setup>
    import { ref } from 'vue';

    const fileInput = ref(null);
    const emit = defineEmits(['update:files']);
    const archivosSeleccionados = ref([]);

    const props = defineProps({
        placeholder: {
            type: String,
            required: true
        },
    })

    const abrirSelector = () => {
        fileInput.value?.click();
    };

    const handleArchivo = (event) => {
        const nuevosArchivos = Array.from(event.target.files);
        archivosSeleccionados.value.push(...nuevosArchivos);
        emit('update:files', archivosSeleccionados.value);
        event.target.value = '';
    };
</script>

<template>
    <div class="container" @click="abrirSelector">
        <img alt="logo" class="logo" src="@/assets/cloud.png" width="25" height="25" />
        <h4>{{ props.placeholder }}</h4>
    </div>

    <input type="file" ref="fileInput" style="display: none" accept="image/*, application/pdf" multiple @change="handleArchivo" />

</template>
  

<style scoped>

.container{
  background-color: #E1E0E7;
  width: 250px;
  border-style: dashed;
  border-color: #A9A5B8;
  border-radius: 16px;
  border-width: 1px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 16px;
}

img{
    color: #3E3854;
}

h4 {
    color: #3E3854;
    white-space: pre-line; /* Permite que '\n' se convierta en salto de línea */
    text-align: center;
}


</style>