<script setup>
import ButtonWithIcon from '../components/ButtonWithIcon.vue';
import ItemTableTrainer from '../components/ItemTableTrainer.vue';
import HeaderTableTrainer from '../components/HeaderTableTrainer.vue';
import RegistroEntrenadorModal from '../components/RegistroEntrenador.vue'
import iconoPlus from '@/assets/IconPlus.png'; 
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue';
const API_URL = import.meta.env.VITE_API_BASE_URL;

    const modalVisible = ref(false)
    const auth = useAuthStore()
    const entrenadores = ref([]);
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
        const response = await fetch(`${API_URL}/api/entrenador?page=${pagina}&size=10`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            entrenadores.value = data._embedded.entrenadorCompletoDTOList;
            totalPages.value = data.page.totalPages;
            currentPage.value = data.page.number;
            console.log(entrenadores)
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
        const response = await fetch(`${API_URL}/api/entrenador?page=0&size=10`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            entrenadores.value = data._embedded.entrenadorCompletoDTOList;
            totalPages.value = data.page.totalPages;
            currentPage.value = data.page.number;
            console.log(entrenadores)
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
            <h1>ENTRENADORES</h1>
        </div>

        <div class="boton">
            <ButtonWithIcon :icon="iconoPlus" placeholder="Añadir Entrenador" @click="abrirModal"></ButtonWithIcon>
            <RegistroEntrenadorModal
                v-if="modalVisible"
                @close="modalVisible = false"
                @submit="guardarEntrenador"
            />
        </div>
        <div class="tabla-scroll">

            <div class="contenido">
                <HeaderTableTrainer :items="['Nombre', 'Fecha de nacimiento', 'Correo electrónico', 'Teléfono', 'Equipos', '']"></HeaderTableTrainer>
                <ItemTableTrainer v-for="(entrenador, index) in entrenadores"
                    :key="entrenador.id || index"
                    :items="[
                        entrenador.nombre,
                        entrenador.fechaNac,
                        entrenador.email,
                        entrenador.tel,
                        entrenador.equipos ? entrenador.equipos : '-' // Aquí se aplica el guion
                    ]"
                    :par="index % 2 === 0"/>
            </div>

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
}

.tabla-scroll {
  overflow-x: auto;
  margin-left: 100px;
  margin-right: 50px;
  margin-bottom: 150px;
}

/* Elimina los márgenes laterales innecesarios */
.contenido {
  color: #000;
  min-width: 800px;
  margin-top: 20px;
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

    .tabla-scroll {
        overflow-x: auto;
        margin-left: 20px;
        margin-right: 20px;
    }

  .contenido {
    min-width: 600px;
  }

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
    margin-left: 20px;  /* Reducir margen en dispositivos móviles */
    margin-top: 10px;   /* Reducir margen superior */
  }

  /* Quitar márgenes a la clase completo para dispositivos móviles */
  .completo {
    margin: 0;
  }
}
</style>