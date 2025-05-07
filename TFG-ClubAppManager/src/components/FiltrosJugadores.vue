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
        <h2 class="modal-title">Filtrar Jugadores</h2>
        <form @submit.prevent="filtrar">
          <label class="form-label">
            Nombre:
            <input v-model="nombre" type="text" class="form-input" />
          </label>
          <label class="form-label">
            Teléfono:
            <input v-model="tel" type="tel" class="form-input" />
          </label>
          <label class="form-label">
            Fecha de nacimiento:
            <input v-model="fechaNac" type="date" class="form-input" />
          </label>
          <label class="form-label">
            Correo electrónico:
            <input v-model="email" type="email" class="form-input" />
          </label>
          <label class="form-label">
            Correo electrónico Tutor 1:
            <input v-model="emailTutor1" type="email" class="form-input" />
          </label>
          <label class="form-label">
            Correo electrónico Tutor 2:
            <input v-model="emailTutor2" type="email" class="form-input" />
          </label>

          <div class="modal-actions">
            <button type="submit" class="filtrar">Filtrar</button>
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
  top: 0; left: 0;
  width: 100vw; height: 100vh;
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
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
}

.form-label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
}

.form-input {
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

.filtrar,
.cancelar {
  border-radius: 6px;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
}

.filtrar {
  background-color: #6543e0;
  color: white;
}

.cancelar {
  background-color: #999;
  color: white;
}

</style>
  