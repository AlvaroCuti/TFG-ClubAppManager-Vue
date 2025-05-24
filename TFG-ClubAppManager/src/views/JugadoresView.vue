<script setup>
    import { ref, onMounted } from 'vue';
    import ItemTable from '../components/ItemTable.vue';
    import HeaderTable from '../components/HeaderTable.vue';
    import RoundButtonNotFilled from '../components/RoundButtonNoFill.vue';
    import RoundButtonFilled from '../components/RoundButtonFilled.vue';
    import { useAuthStore } from '@/stores/auth'
    import FiltrosJugadores from '@/components/FiltrosJugadores.vue';
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const jugadores = ref([]);
    const auth = useAuthStore()
    const filtros = ref([]);
    const totalPages = ref(0);
    const currentPage = ref(0);

    const modalVisible = ref(false)

    const abrirModal = () => {
        modalVisible.value = true
    }

    const guardarJugadores = ({ jugadores: jugadoresFiltrados, filtros: filtrosAplicados }) => {
        jugadores.value = jugadoresFiltrados;
        filtros.value = filtrosAplicados;
    };

    const eliminarFiltro = async (index) => {
        filtros.value.splice(index, 1); // quitamos el filtro

        const campos = {};
        for (const filtro of filtros.value) {
            const [key, val] = filtro.split(':').map(s => s.trim());
            if (key && val) campos[key] = val;
        }

        // Generamos la query string
        const queryParams = Object.entries(campos)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join('&');

        const url = queryParams
            ? `${API_URL}/api/usuario?${queryParams}&page=0&size=10`
            : `${API_URL}/api/usuario?page=0&size=10`;

        try {
            const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            });

            if (response.ok) {
                const data = await response.json();
                jugadores.value = data._embedded.jugadorDTOList;
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const cambiarPagina = async (pagina) => {
        try {
            const response = await fetch(`${API_URL}/api/usuario?page=${pagina}&size=10`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                jugadores.value = data._embedded.jugadorDTOList;
                totalPages.value = data.page.totalPages;
                currentPage.value = data.page.number;
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
        const response = await fetch(`${API_URL}/api/usuario?page=0&size=10`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            jugadores.value = data._embedded.jugadorDTOList;
            totalPages.value = data.page.totalPages; 
            currentPage.value = data.page.number;
            console.log(jugadores)
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
            <h1>JUGADORES</h1>
        </div>

        <div class="filtros">
            <RoundButtonNotFilled placeholder="Filtros" @click="abrirModal"></RoundButtonNotFilled>
            <FiltrosJugadores
                v-if="modalVisible"
                @close="modalVisible = false"
                @submit="guardarJugadores"
            />
            <RoundButtonFilled
                v-for="(filtro, index) in filtros"
                :key="index"
                :placeholder="filtro"
                @remove="eliminarFiltro(index)"
            /> 
        </div>
        <div class="tabla-scroll">
            <div class="contenido">
                <HeaderTable :items="['Nombre', 'Fecha de nacimiento', 'Correo electrónico', 'Teléfono', 'Correo electrónico Tutor 1', 'Correo electrónico Tutor 2', 'Equipo', '']"></HeaderTable>
                <ItemTable
                    v-for="(jugador, index) in jugadores"
                    :key="jugador.id || index"
                    :items="[
                        jugador.nombre,
                        jugador.fechaNac,
                        jugador.email,
                        jugador.tel,
                        jugador.emailTutor1,
                        jugador.emailTutor2,
                        jugador.equipo ? jugador.equipo : '-'
                    ]"
                    :par="index % 2 === 0"
                />
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

.filtros{
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
    margin-right: 100px;
    margin-left: 100px;
    margin-top: 5px;
    margin-bottom: -10px;
}

.tabla-scroll {
  overflow-x: auto;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 150px;

}

.contenido {
  color: #000;
  min-width: 900px;
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
    min-width: 700px;
  }

  .titulo > h1 {
    margin-left: 20px;
    margin-top: 20px;
    font-size: 24px;
  }

  .filtros {
    margin-right: 20px;
    margin-left: 20px;
    justify-content: flex-start;
    flex-wrap: wrap;
  }


  .completo {
    margin: 0;
  }
}

</style>