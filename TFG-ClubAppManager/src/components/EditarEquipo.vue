<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['close', 'submit'])
const auth = useAuthStore()

const emitClose = () => emit('close')
const nombre = ref('')

const props = defineProps({
    idEquipo:{
        type: String,
        required: true
    },
})

const actualizar = async () => {
  const modificarEquipoDTO = {
    nombre: nombre.value,
    entrenadores: [],
    jugadores: [] 
  };

  try {
    const response = await fetch(`http://localhost:8081/api/equipo/${props.idEquipo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(modificarEquipoDTO),
    });

    if (response.ok) {
      console.log("equipo registrado correctamente");
     
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
          <h2>Editar Equipo</h2>
          <form @submit.prevent="actualizar">
            <label>
              Nuevo nombre del equipo:
              <input v-model="nombre" type="text" required />
            </label>
            <div class="modal-actions">
              <button type="submit">Guardar</button>
              <button type="button" @click="emitClose">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </teleport>
</template>
  
<style scoped>
    .boton{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

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
  