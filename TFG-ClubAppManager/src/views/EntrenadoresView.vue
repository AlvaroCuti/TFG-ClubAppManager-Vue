<script setup>
import ButtonWithIcon from '../components/ButtonWithIcon.vue';
import ItemTableTrainer from '../components/ItemTableTrainer.vue';
import HeaderTableTrainer from '../components/HeaderTableTrainer.vue';
import iconoPlus from '@/assets/IconPlus.png'; 

</script>

<template>  
    <div class="completo">
        <div class="titulo">
            <h1>ENTRENADORES</h1>
        </div>

        <div class="boton">
            <ButtonWithIcon :icon="iconoPlus" placeholder="Añadir Entrenador"></ButtonWithIcon>
        </div>
        
        <div class="contenido">
            <HeaderTableTrainer :items="['Nombre', 'Fecha de nacimiento', 'Correo electrónico', 'Teléfono', '']"></HeaderTableTrainer>
            <ItemTableTrainer :items="['Pepe Perez Martin', '26/01/2003', 'ejemplo@gmail.com', '777777777', '']" :par="false"></ItemTableTrainer>
            <ItemTableTrainer :items="['Pepe Perez Martin', '26/01/2003', 'ejemplo@gmail.com', '777777777', '']" :par="true"></ItemTableTrainer>
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
    margin-right: 100px;
    margin-left: 100px;
    margin-top: 5px;
    margin-bottom: 10px;
}

.contenido{
    color: #000;
    margin-left: 100px;
    margin-top: 20px;
}
</style>