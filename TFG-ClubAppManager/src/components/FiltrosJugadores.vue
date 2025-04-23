<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['close', 'submit'])
const auth = useAuthStore()

const nombre = ref('')
const tel = ref('')
const fechaNac = ref('')
const email = ref('')
const emailTutor1 = ref('')
const emailTutor2 = ref('')

const emitClose = () => emit('close')

const filtrar = async () => {
    const campos = {
        nombre,
        tel,
        fechaNac,
        email,
        emailTutor1,
        emailTutor2,
    };
    const cadena = ref('')
    cadena.value = '';
    const filtrosAplicados = [];

    for (const [key, refCampo] of Object.entries(campos)) {
        const valor = refCampo.value?.trim(); // .trim() y evita errores si es null
        if (valor) {
            cadena.value += `${key}=${encodeURIComponent(valor)}&`;
            filtrosAplicados.push(`${key}: ${valor}`);
        }
    }

  try {
    const response = await fetch(`http://localhost:8081/api/usuario?${cadena.value}page=0&size=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
    });

    if (response.ok) {
        const data = await response.json();
      const jugadoresFiltrados = data._embedded?.jugadorDTOList ?? [];

      // Envía jugadores filtrados al componente padre
      emit('submit', {
        jugadores: jugadoresFiltrados,
        filtros: filtrosAplicados
      });
      emitClose();
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
          <h2>Filtrar Jugadores</h2>
          <form @submit.prevent="handleSubmit">
            <label>
              Nombre:
              <input v-model="nombre" type="text" required />
            </label>
            <label>
              Teléfono:
              <input v-model="tel" type="tel" />
            </label>
            <label>
              Fecha de nacimiento:
              <input v-model="fechaNac" type="date" />
            </label>
            <label>
              Correo electrónico:
              <input v-model="email" type="email" required />
            </label>
            <label>
              Correo electrónico Tutor 1:
              <input v-model="emailTutor1" type="email" required />
            </label>
            <label>
              Correo electrónico Tutor 2:
              <input v-model="emailTutor2" type="email" required />
            </label>
            <div class="modal-actions">
              <button type="submit" @click="filtrar">Filtrar</button>
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
</style>
  