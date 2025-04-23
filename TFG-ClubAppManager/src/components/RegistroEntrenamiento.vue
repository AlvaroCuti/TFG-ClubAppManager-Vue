<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

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
  // Validación de campos
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
  const ProgramacionEntrenamientoDTO = {
    fecha: fecha.value,
    hora: hora.value,
    lugar: lugar.value,
  };

  try {
    const response = await fetch(`http://localhost:8081/api/equipo/${props.equipoId}/entrenamiento`, {
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
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1100;
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
    
    input[type="date"] {
      font-family: 'Arial', sans-serif; /* o la fuente que estés usando */
      color: black;
    }
    
    input[type="time"] {
      font-family: 'Arial', sans-serif;
      color: black;
    }
</style>
  