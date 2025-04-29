<script setup>
    import EntrenamientosTag from '../components/EntrenamientosTag.vue'
    import {  ref, onMounted } from 'vue';
    import {useAuthStore } from '@/stores/auth'
    const auth = useAuthStore()

    const entrenamientos = ref([]);
    const equipo = ref([]);
    const totalPages = ref(0);
    const currentPage = ref(0);

    const cambiarPagina = async (pagina) => {
        try {
        const response = await fetch(`http://localhost:8081/api/equipo/${equipo.value}/entrenamiento?page=${pagina}&size=10`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            entrenamientos.value = data._embedded.entrenamientoDTOList.map(e => ({
            ...e,
                numAsistencias: e.asistencias.length,
                yaAsistio: e.asistencias.some(a => a.idJugador === auth.tel) 
            }));
            totalPages.value = data.page.totalPages;
            currentPage.value = data.page.number;               
            console.log(entrenamientos.value)
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
        }
        } catch (error) {
        console.error("Error en la solicitud:", error);
        }
    };

    onMounted(async () => {

        try {
        const response = await fetch(`http://localhost:8081/api/usuario/${auth.tel}/equipo`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            equipo.value = data.idEquipo;
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
        }
        } catch (error) {
        console.error("Error en la solicitud:", error);
        }


        try {
        const response = await fetch(`http://localhost:8081/api/equipo/${equipo.value}/entrenamiento?page=0&size=10`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            entrenamientos.value = data._embedded.entrenamientoDTOList.map(e => ({
            ...e,
                numAsistencias: e.asistencias.length,
                yaAsistio: e.asistencias.some(a => a.idJugador === auth.tel) 
            }));
            totalPages.value = data.page.totalPages;
            currentPage.value = data.page.number;               
            console.log(entrenamientos.value)
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
            <h1>Mi Equipo</h1>
        </div>
        <div class="contenido">
            <EntrenamientosTag
                v-for="(entrenamiento, index) in entrenamientos"
                :key="index"
                :horario="entrenamiento.horario"
                :lugar="entrenamiento.lugar"
                :numAsistencias="entrenamiento.numAsistencias"
                :idEntrenamiento="entrenamiento.idEntrenamiento"
                :yaAsistio="entrenamiento.yaAsistio"
            />
        </div>

        <div class="pagination">
            <button
                v-for="n in totalPages"
                :key="n"
                :class="{ active: currentPage === (n - 1) }"
                @click="cambiarPagina(n - 1)">
                {{ n }}
            </button>
        </div>
    </div>
</template>

<style scoped>

.completo {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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
    display: flex;
    flex: row;
    gap: 60px;
    flex-wrap: wrap;
    flex: 1;
    padding-bottom: 100px;
}


.pagination {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 5px;
}

.pagination button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background-color: #e0e0e0;
    cursor: pointer;
    font-weight: bold;
}

.pagination button.active {
    background-color: #6543E0;
    color: white;
}

@media (max-width: 768px) {
  .titulo > h1 {
    margin-left: 20px;
    margin-top: 20px;
    font-size: 24px;
  }

  .boton {
    margin: 10px 20px;
    justify-content: center;
  }

  .contenido {
    margin: 10px 20px;
    flex-direction: column;
    gap: 20px;
  }

  .pagination {
    bottom: 10px;
    gap: 3px;
  }

}
</style>