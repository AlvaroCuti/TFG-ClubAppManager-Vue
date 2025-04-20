<script setup>
    import ButtonWithIcon from '../components/ButtonWithIcon.vue';
    import trash from '@/assets/trash.png'; 
    import edit from '@/assets/edit.png'; 
    import iconoPlusPerson from '@/assets/IconPersonPlus.png'; 
    import ButtonOnlyIcon from '../components/ButtonOnlyIcon.vue';
    import { useAuthStore } from '@/stores/auth'
    import { computed } from 'vue'
    import { ref } from 'vue';
    import EditarEquipo from './EditarEquipo.vue';

    const auth = useAuthStore()
    const modalVisible = ref(false)

    const abrirModal = () => {
        modalVisible.value = true
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

        <h2>Nombre: {{nombre}}</h2>
        <h3>Participantes: {{ participantesDisplay }}</h3>
        <h3>Entrenador: {{entrenador}}</h3> 
        
        <div class="botones">
            <ButtonWithIcon :icon="iconoPlusPerson" class="boton" placeholder="Añadir Miembro"></ButtonWithIcon>
            <ButtonOnlyIcon :icon="trash" class="boton2" color="#c70714" @click="borrar"></ButtonOnlyIcon>
            <ButtonOnlyIcon :icon="edit" class="boton2" color="#fff100" @click="abrirModal"></ButtonOnlyIcon>
            <EditarEquipo
                v-if="modalVisible"
                :idEquipo=props.idEquipo
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
        </div>

    </div>

   
</template>
  

<style scoped>
.tag{
    background-color: #D9D9D9;
    border-radius: 15px;
    width: 350px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #000;
    padding: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    border-color: #000;
    border-width: 1px;
}


.tag > h2{
    font-weight: 600;
}

.botones{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    gap: 15px;
}

</style>