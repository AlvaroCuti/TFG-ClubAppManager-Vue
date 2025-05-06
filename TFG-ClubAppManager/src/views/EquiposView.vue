<script setup>
    import ButtonWithIcon from '../components/ButtonWithIcon.vue';
    import EquipoInfoTag from '../components/EquipoInfoTag.vue';
    import iconoPlus from '@/assets/IconPlus.png'; 
    import { ref, onMounted } from 'vue';
    import { useAuthStore } from '@/stores/auth'
    import RegistroEquipo from '@/components/RegistroEquipo.vue';


    const modalVisible = ref(false)
    const equipos = ref([]);
    const auth = useAuthStore()
    const totalPages = ref(0);
    const currentPage = ref(0);

    const abrirModal = () => {
        modalVisible.value = true
    }

    const guardarEntrenador = (entrenador) => {
        
        console.log('Nuevo entrenador:', entrenador)
        
    }

    const cambiarPagina = async (pagina) => {
        try {
        const response = await fetch(`http://localhost:8081/api/equipo?page=${pagina}&size=10`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            equipos.value = data._embedded.equipoDTOList;  
            totalPages.value = data.page.totalPages;
            currentPage.value = data.page.number;          ;
            console.log(equipos)
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
        const response = await fetch("http://localhost:8081/api/equipo?page=0&size=10", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            equipos.value = data._embedded.equipoDTOList;    
            totalPages.value = data.page.totalPages;
            currentPage.value = data.page.number;          ;        ;
            console.log(equipos)
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
            <h1>EQUIPOS</h1>
        </div>

        <div class="boton">
            <ButtonWithIcon :icon="iconoPlus" placeholder="Añadir Equipo" @click="abrirModal"></ButtonWithIcon>
            <RegistroEquipo
                v-if="modalVisible"
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
        </div>

        <div class="contenido">
            <EquipoInfoTag
            v-for="(equipo, index) in equipos"
                :key="equipo.id || index"
                :nombre=equipo.nombre
                :categoria=equipo.categoria
                :entrenador=equipo.entrenadores
                :participantes=equipo.numeroJugadores
                :idEquipo=equipo.idEquipo
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
    padding-bottom: 150px;
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