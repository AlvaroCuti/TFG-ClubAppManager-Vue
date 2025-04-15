<script setup>
import ButtonWithIcon from '../components/ButtonWithIcon.vue';
import ItemTableTrainer from '../components/ItemTableTrainer.vue';
import HeaderTableTrainer from '../components/HeaderTableTrainer.vue';
import RegistroEntrenadorModal from '../components/RegistroEntrenador.vue'
import iconoPlus from '@/assets/IconPlus.png'; 
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue';

    const modalVisible = ref(false)
    const auth = useAuthStore()
    const entrenadores = ref([]);

    const abrirModal = () => {
        modalVisible.value = true
    }

    const guardarEntrenador = (entrenador) => {
        console.log('Nuevo entrenador:', entrenador)
        
    }

    onMounted(async () => {
        try {
        const response = await fetch("http://localhost:8081/api/entrenador?page=0&size=10", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            entrenadores.value = data._embedded.entrenadorCompletoDTOList;
            console.log(entrenadores)
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
            <h1>ENTRENADORES</h1>
        </div>

        <div class="boton">
            <ButtonWithIcon :icon="iconoPlus" placeholder="Añadir Entrenador" @click="abrirModal"></ButtonWithIcon>
            <RegistroEntrenadorModal
                v-if="modalVisible"
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
        </div>
        
        <div class="contenido">
            <HeaderTableTrainer :items="['Nombre', 'Fecha de nacimiento', 'Correo electrónico', 'Teléfono', '']"></HeaderTableTrainer>
            <ItemTableTrainer v-for="(entrenador, index) in entrenadores"
                :key="entrenador.id || index"
                :items="[
                    entrenador.nombre,
                    entrenador.fechaNac,
                    entrenador.email,
                    entrenador.tel,
                ]"
                :par="index % 2 === 0"/>
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
}

.contenido{
    color: #000;
    margin-left: 100px;
    margin-top: 20px;
}
</style>