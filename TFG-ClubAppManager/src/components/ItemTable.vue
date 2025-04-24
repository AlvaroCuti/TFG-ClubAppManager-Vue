<script setup>
import { useAuthStore } from '@/stores/auth'
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
    col:{
        type: Number,
        required: true,
    }
})

const handleClick = async () => {
  try {
    const tel = props.items[3]; 
    const nom = props.items[0]; 

    const response = await fetch(`http://localhost:8081/api/usuario/${tel}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
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
  }
};

</script>


<template>
    <div class="container" :style="{ backgroundColor: par ? '#E1E0E7' : '#C7C4D2'}">
        <div v-for="(item, index) in items" :key="index" class="box">
            {{ item }}
        </div>
        <div class="logo-column">
            <button class="boton" @click="handleClick">
                <img alt="logo" class="logo" src="@/assets/descarga2.png" width="20" height="20" />
            </button>
        </div>
        
    </div>
</template>
  

<style scoped>
    .container{
        display: grid;
        grid-template-columns: repeat(7, 1fr); /* 7 columnas iguales */
        background-color: #E1E0E7;
        margin-right: 100px;
        border-radius: 0px 0px 0px 0px;
    }

    .logo-column {
        display: flex;
        align-items: center;
        justify-content: center;
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

</style>