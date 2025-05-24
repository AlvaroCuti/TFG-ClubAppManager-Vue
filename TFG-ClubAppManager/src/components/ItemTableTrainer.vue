<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref} from 'vue';
import ActualizarEntrenadorModal from '../components/ActualizarEntrenador.vue'
import { useToast } from 'vue-toastification'
const API_URL = import.meta.env.VITE_API_BASE_URL;

const toast = useToast()
const auth = useAuthStore()

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    par: {
        type: Boolean,
        required: true
    },
})

  const modalVisible = ref(false)
  const abrirModal = () => {
      modalVisible.value = true
  }

  const guardarEntrenador = (entrenador) => {
      console.log('Nuevo entrenador:', entrenador)
      
  }

const eliminar = async () => {
    
  const tel = props.items[3]; 

  try {
    const response = await fetch(`${API_URL}/api/entrenador/${tel}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
    });

    if (response.ok) {
      toast.success("Entrenador eliminado con exito");
      window.location.reload();    
    }else{
      toast.success("Error al eliminar entrenador");
      window.location.reload();
    }
  } catch (err) {
    console.error('Error al eliminar entrenador:', err);
    toast.error("No se pudo conectar al servidor. Revisa tu conexión.");
  }
};

const descargar = async () => {
    
    const tel = props.items[3]; 
    const nom = props.items[0]; 
    try {
      const response = await fetch(`${API_URL}/api/entrenador/${tel}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
      });
  
      if (!response.ok) {
        toast.error("Error al descargar la informacion del usuario");
      }
      
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${nom}-imagenes.zip`; 
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al descargar el archivo:', err);
      toast.error("Error al descargar la informacion del usuario");
    }
  };

</script>


<template>
    <div class="container" :style="{ backgroundColor: par ? '#E1E0E7' : '#C7C4D2'}">
        <div v-for="(item, index) in items" :key="index" class="box">
            {{ item }}
        </div>

        <div class="logo-column">
            <button class="boton" @click="descargar">
                <img alt="logo" class="logo" src="@/assets/descarga2.png" width="21" height="21" />
            </button>
            <button class="boton" @click="abrirModal">
                <img alt="logo" class="logo" src="@/assets/edit3.png" width="21" height="21" />
            </button>
            <ActualizarEntrenadorModal
                v-if="modalVisible"
                :entrenadorId = "items[3]"
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
            <button class="boton" @click="eliminar">
                <img alt="logo" class="logo" src="@/assets/trash1.png" width="21" height="21" />
            </button>
        </div>
    </div>
</template>
  

<style scoped>
    .container{
        display: grid;
        grid-template-columns: repeat(6, 1fr); /* 7 columnas iguales */
        background-color: #E1E0E7;
        border-radius: 0px 0px 0px 0px;
    }

    .box{
        color: #000;
        font-weight: 600;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .logo-column {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 4px;
        margin-bottom: 4px;
    }

    .boton{
        border-radius: 10px;
        border-width: 1px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 3px;
        padding-bottom: 3px;
        background-color: transparent;
        border: none;
    }

</style>