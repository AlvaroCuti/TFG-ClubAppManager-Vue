<script setup>
    import ItemTable from '../components/ItemTable.vue';
    import HeaderTable from '../components/HeaderTable.vue';
    import RoundButtonNotFilled from '../components/RoundButtonNoFill.vue';
    import RoundButtonFilled from '../components/RoundButtonFilled.vue';

</script>

<template>  
    <div class="completo">
        <div class="titulo">
            <h1>JUGADORES</h1>
        </div>

        <div class="filtros">
            <RoundButtonNotFilled placeholder="Filtros"></RoundButtonNotFilled>
            <RoundButtonFilled placeholder="Nombre"></RoundButtonFilled>
        </div>
        
        <div class="contenido">
            <HeaderTable :items="['Nombre', 'Fecha de nacimiento', 'Correo electrónico', 'Teléfono', 'Correo electrónico Tutor 1', 'Correo electrónico Tutor 2', '']"></HeaderTable>
            <ItemTable :items="['Pepe Perez Martin', '26/01/2003', 'ejemplo@gmail.com', '777777777', 'ejemplo@gmail.com', 'ejemplo@gmail.com', '']" :par="false"></ItemTable>
            <ItemTable :items="['Pepe Perez Martin', '26/01/2003', 'ejemplo@gmail.com', '777777777', 'ejemplo@gmail.com', 'ejemplo@gmail.com', '']" :par="true"></ItemTable>
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
}

</style>