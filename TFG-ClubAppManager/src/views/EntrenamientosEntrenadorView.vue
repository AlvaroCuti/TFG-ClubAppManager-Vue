<script setup>
    import ButtonWithIcon from '../components/ButtonWithIcon.vue';
    import iconoPlus from '@/assets/IconPlus.png'; 
    import EntrenamientoTagTrainer from '../components/EntrenamientoTagTrainer.vue';
    import {  ref, onMounted } from 'vue';
    import {useAuthStore } from '@/stores/auth'
    import RegistroEntrenamientoModal from '../components/RegistroEntrenamiento.vue'
    
    const modalVisible = ref(false)
    const auth = useAuthStore()

    const entrenamientos = ref([]);

    const abrirModal = () => {
        modalVisible.value = true
    }

    onMounted(async () => {
        try {
        const response = await fetch("http://localhost:8081/api/equipo/67ffe8827e8a3239b269b564/entrenamiento?page=0&size=10", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            entrenamientos.value = data._embedded.entrenamientoDTOList;
            console.log(entrenamientos.value)
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
            <h1>Mi Equipo</h1>
        </div>
        <div class="boton">
            <ButtonWithIcon :icon="iconoPlus" placeholder="Añadir Entrenamiento" @click="abrirModal"></ButtonWithIcon>
            <RegistroEquipo
                v-if="modalVisible"
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
            <RegistroEntrenamientoModal
                v-if="modalVisible"
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
        </div>
        <div class="contenido">
            <EntrenamientoTagTrainer
            v-for="(entrenamiento, index) in entrenamientos"
                :key="index"
                :horario="entrenamiento.horario"
                :lugar="entrenamiento.lugar"
                :numAsistencias="entrenamiento.numAsistencias"
                :idEntrenamiento="entrenamiento.idEntrenamiento"
            />
        </div>
    </div>
</template>

<style scoped>

.completo {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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
    color: #000;
    margin-left: 100px;
    margin-top: 20px;
    display: flex;
    flex: row;
    gap: 60px;
    flex-wrap: wrap;
    flex: 1;
    padding-bottom: 100px;
}
</style>