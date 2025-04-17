<script setup>
    import EntrenamientosTag from '../components/EntrenamientosTag.vue'
    import {  ref, onMounted } from 'vue';
    import {useAuthStore } from '@/stores/auth'
    const auth = useAuthStore()

    const entrenamientos = ref([]);

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
        <div class="contenido">
            <EntrenamientosTag
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

.filtros{
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
    margin-right: 100px;
    margin-left: 100px;
    margin-top: 5px;
    margin-bottom: -10px;
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