<script setup>
    import ButtonWithIcon from '../components/ButtonWithIcon.vue';
    import iconoPlus from '@/assets/IconPlus.png'; 
    import EntrenamientoTagTrainer from '../components/EntrenamientoTagTrainer.vue';
    import {  ref, onMounted, watch} from 'vue';
    import {useAuthStore } from '@/stores/auth'
    import RegistroEntrenamientoModal from '../components/RegistroEntrenamiento.vue'
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const modalVisible = ref(false)
    const auth = useAuthStore()
    const totalPages = ref(0);
    const currentPage = ref(0);
    const entrenamientos = ref([]);
    const equipos = ref([]);

    const abrirModal = () => {
        modalVisible.value = true
    }
    const equipoSeleccionado = ref(null);

    const cargarEntrenamientos = async () => {
        if (!equipoSeleccionado.value) return;

        try {
            const response = await fetch(
            `${API_URL}/api/equipo/${equipoSeleccionado.value}/entrenamiento?page=0&size=10`,
            {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${auth.token}`,
                },
            }
            );

            if (response.ok) {
                const data = await response.json();
                entrenamientos.value = (data._embedded?.entrenamientoDTOList || []).map(ent => ({
                    ...ent,
                    numAsistencias: ent.asistencias ? ent.asistencias.length : 0
                }));
                totalPages.value = data.page.totalPages;
                currentPage.value = data.page.number;   
            } else {
                const errorData = await response.json();
                console.error('Error al obtener entrenamientos:', errorData);
            }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
    };


    const cambiarPagina = async (pagina) => {
        try {
            const response = await fetch(
            `${API_URL}/api/equipo/${equipoSeleccionado.value}/entrenamiento?page=${pagina}&size=10`,
            {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${auth.token}`,
                },
            }
            );

            if (response.ok) {
                const data = await response.json();
                entrenamientos.value = data._embedded?.entrenamientoDTOList || [];
                totalPages.value = data.page.totalPages;
                currentPage.value = data.page.number;   
            } else {
                const errorData = await response.json();
                console.error('Error al obtener entrenamientos:', errorData);
            }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
    };

    onMounted(async () => {
    try {
        const response = await fetch(
        `${API_URL}/api/entrenador/${auth.tel}/equipo`,
        {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${auth.token}`,
            },
        }
        );

        if (response.ok) {
        const data = await response.json();
        equipos.value = data.equipos;

        if (equipos.value.length > 0) {
            equipoSeleccionado.value = equipos.value[0].idEquipo;
            await cargarEntrenamientos(); // carga inicial
        }
        } else {
        const errorData = await response.json();
        console.error('Error al obtener equipos:', errorData);
        }
    } catch (error) {
        console.error('Error en la solicitud de equipos:', error);
    }
    });

watch(equipoSeleccionado, () => {
  cargarEntrenamientos();
});
</script>

<template>  
    <div class="completo">
        <div class="titulo">
            <h1>Mis Equipos</h1>
        </div>
        <div class="boton">
            <div class="selector-equipo">
                <label for="equipoSelect">Selecciona un equipo:</label>
                <select id="equipoSelect" v-model="equipoSeleccionado">
                <option v-for="equipo in equipos" :key="equipo.idEquipo" :value="equipo.idEquipo">
                    {{ equipo.nombre }}
                </option>
                </select>
            </div>

            <div class="add">
                <ButtonWithIcon :icon="iconoPlus" placeholder="Añadir Entrenamiento" @click="abrirModal"></ButtonWithIcon>
            </div>
            
            <RegistroEntrenamientoModal
                v-if="modalVisible"
                :equipo-id="equipoSeleccionado"
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
        </div>
        <div class="contenido">
            <EntrenamientoTagTrainer
            v-for="(entrenamiento, index) in entrenamientos"
                :key="index"
                :horario="entrenamiento.horario"
                :lugar="entrenamiento.lugar"
                :numAsistencias="entrenamiento.numAsistencias"
                :idEntrenamiento="entrenamiento.idEntrenamiento"
                :idEquipo="equipoSeleccionado"
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
.boton{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 50px;
    margin-left: 100px;
    margin-top: 5px;
    margin-bottom: 10px;
}

.selector-equipo{
    color: #000;
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
    padding-bottom: 120px;
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

.selector-equipo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 600;
  color: #333;
  font-size: 1rem;
  margin-right: 20px;
}

.selector-equipo label {
  margin-bottom: 6px;
}

.selector-equipo select {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  font-family: inherit;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s;
  min-width: 220px;
}

.selector-equipo select:focus {
  outline: none;
  border-color: #6543e0;
  box-shadow: 0 0 0 2px rgba(101, 67, 224, 0.2);
}


@media (max-width: 768px) {
  .titulo > h1 {
    margin-left: 20px;
    margin-top: 20px;
    font-size: 24px;
  }

  .contenido,
  .boton,
  .pagination {
    margin-left: 20px;
    margin-right: 20px;
  }

  .pagination {
    bottom: 10px;
  }

}
</style>