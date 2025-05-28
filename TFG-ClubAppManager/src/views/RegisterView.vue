<script setup>
import HeaderSesion from '../components/HeaderSesion.vue';
import TextInput from '../components/TextInput.vue';
import PassInput from '../components/PassInput.vue';
import LogInButton from '../components/LogInButton.vue';
import ImagesDrop from '../components/ImagesDrop.vue';
import { ref } from "vue";
import TagTutor from '@/components/TagTutor.vue';
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const toast = useToast()
const currentIndex = ref(0); // Índice del paso actual
const steps = ref(3); // Número total de pasos
const router = useRouter();

const nombre = ref('');
const apellidos = ref('');
const email = ref('');
const telefono = ref('');
const fechaNacimiento = ref('');
const pass = ref('');
const repetirPass = ref('');  

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
  dniArchivos.value = archivos;
  dniFrontal.value = archivos[0] || null;
  dniTrasero.value = archivos[1] || null;
};

const handleDniFilesTutor1 = (archivos) => {
  dniArchivos1.value = archivos;
  dniFrontalTutor1.value = archivos[0] || null;
  dniTraseroTutor1.value = archivos[1] || null;
};

const handleDniFilesTutor2 = (archivos) => {
  dniArchivos2.value = archivos;
  dniFrontalTutor2.value = archivos[0] || null;
  dniTraseroTutor2.value = archivos[1] || null;
};

const validarCampos = () => {
  // Datos del usuario
  if (currentIndex.value === 0) {
    if (
      !nombre.value || 
      !apellidos.value || 
      !email.value || 
      !telefono.value || 
      !fechaNacimiento.value || 
      !pass.value || 
      !repetirPass.value
    ) {
      toast.error("Completa todos los campos.");
      return false;
    }
    if (pass.value !== repetirPass.value) {
      toast.error("Las contraseñas no coinciden.");
      return false;
    }
    if (!dniFrontal.value || !dniTrasero.value) {
      toast.error("Debes subir ambas fotos del DNI del usuario.");
      return false;
    }
  }

  // Tutor 1
  if (currentIndex.value === 1) {
    if (
      !emailTutor1.value || 
      !dniFrontalTutor1.value || 
      !dniTraseroTutor1.value
    ) {
      toast.error("Debes completar todos los campos del Tutor 1.");
      return false;
    }
  }

  // Tutor 2
  if (currentIndex.value === 2) {
    if (
      !emailTutor2.value || 
      !dniFrontalTutor2.value || 
      !dniTraseroTutor2.value
    ) {
      toast.error("Debes completar todos los campos del Tutor 2.");
      return false;
    }
  }

  return true;
};

const siguientePasoORegistrar = () => {
  if (!validarCampos()) return;

  if (currentIndex.value < steps.value - 1) {
    currentIndex.value++;
  } else {
    registrar();
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
    const response = await fetch(`${API_URL}/api/usuario/register`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast.success("Usuario registrado con éxito");
      router.push('/login');
    } else if(response.status == 400){
      toast.error("Error al registrar. Datos incompletos");
    }else {
      toast.error(`Error inesperado al registrar. Intenta más tarde`)
    }
  } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("No se pudo conectar al servidor. Revisa tu conexión.");
  }
};
</script>

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
                <div class="nombre adaptado" >
                  <TextInput v-model="nombre" placeholder="Nombre"></TextInput>
                  <TextInput v-model="apellidos" placeholder="Apellidos"></TextInput>
                </div>
                
                <div class="adaptado">
                  <TextInput v-model="email" placeholder="Correo electrónico"></TextInput>
                </div>
                <div class="adaptado">
                  <TextInput v-model="telefono" placeholder="Telefono"></TextInput>
                </div>

                <div class="adaptado">
                    <input 
                    v-model="fechaNacimiento" 
                    type="date" 
                    class="fecha" 
                    :style="{ color: fechaNacimiento ? '#000000' : 'grey' }" 
                  />
                </div>
                <div class="adaptado">
                  <PassInput v-model="pass"/>
                </div>
                <div class="adaptado">
                  <PassInput v-model="repetirPass" placeholder="Repite la contraseña"/>
                </div>
                 <div class="adaptado">
                  <PassInput v-model="repetirPass" placeholder="Repite la contraseña"/>
                 </div>
                <div class="drop adaptado">
                  <ImagesDrop  placeholder="Seleccione fotos del DNI por delante y por detrás" :maxFiles="2" @update:files="handleDniFilesUser"/>
                </div>
              </div>
             
            </div>

            <div class="parte">
              <div class="credenciales">
                <div class="tutor adaptado">
                  <TagTutor placeholder="Tutor 1"></TagTutor>  
                </div>
                <div class="adaptado">
                  <TextInput v-model="emailTutor1" placeholder="Correo electrónico tutor 1"></TextInput>
                </div>
                <div class="drop adaptado">
                  <ImagesDrop placeholder="Seleccione fotos del DNI por delante y por detrás" :maxFiles="2" @update:files="handleDniFilesTutor1"/>
                </div>
              </div>
            </div>

            <div class="parte">
              <div class="credenciales">
                <div class="tutor adaptado">
                  <TagTutor placeholder="Tutor 2"></TagTutor>  
                </div>

                <div class="adaptado">
                  <TextInput v-model="emailTutor2" placeholder="Correo electrónico tutor 2"></TextInput>
                </div>
                <div class="drop adaptado">
                  <ImagesDrop placeholder="Seleccione fotos del DNI por delante y por detrás" :maxFiles="2" @update:files="handleDniFilesTutor2"/>
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

.drop {
  margin-top: 20px;
  max-width: 410px; /* o el ancho deseado */
  width: 100%;
}

.boton{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.boton-login{
  width: 100%;
  max-width: 410px;
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
  position: fixed;
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
  gap: 25px; 
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

.fecha{
  padding: 8px 16px;
  border-radius: 8px;
  width: 100%;
  background-color: #E1E0E7;
  border: 0;
}

input:focus{
  outline: none;
  border: none; 
}

@media (max-width: 768px) {
  .boton-login{
    width: 100%;
    max-width: 365px;
    display: flex;
    justify-content: center;
  }
  
  .nombre {
    flex-direction: column;
    row-gap: 12px;
  }

  .adaptado{
        padding: 0 25px;
  }

  .right {
    width: 100%;
    height: 100%;
    padding: 40px 20px;
  }

  .left {
    display: none;
  }

  .header-container {
    width: 100%;
    position: fixed;
    padding: 10px 20px;
  }

  header {
    padding-left: 0;
    display: flex;
    justify-content: center;
  }

  .pagina {
    gap: 30px;
  }

  .credenciales {
    gap: 12px;
  }

  .register {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .register h5, .register a {
    padding: 0;
  }
}
</style>