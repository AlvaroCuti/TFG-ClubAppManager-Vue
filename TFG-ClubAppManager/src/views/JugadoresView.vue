<script setup>
    import { ref, onMounted } from 'vue';
    import ItemTable from '../components/ItemTable.vue';
    import HeaderTable from '../components/HeaderTable.vue';
    import RoundButtonNotFilled from '../components/RoundButtonNoFill.vue';
    import RoundButtonFilled from '../components/RoundButtonFilled.vue';
    import { useAuthStore } from '@/stores/auth'
    import FiltrosJugadores from '@/components/FiltrosJugadores.vue';
   
    const jugadores = ref([]);
    const auth = useAuthStore()
    const filtros = ref([]);

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

        // Creamos un objeto a partir de los filtros que quedan
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
            ? `http://localhost:8081/api/usuario?${queryParams}&page=0&size=10`
            : `http://localhost:8081/api/usuario?page=0&size=10`;

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


    onMounted(async () => {
        try {
        const response = await fetch("http://localhost:8081/api/usuario?page=0&size=10", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            jugadores.value = data._embedded.jugadorDTOList;
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
        
        <div class="contenido">
            <HeaderTable :items="['Nombre', 'Fecha de nacimiento', 'Correo electrónico', 'Teléfono', 'Correo electrónico Tutor 1', 'Correo electrónico Tutor 2', '']"></HeaderTable>
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
                ]"
                :par="index % 2 === 0"
            />
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

.contenido{
    color: #000;
    margin-left: 100px;
    margin-top: 20px;
}

</style>