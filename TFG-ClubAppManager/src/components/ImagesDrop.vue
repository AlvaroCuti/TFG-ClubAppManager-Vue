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
  maxFiles: {
    type: Number,
    required: true
  }
});

const abrirSelector = () => {
  fileInput.value?.click();
};

const handleArchivo = (event) => {
  const nuevosArchivos = Array.from(event.target.files).filter(f => f instanceof File);

  const espacioDisponible = props.maxFiles - archivosSeleccionados.value.length;

  if (espacioDisponible <= 0) {
    alert(`Solo se permiten hasta ${props.maxFiles} archivos.`);
    event.target.value = '';
    return;
  }

  const archivosPermitidos = nuevosArchivos.slice(0, espacioDisponible);
  archivosSeleccionados.value = [...archivosSeleccionados.value, ...archivosPermitidos];
  emit('update:files', archivosSeleccionados.value);
  event.target.value = '';
};

const eliminarArchivo = (index) => {
  archivosSeleccionados.value.splice(index, 1);
  emit('update:files', archivosSeleccionados.value);
};
</script>

<template>
  <div class="container" @click="abrirSelector">
    <img alt="logo" class="logo" src="@/assets/cloud.png" width="25" height="25" />
    <h4>{{ props.placeholder }}</h4>
  </div>

  <input
    type="file"
    ref="fileInput"
    style="display: none"
    accept="image/*, application/pdf"
    multiple
    @change="handleArchivo"
  />

  <div class="preview-container" v-if="archivosSeleccionados.length > 0">
    <div class="preview" v-for="(archivo, index) in archivosSeleccionados" :key="index">
      <div v-if="archivo.type && archivo.type.startsWith('image/')">
        <img :src="getObjectURL(archivo)" class="thumb" />
      </div>
      <div v-else class="file-icon">
        {{ archivo.name }}
      </div>
      <button class="delete-btn" @click.stop.prevent="eliminarArchivo(index)">X</button>
    </div>
  </div>
</template>

<script>
function getObjectURL(file) {
  try {
    return URL.createObjectURL(file);
  } catch (e) {
    console.error('Error creando URL del archivo:', e);
    return '';
  }
}
</script>

<style scoped>
.container {
  background-color: #E1E0E7;
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
  cursor: pointer;
}

img.logo {
  color: #3E3854;
}

h4 {
  color: #3E3854;
  white-space: pre-line;
  text-align: center;
}

.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 12px;
}

.preview {
  position: relative;
  width: 80px;
  text-align: center;
}

.thumb {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.file-icon {
  background-color: #F3F2F7;
  border-radius: 8px;
  padding: 8px;
  font-size: 12px;
  word-break: break-all;
  color: black;
}

.delete-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #6543E0;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 10px;
  width: 18px;
  height: 18px;
}
</style>
