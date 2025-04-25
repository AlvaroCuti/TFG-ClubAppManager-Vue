<script setup>
    import trash1 from '@/assets/trash1-blanc.png'; 
    import edit3 from '@/assets/edit3-blanc.png'; 
    import ButtonOnlyIcon from '../components/ButtonOnlyIcon.vue';
    import { useAuthStore } from '@/stores/auth'
    import { computed } from 'vue'
    import { ref } from 'vue';
    import EditarEquipo from './EditarEquipo.vue';
    import AddJugador from './AddJugador.vue';

    const auth = useAuthStore()
    const modalVisibleEdit = ref(false)
    const modalVisibleAdd = ref(false)

    const abrirModalEdit = () => {
      modalVisibleEdit.value = true
    }

    const abrirModalAdd = () => {
      modalVisibleAdd.value = true
    }

    const participantesDisplay = computed(() => {
    return props.participantes === '0' || props.participantes === 0 || !props.participantes
        ? '0'
        : props.participantes
    })

    const props = defineProps({
        nombre:{
            type: String,
            required: true
        },
        participantes:{
            type: String,
            required: true
        },
        entrenador:{
            type: String,
            required: true
        },
        idEquipo:{
            type:String,
            required:true
        }
    })
    
    const borrar = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/equipo/${props.idEquipo}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${auth.token}`
        },
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
  <!-- Imagen superior con botones -->
  <div class="imagen">
    <div class="acciones-superior">
        <ButtonOnlyIcon :icon="trash1" class="accion" color="#c70714" @click="borrar" />
        <ButtonOnlyIcon :icon="edit3" class="accion" color="#E08B43" @click="abrirModalEdit" />
    </div>
  </div>

  <!-- Información del equipo -->
   <div class="info">
    <div class="datos">
        <h2 class="nombre">Nombre: {{ nombre }}</h2>
        <h3 class="part">Participantes: {{ participantesDisplay }}</h3>
        <h3 class="entrenador">Entrenador: {{ entrenador }}</h3>
    </div>

    <!-- Botón inferior para añadir miembro -->
    <div class="botones-inferiores">
        <button :disabled="yaAsistio" @click="abrirModalAdd"> Añadir miembro </button> 
        <AddJugador
          v-if="modalVisibleAdd"
          :idEquipo="props.idEquipo"
          @close="modalVisibleAdd = false"
          @submit="guardarEntrenador"
        />
    </div>
   </div>

  <!-- Modal -->
  <EditarEquipo
    v-if="modalVisibleEdit"
    :idEquipo="props.idEquipo"
    @close="modalVisibleEdit = false"
    @submit="guardarEntrenador"
  />
</div>

</template>
  

<style scoped>
.tag {
  background-color: #D9D9D9;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #000;
  width: 435px;
  height: auto;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
}

.imagen {
  background-image: url('@/assets/fondo-equipo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 115px;
  width: 100%;
  position: relative;
}

/* Botones de editar y borrar flotando arriba a la derecha */
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

.nombre {
  font-size: x-large;
  font-weight: 700;
}

.part, .entrenador {
  font-size: medium;
  font-weight: 500;
}

.info{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 15px;
}

.datos {
  padding: 10px 15px;
}

.botones-inferiores {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 10px;
}

button{
    border-radius: 14px;
    background-color: #6543E0;
    color:#F6F5F8;
    border: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-right: 15px;
    padding-left: 15px;
    padding-top: 28px;
    padding-bottom: 28px;
    font-size: smaller;
    font-weight: 700;
}

</style>