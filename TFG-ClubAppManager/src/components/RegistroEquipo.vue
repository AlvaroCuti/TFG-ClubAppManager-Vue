<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['close', 'submit'])
const auth = useAuthStore()
const emitClose = () => emit('close')

const nombre = ref('')
const entrenadoresDisponibles = ref([])
const entrenadoresSeleccionados = ref(['']) // Primer select visible por defecto

// Agrega un nuevo campo de selección
const addInput = () => {
  entrenadoresSeleccionados.value.push('')
}

// Envía el formulario
const registrar = async () => {
  if (!nombre.value.trim()) {
    alert("El nombre del equipo es obligatorio.")
    return
  }

  const seleccionFinal = entrenadoresSeleccionados.value.filter(tel => tel !== '')

  if (seleccionFinal.length === 0) {
    alert("Debes seleccionar al menos un entrenador.")
    return
  }

  const crearEquipoDTO = {
    nombre: nombre.value,
    entrenadores: seleccionFinal.map(tel => ({ tel }))
  }

  try {
    const response = await fetch("http://localhost:8081/api/equipo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(crearEquipoDTO),
    })

    if (response.ok) {
      console.log("equipo registrado correctamente")
      window.location.reload()
    } else {
      const errorData = await response.json()
      console.error("Error:", errorData)
    }
  } catch (error) {
    console.error("Error en la solicitud:", error)
  }
}

// Cargar entrenadores al montar
onMounted(async () => {
  try {
    const response = await fetch("http://localhost:8081/api/entrenador?page=0&size=100", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      entrenadoresDisponibles.value = data._embedded?.['entrenadorCompletoDTOList'] || []
    } else {
      const errorData = await response.json()
      console.error('Error al obtener entrenadores:', errorData)
    }
  } catch (err) {
    console.error('Error cargando entrenadores:', err)
  }
})
</script>
<template>
  <teleport to="body">
    <div class="modal-overlay" @click.self="emitClose">
      <div class="modal-box">
        <h2>Registrar Equipo</h2>
        <form @submit.prevent="registrar">
          <label>
            Nombre del equipo:
            <input v-model="nombre" type="text" />
          </label>

          <div v-for="(entrenadorTel, index) in entrenadoresSeleccionados" :key="index" class="apartado">
            <label :for="'entrenador-select-' + index">Selecciona un entrenador:
            <select
              :id="'entrenador-select-' + index"
              v-model="entrenadoresSeleccionados[index]"
            >
              <option disabled value="">Selecciona un entrenador</option>
              <option
                v-for="entrenador in entrenadoresDisponibles.filter(e => 
                  !entrenadoresSeleccionados.includes(e.tel) || e.tel === entrenadorTel
                )"
                :key="entrenador.tel"
                :value="entrenador.tel"
              >
                {{ entrenador.nombre }}
              </option>
            </select></label>
          </div>

          <div class="boton">
            <button type="button" @click="addInput" class="plus">
              <img src="@/assets/plus-02.png" width="18" height="18" />
            </button>
          </div>

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
.boton {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

.plus {
  border-radius: 7px;
  background-color: #6543e0;
  color: #f6f5f8;
  border: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 7px;
  font-size: smaller;
  font-weight: 700;
}

.guardar {
  border-radius: 7px;
  background-color: #6543e0;
  color: #f6f5f8;
  border: 0;
  padding: 10px;
  font-size: smaller;
  font-weight: 700;
}

.cancelar {
  border-radius: 7px;
  background-color: grey;
  color: #f6f5f8;
  border: 0;
  padding: 10px;
  font-size: smaller;
  font-weight: 700;
}

.apartado {
  display: flex;
  flex-direction: column;
}

.modal-box select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}

</style>