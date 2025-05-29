<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FiltrosJugadores from '../components/FiltrosJugadores.vue'
import RoundButtonNotFilled from '@/components/RoundButtonNoFill.vue';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const emit = defineEmits(['close', 'submit'])
const auth = useAuthStore()

const jugadorSeleccionado = ref(null)
const jugadores = ref([])

const props = defineProps({
  idEquipo: {
    type: String,
    required: true
  },
})

const emitClose = () => emit('close')

const modalFiltroVisible = ref(false)
const filtros = ref([])

const aplicarFiltros = async ({ jugadores: jugadoresFiltrados, filtros: filtrosAplicados }) => {
  jugadores.value = jugadoresFiltrados
  filtros.value = filtrosAplicados
}


const fetchJugadores = async () => {
  try {
    const response = await fetch(`${API_URL}/api/usuario?page=0&size=100`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });

    if (response.ok) {
      const data = await response.json()
      jugadores.value = (data._embedded?.jugadorDTOList || []).filter(jugador => jugador.equipo == null)
    }else {
      console.error("Error al cargar jugadores")
    }
  } catch (error) {
    console.error("Error en la solicitud:", error)
  }
}

onMounted(fetchJugadores)

const actualizar = async () => {
  if (!jugadorSeleccionado.value) return

  const tel = jugadorSeleccionado.value.tel

  try {
    const response = await fetch(`${API_URL}/api/equipo/${props.idEquipo}/jugador/${tel}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
    });

    if (response.ok) {
      window.location.reload()
    } else {
      const errorData = await response.json()
      console.error("Error:", errorData)
    }
  } catch (error) {
    console.error("Error en la solicitud:", error)
  }
}

</script>

<template>
  <teleport to="body">
    <div class="modal-overlay" @click.self="emitClose">
       <div class="modal-box">
        <h2 class="modal-title">Añadir miembro</h2>
        <form @submit.prevent="actualizar">
            <div class="filtros-modal">
              <div class="texto">
                 <label class="form-label">Selecciona un jugador:</label>
              </div>
              <div>
                <RoundButtonNotFilled placeholder="Filtrar" @click="modalFiltroVisible = true" />
              </div>
              <FiltrosJugadores
                v-if="modalFiltroVisible"
                @close="modalFiltroVisible = false"
                @submit="aplicarFiltros"
              />
            </div>
            <select v-model="jugadorSeleccionado" required class="form-select">
              <option disabled value="">Selecciona un jugador</option>
              <option
                v-for="jugador in jugadores"
                :key="jugador.id"
                :value="jugador"
              >
                {{ jugador.nombre }} {{ jugador.apellido }}
              </option>
            </select>
          <div class="modal-actions">
            <button type="submit" class="guardar">Guardar</button>
            <button type="button" @click="emitClose" class="cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>


<style scoped>
.filtros-modal {
  display: flex;
  margin-bottom: 0.25rem;
  justify-content: space-between;
}

.texto{
  margin-top: 3px;
}

.filtro-btn {
  background-color: #fff;
  color: #6543e0;
  border: 2px solid #6543e0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.filtro-btn:hover {
  background-color: #6543e0;
  color: #fff;
}

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

.form-select {
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
