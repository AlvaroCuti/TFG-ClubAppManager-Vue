<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import TextInput from '../components/TextInput.vue';
import PassInput from '../components/PassInput.vue';
import LogInButton from '../components/LogInButton.vue';
import HeaderSesion from '../components/HeaderSesion.vue';
import { RouterLink } from 'vue-router';
</script>

<template>  
<div class="header-container">
      <header>
        <img alt="logo" class="logo" src="@/assets/LogoFinal.png" width="50" height="50" />
      </header>
    </div>
<div class="completo"> 
  
  <div class="left"> 
    <div class="pagina"> 
      <div class="titulo">
        <HeaderSesion msgPrincipal="Inicia Sesión" msgSecundario="Bienvenido a FutbolApp"></HeaderSesion>
      </div>

      <div class="credenciales">
        <TextInput/>
        <PassInput/>
      </div>

      <LogInButton to="/app/jugadores"/>

      <div class="register">
          <h5>¿No tienes una cuenta?</h5>
          <RouterLink to="/register" class="link">Regístrate aqui</RouterLink>
      </div>
    </div>
    <RouterView/>
  </div>

  <div class="right">
    <div class="imagen-header"></div>
  </div>

</div>
</template>

<style scoped>

.link{
  text-decoration: underline;
  text-underline-offset: 2px;
}

.right {
  width: 50%;  /* Ocupa la mitad derecha de la pantalla */
  height: 100vh; /* Toda la altura de la pantalla */
  position: fixed;
  top: 0;
  right: 0; /* Alineado a la derecha */
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagen-header {
  width: 100%; /* Ocupará todo el ancho de .right */
  height: 100%; /* Ocupará toda la altura */
  background-image: url('@/assets/fondo.png');  /*Ruta de la imagen */
  background-size: cover; /* Ajusta la imagen para cubrir todo el div */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

.header-container {
  width: 50%;
  position: fixed; /* Si quieres que siempre esté visible */
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  padding: 15px 10px;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
}

header {
  padding-left: 35px;
}

.left{
  background-color: #F6F5F8;
  position: fixed;
  width: 50%;
  height: 100%;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.pagina{
  display: flex;
  flex-direction: column; 
  gap: 53px; 
}

.credenciales{
  display: flex;
  flex-direction: column; 
  gap: 16px;
}

.register{
  display: flex;
  flex-direction: row;
}

.register h5{
  padding: 5px;
  color: #878492;
}

.register a{
  color: #6543E0;  
}
</style>