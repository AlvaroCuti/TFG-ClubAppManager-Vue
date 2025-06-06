<script setup>
 import {useAuthStore } from '@/stores/auth'
 const auth = useAuthStore()
    const API_URL = import.meta.env.VITE_API_BASE_URL;

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
        idEquipo:{
            type: String,
            required: true
        },
        yaAsistio:{
            type: Boolean,
            required: true
        },
    })

    function parseFechaConHora(fechaStr) {
       const meses = {
        enero: 0,     january: 0,
        febrero: 1,   february: 1,
        marzo: 2,     march: 2,
        abril: 3,     april: 3,
        mayo: 4,      may: 4,
        junio: 5,     june: 5,
        julio: 6,     july: 6,
        agosto: 7,    august: 7,
        septiembre: 8,september: 8,
        octubre: 9,   october: 9,
        noviembre: 10,november: 10,
        diciembre: 11,december: 11
    };

        // Divide la string: ["12", "diciembre", "2025", "15:30"]
        const partes = fechaStr.toLowerCase().split(" ");
        const dia = parseInt(partes[0], 10);
        const mes = meses[partes[1]];
        const anio = parseInt(partes[2], 10);

        const [hora, minuto] = partes[3].split(":").map(Number);

        if (mes === undefined) throw new Error("Mes no reconocido");

        return new Date(anio, mes, dia, hora, minuto);
    }

    import { computed } from 'vue';

    // Convertir la fecha string a objeto Date
    const fechaEntrenamiento = computed(() => parseFechaConHora(props.horario));

    // Verificar si la fecha ya pasó
    const entrenamientoPasado = computed(() => {
        const ahora = new Date();
        return fechaEntrenamiento.value < ahora;
    });


    const handleClick = async () => {
    try {
        const idEquipo = props.idEquipo;
        const id = props.idEntrenamiento; 
        const response = await fetch(`${API_URL}/api/equipo/${idEquipo}/entrenamiento/${id}/usuario/${auth.tel}`, {
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

    const handleCancel = async () => {
    try {
        const idEquipo = props.idEquipo;
        const id = props.idEntrenamiento; 
        const response = await fetch(`${API_URL}/api/equipo/${idEquipo}/entrenamiento/${id}/usuario/${auth.tel}`, {
        method: 'DELETE',
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

    const fechaEntrenamientoFormateada = computed(() => {
    return fechaEntrenamiento.value.toLocaleDateString('es-ES', {
        weekday: 'long', 
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    }) + ' a las ' + fechaEntrenamiento.value.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
});

</script>

<template>
    <div class="tag">
        <div class="imagen">
        </div>

        <div class="info">
            <div class="datos">
                <h5 class="titulo">Entrenamiento</h5>
                <h5 class="hora">{{ fechaEntrenamientoFormateada  }}, {{ lugar }}</h5>
                <h5 class="asis">{{ numAsistencias }} participantes</h5> 
            </div>
            <div class="boton" >
                <button :disabled="yaAsistio || entrenamientoPasado" @click="handleClick" class="confirmar"> Asistir </button> 
                <button :disabled="!yaAsistio || entrenamientoPasado" @click="handleCancel" class="cancelar"> Cancelar </button>
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
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.confirmar {
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

.cancelar {
    border-radius: 14px;
    background-color: #c70714;
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


button:not(:disabled).confirmar:hover {
  background-color: #593bc8; 
  transform: scale(1.02);
}

button:not(:disabled).cancelar:hover {
  background-color: #b90713;
  transform: scale(1.02);
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