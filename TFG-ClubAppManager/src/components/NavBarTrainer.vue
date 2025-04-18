<script setup>
</script>

<template>
   <div class="completo">
        <div class="logo">
            <img alt="logo" class="logo" src="@/assets/LogoFinal.png" width="50" height="50" />
        </div>

        <div class="apartados">
            <nav>
                <li class="apartado apartado1">
                    <router-link class="link" to="/vistaEntrenador/entrenador" active-class="activo">
                        <img alt="logo" class="logo" src="@/assets/IconEquipo.png" width="18" height="18" />
                        Mis Equipos
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
    font-weight: 500;
    padding-right: 16px;
    transition: color 0.4s ease; /* transición para el texto */
}

.apartado{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

nav{
    gap: 16px;
}

.apartado1:hover{
    transition: color 0.4s ease; /* transición para el texto */
    background-color: #6543E0;
    color: #E1E0E7;
    border-radius: 8px;
}

.link:hover{
    color: #E1E0E7;
}

.apartado img {
    transition: filter 0.4s ease; /* transición para el icono */
}

.apartado:hover img {
    filter: brightness(0) invert(1);
}

.link.activo{
    background-color: #6543E0;
    color: #E1E0E7;
    border-radius: 8px;
}

.link.activo img {
    filter: brightness(0) invert(1);
}

.completo{
    background-color: #E1E0E7;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.logo{
    margin-left: 10px;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.apartados{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
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