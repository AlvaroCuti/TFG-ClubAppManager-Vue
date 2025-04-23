<script setup>
import HeaderSesion from '../components/HeaderSesion.vue';
import TextInput from '../components/TextInput.vue';
import PassInput from '../components/PassInput.vue';
import LogInButton from '../components/LogInButton.vue';
import ImagesDrop from '../components/ImagesDrop.vue';
import { ref } from "vue";
import TagTutor from '@/components/TagTutor.vue';

const currentIndex = ref(0); // Índice del paso actual
const steps = ref(3); // Número total de pasos

const nombre = ref('');
const apellidos = ref('');
const email = ref('');
const telefono = ref('');
const fechaNacimiento = ref('');
const pass = ref('');
// const repetirPass = ref('');

const emailTutor1 = ref('');
const emailTutor2 = ref('');

const dniFrontal = ref(null);
const dniTrasero = ref(null);
const dniFrontalTutor1 = ref(null);
const dniTraseroTutor1 = ref(null);
const dniFrontalTutor2 = ref(null);
const dniTraseroTutor2 = ref(null);

const dniArchivos = ref([]);
const dniArchivos1 = ref([]);
const dniArchivos2 = ref([]);

const handleDniFilesUser = (archivos) => {
  // Puedes guardarlos directamente en un ref, o separar si necesitas frontal/trasero
  dniArchivos.value = archivos;
  // O, si solo esperas uno por input:
  dniFrontal.value = archivos[0] || null;
  dniTrasero.value = archivos[1] || null;
};

const handleDniFilesTutor1 = (archivos) => {
  // Puedes guardarlos directamente en un ref, o separar si necesitas frontal/trasero
  dniArchivos1.value = archivos;
  // O, si solo esperas uno por input:
  dniFrontalTutor1.value = archivos[0] || null;
  dniTraseroTutor1.value = archivos[1] || null;
};

const handleDniFilesTutor2 = (archivos) => {
  // Puedes guardarlos directamente en un ref, o separar si necesitas frontal/trasero
  dniArchivos2.value = archivos;
  // O, si solo esperas uno por input:
  dniFrontalTutor2.value = archivos[0] || null;
  dniTraseroTutor2.value = archivos[1] || null;
};

const siguientePasoORegistrar = () => {
  if (currentIndex.value < steps.value - 1) {
    currentIndex.value++;
  } else {
    registrar(); // último paso, ahora sí registramos
  }
};

const registrar = async () => {
  const creacionDTO = {
    nombre: nombre.value.concat(" ", apellidos.value),
    email: email.value,
    tel: telefono.value,
    fechaNac: fechaNacimiento.value,
    pass: pass.value,
    emailTutor1: emailTutor1.value,
    emailTutor2: emailTutor2.value,
  };

  const formData = new FormData();
  formData.append("creacionDTOString", JSON.stringify(creacionDTO));
  formData.append("dniFrontal", dniFrontal.value);
  formData.append("dniTrasero", dniTrasero.value);
  formData.append("dniFrontalTutor1", dniFrontalTutor1.value);
  formData.append("dniTraseroTutor1", dniTraseroTutor1.value);
  formData.append("dniFrontalTutor2", dniFrontalTutor2.value);
  formData.append("dniTraseroTutor2", dniTraseroTutor2.value);

  try {
    const response = await fetch("http://localhost:8081/api/usuario/register", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Usuario registrado correctamente");
      // Redirige o muestra mensaje
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

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
            <RouterLink to="/login" class="link">Inicia sesión</RouterLink>
          </div>
        </div>
        <div class="carousel-container">
          <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="parte">
              <div class="credenciales">
                <div class="nombre">
                  <TextInput v-model="nombre" placeholder="Nombre"></TextInput>
                  <TextInput v-model="apellidos" placeholder="Apellidos"></TextInput>
                </div>
                
                <TextInput v-model="email" placeholder="Correo electrónico"></TextInput>
                <TextInput v-model="telefono" placeholder="Telefono"></TextInput>
                <input v-model="fechaNacimiento" placeholder="Fecha de nacimiento" type="date" />
                <PassInput v-model="pass"/>
                <PassInput placeholder="Repite la contraseña"/>
                <div class="drop">
                  <ImagesDrop @update:files="handleDniFilesUser"/>
                </div>
              </div>
             
            </div>

            <div class="parte">
              <div class="credenciales">
                <div class="tutor">
                  <TagTutor placeholder="Tutor 1"></TagTutor>  
                </div>
                
                <TextInput v-model="emailTutor1" placeholder="Correo electrónico tutor 1"></TextInput>
                <div class="drop">
                  <ImagesDrop @update:files="handleDniFilesTutor1"/>
                </div>
              </div>
            </div>

            <div class="parte">
              <div class="credenciales">
                <div class="tutor">
                  <TagTutor placeholder="Tutor 2"></TagTutor>  
                </div>

                <TextInput v-model="emailTutor2" placeholder="Correo electrónico tutor 2"></TextInput>
                
                <div class="drop">
                  <ImagesDrop  @update:files="handleDniFilesTutor2"/>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div class="dots">
          <span v-for="(step, index) in steps" :key="index" 
            class="dot" 
            :class="{ active: index === currentIndex }" 
            @click="currentIndex = index">
          </span>
        </div>
        <div class="boton">
          <LogInButton 
            @click="siguientePasoORegistrar" 
            class="boton-login" 
            :placeholder="currentIndex === steps - 1 ? 'Registrarse' : 'Siguiente'" 
          />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

.tutor{
  display: flex;
  margin-bottom: 10px;
}

.link{
  text-decoration: underline;
  text-underline-offset: 2px;
}

.drop{
  margin-top: 20px;

}

.boton{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.boton-login{
  width: 100%; /* se adapta al contenedor padre */
  max-width: 410px; /* igual que .credenciales si es fijo */
}

.carousel-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel {
  display: flex;
  width: 300%;
  transition: transform 0.4s ease-in-out;
}

.parte {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  text-align: center;
  gap: 53px;
}

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
  justify-content: center;
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

.dots {
  display: flex;
  justify-content: center;
  margin-top: -10px;
  margin-bottom: -10px;
}

.dot {
  width: 10px;
  height: 10px;
  margin: 5px;
  background: gray;
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background: #6543E0;
}

</style>