<script setup>
</script>

<template>
   <div class="completo">

        <div class="logo">
            <img alt="logo" class="logo" src="@/assets/LogoFinal.png" width="40" height="40" />
        </div>
    
        <div class="apartados">
            <nav>
                <li class="apartado apartado1">
                    <router-link class="link" to="/jugadores">
                        <img alt="logo" class="logo" src="@/assets/User.png" width="18" height="18" />
                        Jugadores
                    </router-link>
                </li>
                <li class="apartado apartado2">
                    
                    <router-link class="link" to="/equipos">
                        <img alt="logo" class="logo" src="@/assets/IconEquipo.png" width="18" height="18" />
                        Equipos
                    </router-link>
                </li>
                <li class="apartado apartado3">
                    <router-link class="link" to="/entrenadores">
                        <img alt="logo" class="logo" src="@/assets/IconEntrenadores.png" width="18" height="18" />
                        Entrenadores
                    </router-link>
                </li>
            </nav>
        </div>
        
        <div class="perfil">
            <div class="imagen">
                <img alt="logo" class="logo" src="@/assets/Avatar.png" width="35" height="35" />
            </div>
            <div class="infoPerfil">
                <h4>Jose Angel</h4>
                <h5>Administrador</h5>
            </div>
        </div>

   </div> 
</template>
  

<style scoped>

.link{
    color: #000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

.apartado{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.apartado1:hover{
    background-color: #6543E0;
    color: aliceblue;
}

.apartado2:hover{
    background-color: #6543E0;
    color: aliceblue;
}

.apartado3:hover{
    background-color: #6543E0;
    color: aliceblue;
}

.completo{
    background-color: aliceblue;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.logo{
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.apartados{
    display: flex;
    justify-content: center;
    align-items: center;
}

.apartados > nav{
    display: flex;
    flex-direction: row;
}

.perfil{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.imagen{
    padding-right: 10px;
}

.perfil{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 17px;
}

.infoPerfil > h4{
    color: #000;
    font-size: smaller;
    font-weight: 500;
}

.infoPerfil > h5{
    color: #6543E0;
    font-size: smaller;
    font-weight: 400;
}

</style>