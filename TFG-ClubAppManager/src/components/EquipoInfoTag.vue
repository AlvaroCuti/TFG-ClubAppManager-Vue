<script setup>
    import trash1 from '@/assets/trash1-blanc.png'; 
    import edit3 from '@/assets/edit3-blanc.png'; 
    import ButtonOnlyIcon from '../components/ButtonOnlyIcon.vue';
    import { useAuthStore } from '@/stores/auth'
    import { computed } from 'vue'
    import { ref } from 'vue';
    import EditarEquipo from './EditarEquipo.vue';
    import AddJugador from './AddJugador.vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification'
    const toast = useToast()
    const auth = useAuthStore()
    const modalVisibleEdit = ref(false)
    const modalVisibleAdd = ref(false)
    const router = useRouter();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const abrirModalEdit = () => {
      modalVisibleEdit.value = true
    }

    const abrirModalAdd = () => {
      modalVisibleAdd.value = true
    }

    const verDetallesEquipo = () => {
      router.push({
        path: `/app/equipos/${encodeURIComponent(props.nombre)}`,
        query: {
          idEquipo: props.idEquipo
        }
      });   
    };

    const participantesDisplay = computed(() => {
    return props.participantes === '0' || props.participantes === 0 || !props.participantes
        ? '0'
        : props.participantes
    })

    const entrenadorNombre = computed(() => {
      try {
        const entrenadores = Array.isArray(props.entrenador)
          ? props.entrenador
          : JSON.parse(props.entrenador);

        return entrenadores.length > 0 ? entrenadores[0].nombre : 'Sin asignar';
      } catch (e) {
        console.error('Error al procesar entrenador:', e, props.entrenador);
        return 'Desconocido';
      }
    });


    const props = defineProps({
        nombre:{
            type: String,
            required: true
        },
        categoria:{
            type: String,
            required: true
        },
        participantes:{
            type: String,
            required: true
        },
        entrenador:{
            type: Array,
            required: true
        },
        idEquipo:{
            type:String,
            required:true
        }
    })
    
    const borrar = async () => {
    try {
      const response = await fetch(`${API_URL}/api/equipo/${props.idEquipo}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${auth.token}`
        },
      });

      if (response.ok) {
        toast.success("Equipo eliminado con exito");
        window.location.reload();
      } else {
        toast.error("Error al eliminar equipo");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error al descargar la informacion del usuario");
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
        <h2 class="categoria">Categoria: {{ categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase() }}</h2>
        <h3 class="part">Participantes: {{ participantesDisplay }}</h3>
        <h3 class="entrenador">Entrenador: {{ entrenadorNombre }}</h3>
    </div>

    <!-- Botón inferior para añadir miembro -->
    <div class="botones-inferiores">
        <button class="add-btn" :disabled="yaAsistio" @click="abrirModalAdd"> Añadir miembro </button>
        <button class="detalles-btn" @click="verDetallesEquipo">Más detalles</button> 
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
    :entrenador=" props.entrenador"
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
  font-size: large;
  font-weight: 700;
}

.categoria{
  font-size: medium;
  font-weight: 500;
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
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 2rem 1rem 2rem;
  margin-top: 20px;
}

.add-btn,
.detalles-btn {
  border-radius: 6px;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn {
  background-color: #6543e0;
  color: #fff;
}

.add-btn:hover {
  background-color: #4b32b0;
}

.detalles-btn {
  background-color: #4b4b4b;
  color: #fff;
}

.detalles-btn:hover {
  background-color: #2e2e2e;
}


@media (max-width: 768px) {
  .tag {
    width: 90%; /* Que el card ocupe casi todo el ancho disponible */
    margin: auto; /* Centrado */
  }

  .info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .botones-inferiores {
    margin: 10px 20px;
    padding: 5px 0;
  }

  button {
    padding: 14px 20px;
    font-size: 16px;
  }

  .acciones-superior {
    top: 5px;
    right: 5px;
    padding: 3px;
    gap: 5px;
  }

  .nombre {
    font-size: 22px;
  }

  .part, .entrenador {
    font-size: 16px;
  }
}


</style>