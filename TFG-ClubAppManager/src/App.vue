<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import TextInput from './components/TextInput.vue';
import PassInput from './components/PassInput.vue';
import LogInButton from './components/LogInButton.vue';
import HeaderSesion from './components/HeaderSesion.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
  </header>
  
  <div class="login">
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

    <div class="imagen"></div>
  </div>
  
</template>

<style scoped>

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  justify-content: flex-start;
  padding: 64px
}

.login{
  margin-top: 200px; 
  display: flex;
  flex-direction: row;
  width: 100vh;
  align-items: stretch;
}

.pagina {
  flex: 1; /* Ocupará la mitad de la pantalla */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Centra el contenido */
  gap: 32px; /* Espaciado */
  padding: 40px;
}

.imagen {
  flex: 1; /* Ocupará la otra mitad de la pantalla */
  background: url('https://th.bing.com/th/id/OIP.XBntIOuDOSjJKknK5Qj74QHaE8?rs=1&pid=ImgDetMain') no-repeat center center;
  background-size: cover;
}

.pagina{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 64px;
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

.imagen{
  flex: 1;
  background: url('https://th.bing.com/th/id/OIP.XBntIOuDOSjJKknK5Qj74QHaE8?rs=1&pid=ImgDetMain') no-repeat center center;
  background-size: cover;
}

</style>