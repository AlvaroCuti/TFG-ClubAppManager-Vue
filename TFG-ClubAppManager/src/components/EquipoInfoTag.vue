<script setup>
    import ButtonWithIcon from '../components/ButtonWithIcon.vue';
    import iconoPlusPerson from '@/assets/IconPersonPlus.png'; 

    defineProps({
        nombre:{
            type: String,
            required: true
        },
        categoria:{
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
        placeholder:{
            type: String,
            required: true
        },
    })
</script>

<template>
    <div class="tag">

        <h2>Nombre: {{nombre}}</h2>
        <h3>Categoria: {{categoria}}</h3>
        <h3>Participantes: {{participantes}}</h3>
        <h3>Entrenador: {{entrenador}}</h3> 
        
        <ButtonWithIcon :icon="iconoPlusPerson" class="boton" placeholder="Añadir Equipo"></ButtonWithIcon>

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

.tag > button{
    margin-top: 10px;
    margin-bottom: 7px;
}

.boton{
    margin-left: 60px;
    margin-right: 60px;
}


button {
    border-radius: 7px;
    background-color: #6543E0;
    color:#F6F5F8;
    border: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding-right: 18px;
    padding-left: 18px;
    padding-top: 6px;
    padding-bottom: 5px;
    font-size: smaller;
    font-weight: 700;
}

button:hover{
  background-color: #593bc8; /* Verde más oscuro */
  transform: scale(1.02); /* Hace el botón un poco más grande */
}


</style>