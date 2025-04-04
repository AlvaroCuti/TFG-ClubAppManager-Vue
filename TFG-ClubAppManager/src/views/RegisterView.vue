<script setup>
import HeaderSesion from '../components/HeaderSesion.vue';
import TextInput from '../components/TextInput.vue';
import PassInput from '../components/PassInput.vue';
import LogInButton from '../components/LogInButton.vue';
import ImagesDrop from '../components/ImagesDrop.vue';
</script>

<!-- src/views/RegisterForm.vue -->
<template>
  <div class="header-container">
      <header>
        <img alt="logo" class="logo" src="@/assets/LogoFinal.png" width="50" height="50" />
      </header>
  </div>
  
  <div class="completo"> 
    
    <div class="left">
      <div class="imagen-header"></div>
    </div>

    <div class="right"> 
      <div class="pagina"> 
        <div class="titulo">
          <HeaderSesion msgPrincipal="Registro"></HeaderSesion>
          <div class="inicio">
            <h5>¿Ya tienes una cuenta?</h5>
            <RouterLink to="/login">Inicia sesión</RouterLink>
          </div>
        </div>

        <div class="credenciales">
          <div class="nombre">
            <TextInput placeholder="Nombre"></TextInput>
            <TextInput placeholder="Apellidos"></TextInput>
          </div>
          
          <TextInput placeholder="Correo electrónico"></TextInput>
          <TextInput placeholder="Telefono"></TextInput>
          <TextInput placeholder="Fecha de nacimiento"></TextInput>
          <PassInput/>
          <PassInput/>
        </div>

        <ImagesDrop></ImagesDrop>

        <div class="dots">
            <span 
                v-for="(item, index) in items" 
                :key="index" 
                class="dot" 
                :class="{ active: index === currentIndex }"
                @click="currentIndex = index"
            ></span>
        </div>

        <LogInButton/>

      </div>
    </div>

  </div>
</template>

<style scoped>

.left {
  width: 50%;  
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagen-header {
  width: 100%;
  height: 100%; 
  background-image: url('@/assets/fondo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.right{
  background-color: #F6F5F8;
  position: fixed;
  width: 50%;
  height: 100%;
  right: 0px;
  top: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.header-container {
  width: 50%;
  position: fixed; /* Si quieres que siempre esté visible */
  top: 0;
  right: 0;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end; 
  padding: 15px 10px;
}

header {
  padding-right: 35px;
}

.pagina{
  display: flex;
  flex-direction: column; 
  gap: 53px; 
}

.titulo{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inicio{
  display: flex;
  flex-direction: row;
  
}

.inicio h5{
  padding: 5px;
  color: #878492;
}

.inicio a{
  color: #6543E0;  
}

.nombre{
  display: flex;
  flex-direction: row;
  column-gap: 16px;
}

.credenciales{
  display: flex;
  flex-direction: column;
  gap: 16px;
}

</style>