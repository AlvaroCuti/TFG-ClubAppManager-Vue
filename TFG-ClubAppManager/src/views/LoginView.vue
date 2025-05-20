<script setup>
import TextInput from '../components/TextInput.vue';
import PassInput from '../components/PassInput.vue';
import LogInButton from '../components/LogInButton.vue';
import HeaderSesion from '../components/HeaderSesion.vue';
import { RouterLink } from 'vue-router';
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
const toast = useToast()

const router = useRouter();

const tel = ref('');
const pass = ref('');
const auth = useAuthStore()

const logear = async () => {
  if (!tel.value || !pass.value) {
    toast.error("Por favor, completa todos los campos.");
    return;
  }
  try {
      const response = await fetch("http://localhost:8081/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tel: tel.value,
            pass: pass.value
        }),
      });

      if (response.ok) {
        const data = await response.json()
        
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('tel', data.tel)
        sessionStorage.setItem('nombre', data.nombre)
        sessionStorage.setItem('rol', data.rol)

        auth.setToken(data.token)
        auth.setTel(data.tel)
        auth.setNombre(data.nombre)
        auth.setRol(data.rol)

        const nomFormateado = auth.nombre.split(" ")[0];

        toast.success(`Inicio de sesion exitoso. Bienvenido ${nomFormateado}`)

        if (data.rol === 'ADMIN') {
          router.push('/app/jugadores');
        } else if (data.rol === 'JUGADOR') {
          router.push('/vistaJugador/jugador');
        } else if (data.rol === 'ENTRENADOR') {
          if(data.debeCambiarPass){
            router.push({ path: '/cambiarPass', query: { tel: data.tel } });
          }else{
            router.push('/vistaEntrenador/entrenador');
          }
        } else {
          console.warn('Rol no reconocido:', data.rol)
        }
      } else if(response.status == 401){
        toast.error(`Error al iniciar sesión. Credenciales inválidos`)
      }
      else{
        toast.error(`Error inesperado al iniciar sesión. Intenta más tarde`)
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
    <div class="pagina"> 
      <div class="titulo">
        <HeaderSesion msgPrincipal="Inicia Sesión" msgSecundario="Bienvenido a FutbolApp"></HeaderSesion>
      </div>

      <div class="credenciales">
        <TextInput v-model="tel"/>
        <PassInput v-model="pass"/>
      </div>

      <LogInButton @click="logear"/>

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
  width: 50%;  
  height: 100vh; 
  position: fixed;
  top: 0;
  right: 0;
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

.header-container {
  width: 50%;
  position: fixed;
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

@media (max-width: 768px) {
  .left {
    width: 100%;
    height: 100%;
    padding: 40px 20px;
  }

  .right {
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