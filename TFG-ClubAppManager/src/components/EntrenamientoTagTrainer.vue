<script setup>
import trash1 from '@/assets/trash1-blanc.png'; 
import ButtonOnlyIcon from '../components/ButtonOnlyIcon.vue';
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const API_URL = import.meta.env.VITE_API_BASE_URL;
const auth = useAuthStore()

const props = defineProps({
  horario: {
    type: String,
    required: true
  },
  lugar: {
    type: String,
    required: true
  },
  numAsistencias: {
    type: String,
    required: true
  },
  idEntrenamiento: {
    type: String,
    required: true
  },
  idEquipo: {
    type: String,
    required: true  
  }
})

// Función para parsear fecha con nombre del mes en español o inglés
function parseFechaConHora(fechaStr) {
  const meses = {
    enero: 0,     january: 0,
    febrero: 1,   february: 1,
    marzo: 2,     march: 2,
    abril: 3,     april: 3,
    mayo: 4,      may: 4,
    junio: 5,     june: 5,
    julio: 6,     july: 6,
    agosto: 7,    august: 7,
    septiembre: 8,september: 8,
    octubre: 9,   october: 9,
    noviembre: 10,november: 10,
    diciembre: 11,december: 11
  };

  const partes = fechaStr.toLowerCase().split(" ");
  const dia = parseInt(partes[0], 10);
  const mes = meses[partes[1]];
  const anio = parseInt(partes[2], 10);
  const [hora, minuto] = partes[3].split(":").map(Number);

  if (mes === undefined) throw new Error("Mes no reconocido");

  return new Date(anio, mes, dia, hora, minuto);
}

// Computed: fecha como objeto Date
const fechaEntrenamiento = computed(() => parseFechaConHora(props.horario))

// Computed: fecha formateada en español
const fechaEntrenamientoFormateada = computed(() => {
  return fechaEntrenamiento.value.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  }) + '  ' + fechaEntrenamiento.value.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
})

const borrar = async () => {
  const JugadorIdDTO = {
    tel: auth.tel,
  };

  try {
    const response = await fetch(`${API_URL}/api/equipo/${props.idEquipo}/entrenamiento/${props.idEntrenamiento}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(JugadorIdDTO),
    });

    if (response.ok) {
      console.log(response);
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
    <div class="tag">
        <div class="imagen">
            <div class="acciones-superior">
                <ButtonOnlyIcon :icon="trash1" class="accion" color="#c70714" @click="borrar" />
            </div>
        </div>

        <div class="info">
            <h5 class="titulo">Entrenamiento</h5>
            <h5 class="hora">{{ fechaEntrenamientoFormateada }}, {{ lugar }}</h5>
            <h5 class="asis">{{ numAsistencias }} participantes</h5> 
        </div>
        
    </div>

   
</template>
  

<style scoped>


.imagen {
  background-image: url('@/assets/fondo-balones.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 130px;
  width: 100%;
  position: relative;
  border-radius: 15px 15px 0 0;
}

.acciones-superior {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.4); /* fondo negro con opacidad */
  padding: 5px;
  border-radius: 10px;
}

.tag{
    background-color: #D9D9D9;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #000;
    padding: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    border-color: #000;
    border-width: 1px;
    padding: 0;
    margin: 0;
    width: 360px;
    height: 250px;
}

.info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.datos{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
}

.titulo{
    font-size: large;
    font-weight: 700;
}

.hora{
    font-size: small;
    font-weight: 700;
}

</style>