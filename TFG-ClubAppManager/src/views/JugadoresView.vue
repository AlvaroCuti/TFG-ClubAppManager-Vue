<script setup>
    import HeaderTable from '../components/HeaderTable.vue';

</script>

<template>  
    <div class="completo">
        <div class="titulo">
            <h1>JUGADORES</h1>
        </div>
        <div class="contenido">
            <HeaderTable :items="['Nombre', 'Fecha de nacimiento', 'Correo electrónico', 'Teléfono', 'Correo electrónico Tutor 1', 'Correo electrónico Tutor 2', '']"></HeaderTable>
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

.contenido{
    color: #000;
    margin-left: 100px;
    margin-top: 35px;
}
</style>