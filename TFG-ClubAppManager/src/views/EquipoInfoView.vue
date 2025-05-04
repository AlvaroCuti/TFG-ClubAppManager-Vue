<script setup>
import ItemTableDetails from '@/components/ItemTableDetails.vue';
import HeaderTableDetails from '../components/HeaderTableDetails.vue';
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const nombreEquipo = route.params.nombre
const entrenadores = ref([]);
const jugadores = ref([]);
const auth = useAuthStore()

onMounted(async () => {
    const idEquipo = route.query.idEquipo;
    try {
    const response = await fetch(`http://localhost:8081/api/equipo/${idEquipo}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${auth.token}`
        },
    });

    if (response.ok) {
        const data = await response.json();
        entrenadores.value = data.entrenadores || [];
        jugadores.value = data.jugadores || [];
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
        <h1>Detalles de: {{ nombreEquipo }}</h1>
      </div>
      <div class="scroll">
        <div class="contenido1">
          <HeaderTableDetails :items="['Entrenadores', 'Teléfono', '']" />
          <template v-if="entrenadores.length > 0">
            <ItemTableDetails
              v-for="(entrenador, index) in entrenadores"
              :key="entrenador.id || index"
              :items="[entrenador.nombre, entrenador.tel]"
              :idEquipo="route.query.idEquipo"
              :par="index % 2 === 0"
            />
          </template>
          <p v-else class="mensaje-vacio">Este equipo no tiene entrenadores.</p>
        </div>
  
        <div class="contenido2">
          <HeaderTableDetails :items="['Jugadores', 'Teléfono', '']" />
          <template v-if="jugadores.length > 0">
            <ItemTableDetails
              v-for="(jugador, index) in jugadores"
              :key="jugador.id || index"
              :items="[jugador.nombre, jugador.tel]"
              :idEquipo="route.query.idEquipo"
              :par="index % 2 === 0"
            />
          </template>
          <p v-else class="mensaje-vacio">Este equipo no tiene jugadores.</p>
        </div>
      </div>
    </div>
  </template>
  

<style>
.titulo{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.mensaje-vacio {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
    color: #888;
    font-style: italic;
}

.titulo > h1{
    color: #000;
    font-weight: 600;
    margin-left: 100px;
    margin-top: 45px;
}

.scroll {
  overflow-x: auto;
  margin-left: 100px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 25px;
}

</style>
