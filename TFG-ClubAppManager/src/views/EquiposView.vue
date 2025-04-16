<script setup>
    import ButtonWithIcon from '../components/ButtonWithIcon.vue';
    import EquipoInfoTag from '../components/EquipoInfoTag.vue';
    import iconoPlus from '@/assets/IconPlus.png'; 
    import { ref, onMounted } from 'vue';
    import { useAuthStore } from '@/stores/auth'
    import RegistroEquipo from '@/components/RegistroEquipo.vue';


    const modalVisible = ref(false)
    const equipos = ref([]);
    const auth = useAuthStore()

    const abrirModal = () => {
        modalVisible.value = true
    }

    const guardarEntrenador = (entrenador) => {
        console.log('Nuevo entrenador:', entrenador)
        
    }

    onMounted(async () => {
        try {
        const response = await fetch("http://localhost:8081/api/equipo?page=0&size=10", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            equipos.value = data._embedded.equipoDTOList;            ;
            console.log(equipos)
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
        }
        } catch (error) {
        console.error("Error en la solicitud:", error);
        }
    });
</script>

<template>  
    <div class="completo">
        <div class="titulo">
            <h1>EQUIPOS</h1>
        </div>

        <div class="boton">
            <ButtonWithIcon :icon="iconoPlus" placeholder="Añadir Equipo" @click="abrirModal"></ButtonWithIcon>
            <RegistroEquipo
                v-if="modalVisible"
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
        </div>

        <div class="contenido">
            <EquipoInfoTag
            v-for="(equipo, index) in equipos"
                :key="equipo.id || index"
                :nombre=equipo.idEquipo
                :entrenador=equipo.entrenadores
            />
        </div>
    </div>
</template>

<style scoped>
.completo{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.titulo{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.titulo > h1{
    color: #000;
    font-weight: 600;
    margin-left: 100px;
    margin-top: 45px;
}

.boton{
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-right: 50px;
    margin-left: 100px;
    margin-top: 5px;
    margin-bottom: 10px;
}

.contenido{
    margin-left: 100px;
    margin-right: 100px;
    display: flex;
    flex-direction: row;
    gap: 30px;
    flex-wrap: wrap;
}


</style>