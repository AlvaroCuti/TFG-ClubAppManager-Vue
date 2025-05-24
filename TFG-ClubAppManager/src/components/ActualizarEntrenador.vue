<script setup>
import { ref } from 'vue'
import ImagesDrop from '../components/ImagesDrop.vue';
import { useAuthStore } from '@/stores/auth'
const API_URL = import.meta.env.VITE_API_BASE_URL;

const emit = defineEmits(['close', 'submit'])
const dniArchivos = ref([]);
const auth = useAuthStore()

const nombre = ref('')
const email = ref('')
const telefono = ref('')
const fechaNac = ref('')
const pass = ref('')
const dniFrontal = ref(null);
const dniTrasero = ref(null);
const certDelitos = ref(null);

const emitClose = () => emit('close')

const props = defineProps({
  entrenadorId: {
    type: String,
    required: true
  },
})

const handleSubmit = () => {
  const modificarEntrenadorDTO = {
    nombre: nombre.value,
    email: email.value,
    telefono: telefono.value
  }
  emit('submit', modificarEntrenadorDTO)
  emitClose()
}

const handleDniFilesUser = (archivos) => {
  dniArchivos.value = archivos;
  dniFrontal.value = archivos[0] || null;
  dniTrasero.value = archivos[1] || null;
  certDelitos.value = archivos[2] || null;
};

const actualizar = async () => {
  if (
    !nombre.value.trim() ||
    !email.value.trim() ||
    !telefono.value.trim() ||
    !fechaNac.value ||
    !pass.value.trim() ||
    !dniFrontal.value ||
    !dniTrasero.value ||
    !certDelitos.value
  ) {
    alert("Por favor, completa todos los campos y sube los documentos requeridos.");
    return;
  }

  const modificarEntrenadorDTO = {
    tel: telefono.value,
    nombre: nombre.value,
    fechaNac: fechaNac.value,
    email: email.value,
    pass: pass.value,
  };

  const formData = new FormData();
  formData.append("modificarEntrenadorDTO", JSON.stringify(modificarEntrenadorDTO));
  formData.append("dniFrontal", dniFrontal.value);
  formData.append("dniTrasero", dniTrasero.value);
  formData.append("certDelitos", certDelitos.value);

  try {
    const response = await fetch(`${API_URL}/api/entrenador/${props.entrenadorId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: formData,
    });

    if (response.ok) {
      console.log("Usuario actualizado correctamente");
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
</script>

<template>
  <teleport to="body">
    <div class="modal-overlay" @click.self="emitClose">
      <div class="modal-box">
        <h2 class="modal-title">Actualizar Entrenador</h2>
        <form @submit.prevent="handleSubmit">
          <label class="form-label">Nombre:</label>
          <input v-model="nombre" type="text" class="form-input" required />

          <label class="form-label">Correo electrónico:</label>
          <input v-model="email" type="email" class="form-input" required />

          <label class="form-label">Teléfono:</label>
          <input v-model="telefono" type="tel" class="form-input" />

          <label class="form-label">Fecha de nacimiento:</label>
          <input v-model="fechaNac" type="date" class="form-input" />

          <label class="form-label">Contraseña:</label>
          <input v-model="pass" type="password" class="form-input" />

          <div class="form-label">
            Documentos requeridos:
            <ImagesDrop
              placeholder="Seleccione fotos del DNI por delante, por detrás y certificado de delitos"
              :maxFiles="3"
              @update:files="handleDniFilesUser"
            />
          </div>

          <div class="modal-actions">
            <button type="submit" @click="actualizar" class="guardar">Guardar</button>
            <button type="button" @click="emitClose" class="cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.modal-box {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  min-width: 360px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #333;
}

.modal-title {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
}

.form-label {
  display: block;
  margin-bottom: 0rem;
  font-weight: 600;
  margin-top: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input[type="date"] {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.guardar,
.cancelar {
  border-radius: 6px;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
}

.guardar {
  background-color: #6543e0;
  color: #fff;
}

.cancelar {
  background-color: #999;
  color: #fff;
}
</style>
