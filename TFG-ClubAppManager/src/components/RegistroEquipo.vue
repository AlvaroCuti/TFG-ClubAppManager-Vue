<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['close', 'submit'])
const auth = useAuthStore()
const emitClose = () => emit('close')

const nombre = ref('')
const entrenadoresDisponibles = ref([])
const entrenadoresSeleccionados = ref(['']) // Primer select visible por defecto

const categoriaSeleccionada = ref('')
const categorias = [
  { label: 'Prebenjamín', value: 'PREBENJAMIN' },
  { label: 'Benjamín', value: 'BENJAMIN' },
  { label: 'Alevin', value: 'ALEVIN' },
  { label: 'Infantil', value: 'INFANTIL' },
  { label: 'Cadete', value: 'CADETE' },
  { label: 'Juvenil', value: 'JUVENIL' },
  { label: 'Sub_23', value: 'SUB_23' },
  { label: 'Senior', value: 'SENIOR' }
]

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
    categoria: categoriaSeleccionada.value,
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
        <h2 class="modal-title">Registrar Equipo</h2>
        <form @submit.prevent="registrar">
          <label class="form-label">
            Nombre del equipo:
            <input v-model="nombre" type="text" class="form-input" />
          </label>

          <label class="form-label">
            Selecciona una categoría:
            <select v-model="categoriaSeleccionada" class="form-select">
              <option disabled value="">Selecciona una categoría</option>
              <option v-for="cat in categorias" :key="cat.value" :value="cat.value">
                {{ cat.label }}
              </option>
            </select>
          </label>

          <div v-for="(entrenadorTel, index) in entrenadoresSeleccionados" :key="index" class="apartado">
            <label class="form-label">
              Entrenador {{ index + 1 }}:
              <select
                v-model="entrenadoresSeleccionados[index]"
                class="form-select"
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
              </select>
            </label>
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
  margin-top: 1rem;
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

.form-input,
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

.plus {
  border-radius: 6px;
  background-color: #6543e0;
  color: white;
  border: none;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.boton {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}


</style>