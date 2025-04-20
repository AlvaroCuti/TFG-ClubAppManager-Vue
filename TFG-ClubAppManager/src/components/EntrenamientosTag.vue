<script setup>
 import {useAuthStore } from '@/stores/auth'
 const auth = useAuthStore()

    const props = defineProps({
        horario:{
            type: String,
            required: true
        },
        lugar:{
            type: String,
            required: true
        },
        numAsistencias:{
            type: Number,
            required: true
        },
        idEntrenamiento:{
            type: String,
            required: true
        },
        yaAsistio:{
            type: Boolean,
            required: true
        },
    })

    const handleClick = async () => {
    try {
        const id = props.idEntrenamiento; 
        const response = await fetch(`http://localhost:8081/api/equipo/entrenamiento/${id}/usuario/${auth.tel}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${auth.token}`
        },
        });

        if (response.ok) {
            window.location.reload();
            console.log("Usuario registrado correctamente");
            // Redirige o muestra mensaje
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
    };
</script>

<template>
    <div class="tag">
        <div class="imagen">
        </div>

        <div class="info">
            <div class="datos">
                <h5 class="titulo">Entrenamiento</h5>
                <h5 class="hora">{{ horario }}, {{ lugar }}</h5>
                <h5 class="asis">{{ numAsistencias }} participantes</h5> 
            </div>
            <div class="boton" >
               <button :disabled="yaAsistio" @click="handleClick"> Asistir </button> 
            </div>
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

.boton{
    margin-left: 40px;
    margin-right: 40px;
}

button {
    border-radius: 14px;
    background-color: #6543E0;
    color:#F6F5F8;
    border: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-right: 25px;
    padding-left: 25px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: smaller;
    font-weight: 700;
}

button:hover{
  background-color: #593bc8; /* Verde más oscuro */
  transform: scale(1.02); /* Hace el botón un poco más grande */
}

.info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

button:disabled {
  background-color: #999;
  cursor: not-allowed;
  transform: none;
}

</style>