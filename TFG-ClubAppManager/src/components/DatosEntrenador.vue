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

const handleSubmit = () => {
  const nuevoEntrenador = {
    nombre: nombre.value,
    email: email.value,
    telefono: telefono.value
  }
  emit('submit', nuevoEntrenador)
  emitClose()
}

const handleDniFilesUser = (archivos) => {
  dniArchivos.value = archivos;
  dniFrontal.value = archivos[0] || null;
  dniTrasero.value = archivos[1] || null;
  certDelitos.value = archivos[2] || null;
};

const modificar = async () => {
  const modificarEntrenadorDTO = {
    nombre: nombre.value,
    email: email.value,
    tel: telefono.value,
    fechaNac: fechaNac.value,
    pass: pass.value,
  };

  const formData = new FormData();
  formData.append("modificarEntrenadorDTO", JSON.stringify(modificarEntrenadorDTO));
  formData.append("dniFrontal", dniFrontal.value);
  formData.append("dniTrasero", dniTrasero.value);
  formData.append("certDelitos", certDelitos.value);

  try {
    const response = await fetch(`${API_URL}/api/entrenador`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: formData,
    });

    if (response.ok) {
      console.log("Usuario registrado correctamente");
      // Redirige o muestra mensaje
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
          <h2>Registrar Entrenador</h2>
          <form @submit.prevent="handleSubmit">
            <label>
              Nombre:
              <input v-model="nombre" type="text" required />
            </label>
            <label>
              Correo electrónico:
              <input v-model="email" type="email" required />
            </label>
            <label>
              Teléfono:
              <input v-model="telefono" type="tel" />
            </label>
            <label>
              Fecha de nacimiento:
              <input v-model="fechaNac" type="tel" />
            </label>
            <label>
              Contraseña:
              <input v-model="pass" type="tel" />
            </label>
            <div class="drop">
                <ImagesDrop @update:files="handleDniFilesUser"></ImagesDrop>
            </div>  
            <div class="modal-actions">
              <button type="submit" @click="modificar">Modificar</button>
              <button type="button" @click="emitClose">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </teleport>
</template>
  
<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-box {
        background: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        min-width: 350px;
        color: black;
    }
    .modal-box label {
        display: block;
        margin-bottom: 1rem;
    }
    .modal-box input {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.25rem;
    }

    .modal-actions {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        margin-top: 15px;
        gap: 15px;
    }
    
</style>
  