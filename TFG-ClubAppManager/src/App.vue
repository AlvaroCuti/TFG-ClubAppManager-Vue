<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import TextInput from './components/TextInput.vue';
import PassInput from './components/PassInput.vue';
import LogInButton from './components/LogInButton.vue';
import HeaderSesion from './components/HeaderSesion.vue';
</script>

<template>  

<div class="completo">
  <div class="left"> 

    <div class="header-container">
      <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
      </header>
    </div>

    <div class="pagina"> 
      <div class="titulo">
        <HeaderSesion msgPrincipal="Inicia Sesión" msgSecundario="Bienvenido a FutbolApp"></HeaderSesion>
      </div>

      <div class="credenciales">
        <TextInput/>
        <PassInput/>
      </div>

      <LogInButton/>

      <div class="register">
          <h5>¿No tienes una cuenta?</h5>
          <a>Regístrate aqui</a>
      </div>
    </div>

  </div>

  <div class="right">
    <div class="imagen-header"></div>
  </div>

</div>
</template>

<style scoped>

.completo {
  width: 80%; /* Ajusta según el tamaño deseado */
  max-width: 400px; /* Evita que sea demasiado ancho en pantallas grandes */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; /* Centra el texto */
}

.header-container {
  width: 50%;
  position: fixed; /* Si quieres que siempre esté visible */
  top: 0;
  left: 0;
  background-color: #fff; /* Ajusta según tu diseño */
  display: flex;
  padding: 10px 0;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
}

header {
  width: 100%;
  max-width: 1200px; /* Ajusta según tu diseño */
  padding-left: 35px;
}

.left {
  width: 50vw; /* Ocupa exactamente la mitad izquierda de la pantalla */
  height: 100vh; /* Toda la altura de la pantalla */
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  position: absolute; /* Se mantiene en su posición */
  left: 0; /* Asegura que comience desde el borde izquierdo */
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

</style>