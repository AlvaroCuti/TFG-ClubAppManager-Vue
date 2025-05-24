<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const API_URL = import.meta.env.VITE_API_BASE_URL;

const auth = useAuthStore()
const emit = defineEmits(['close', 'submit'])

const fecha = ref('')
const hora = ref('')
const lugar = ref('')

const emitClose = () => emit('close')

const props = defineProps({
  equipoId: {
    type: String,
    required: true
  }
});

const handleSubmit = () => {
  const nuevoEntrenamiento = {
    fecha: fecha.value,
    hora: hora.value,
    lugar: lugar.value,
  }
  emit('submit', nuevoEntrenamiento)
  emitClose()
}

const crear = async () => {

  if (!fecha.value) {
    alert("La fecha del entrenamiento es obligatoria.");
    return;
  }

  if (!hora.value) {
    alert("La hora del entrenamiento es obligatoria.");
    return;
  }

  if (!lugar.value.trim()) {
    alert("El lugar del entrenamiento es obligatorio.");
    return;
  }

  const ahora = new Date();
  const fechaHoraEntrenamiento = new Date(`${fecha.value}T${hora.value}`);

  if (fechaHoraEntrenamiento <= ahora) {
    alert("La fecha y hora del entrenamiento deben ser posteriores al momento actual.");
    return;
  }
  const ProgramacionEntrenamientoDTO = {
    fecha: fecha.value,
    hora: hora.value,
    lugar: lugar.value,
    entrenador: auth.tel,
  };

  try {
    const response = await fetch(`${API_URL}/api/equipo/${props.equipoId}/entrenamiento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(ProgramacionEntrenamientoDTO),
    });

    if (response.ok) {
      window.location.reload();
      console.log("Usuario registrado correctamente");
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
          <h2>Añadir Entrenamiento</h2>
          <form @submit.prevent="handleSubmit">
            <label>
              Fecha:
              <input v-model="fecha" type="date"/>
            </label>
            <label>
              Hora:
              <input v-model="hora" type="time"/>
            </label>
            <label>
              Lugar:
              <input v-model="lugar" type="text"/>
            </label>
            <div class="modal-actions">
              <button type="submit" @click="crear">Guardar</button>
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

.modal-box h2 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
}

.modal-box label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
}

.modal-box input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 0.5rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  border-radius: 6px;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"] {
  background-color: #6543e0;
  color: #fff;
}

button[type="submit"]:hover {
  background-color: #4b32b0;
}

button[type="button"] {
  background-color: #999;
  color: #fff;
}

button[type="button"]:hover {
  background-color: #666;
}

</style>
  