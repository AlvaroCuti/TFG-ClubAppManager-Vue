<script setup>
    import ButtonWithIcon from '../components/ButtonWithIcon.vue';
    import EquipoInfoTag from '../components/EquipoInfoTag.vue';
    import iconoPlus from '@/assets/IconPlus.png'; 


</script>

<template>  
    <div class="completo">
        <div class="titulo">
            <h1>EQUIPOS</h1>
        </div>

        <div class="boton">
            <ButtonWithIcon :icon="iconoPlus" placeholder="Añadir Equipo"></ButtonWithIcon>
        </div>

        <div class="contenido">
            <EquipoInfoTag placeholder="Añadir miembro"></EquipoInfoTag>
            <EquipoInfoTag placeholder="Añadir miembro"></EquipoInfoTag>
            <EquipoInfoTag placeholder="Añadir miembro"></EquipoInfoTag>
            <EquipoInfoTag placeholder="Añadir miembro"></EquipoInfoTag>
            <EquipoInfoTag placeholder="Añadir miembro"></EquipoInfoTag>

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