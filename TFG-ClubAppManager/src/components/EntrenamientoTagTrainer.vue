<script setup>
    import trash1 from '@/assets/trash1-blanc.png'; 
    import ButtonOnlyIcon from '../components/ButtonOnlyIcon.vue';
    import { useAuthStore } from '@/stores/auth'

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
            type: String,
            required: true
        },
        idEntrenamiento:{
            type: String,
            required: true
        },
        idEquipo:{
            type: String,
            required: true  
        }
    })

    const borrar = async () => {

    const JugadorIdDTO = {
        tel: auth.tel,
    };

    try {
      const response = await fetch(`http://localhost:8081/api/equipo/${props.idEquipo}/entrenamiento/${props.idEntrenamiento}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify(JugadorIdDTO),
      });

      if (response.ok) {
        console.log(response);
        window.location.reload();
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
            <div class="acciones-superior">
                <ButtonOnlyIcon :icon="trash1" class="accion" color="#c70714" @click="borrar" />
            </div>
        </div>

        <div class="info">
            <h5 class="titulo">Entrenamiento</h5>
            <h5 class="hora">{{ horario }}, {{ lugar }}</h5>
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
  height: 130px;
  width: 100%;
  position: relative;
  border-radius: 15px 15px 0 0;
}

.acciones-superior {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.4); /* fondo negro con opacidad */
  padding: 5px;
  border-radius: 10px;
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
    margin-top: 20px;
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