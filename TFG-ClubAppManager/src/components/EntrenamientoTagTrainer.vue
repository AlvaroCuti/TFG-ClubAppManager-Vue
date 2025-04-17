<script setup>
    defineProps({
        horario:{
            type: String,
            required: true
        },
        lugar:{
            type: String,
            required: true
        },
        numAsistencias:{
            type: String,
            required: true
        },
        idEntrenamiento:{
            type: String,
            required: true
        },
    })
</script>

<template>
    <div class="tag">
        <div class="imagen">
        </div>

        <div class="info">
            <h5 class="titulo">Entrenamiento</h5>
            <h5 class="hora">{{ horario }} {{ lugar }}</h5>
            <h5 class="asis">{{ numAsistencias }} participantes</h5> 
        </div>
        
    </div>

   
</template>
  

<style scoped>
.imagen {
    background-image: url('@/assets/fondo-balones.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 150px;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin: 0;
}

.tag{
    background-color: #D9D9D9;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #000;
    padding: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    border-color: #000;
    border-width: 1px;
    padding: 0;
    margin: 0;
    width: 360px;
    height: 250px;
}

.info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.datos{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
}

.titulo{
    font-size: large;
    font-weight: 700;
}

.hora{
    font-size: small;
    font-weight: 700;
}

</style>