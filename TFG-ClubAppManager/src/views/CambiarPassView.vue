<script setup>
import PassInput from '../components/PassInput.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter();
const route = useRoute();
const tel = route.query.tel;
const auth = useAuthStore()
const oldPassword = ref('')
const newPassword = ref('')

const handleSave = async () => {
    if (!oldPassword.value || !newPassword.value) {
    alert('Ambas contraseñas son obligatorias.')
    return
  }

  try {
      const response = await fetch(`http://localhost:8081/api/usuario/${tel}/pass`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({
            oldPass: oldPassword.value,
            newPass: newPassword.value
        }),
      });

      if (response.ok) {
        router.push('/vistaEntrenador/entrenador');
      } else {
        toast.error(`Error al iniciar sesión. Credenciales inválidos`)
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
}

function handleCancel() {
  oldPassword.value = ''
  newPassword.value = ''
}
</script>

<template>
  <div class="overlay">
    <div class="modal">
      <h2>Cambia la contraseña</h2>

      <div class="fields">
        <PassInput placeholder="Contraseña anterior" v-model="oldPassword" />
        <PassInput placeholder="Contraseña nueva" v-model="newPassword" />
      </div>

      <div class="actions">
        <button class="btn primary" @click="handleSave">Aceptar</button>
        <button class="btn secondary" @click="handleCancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #6543e075;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  width: 90%;
  max-width: 400px;
}

.modal > h2{
    color: black;
    font-size: x-large;
    font-weight: 500;
}

.fields {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.actions {
  display: flex;
  gap: 15px;
}

.btn {
  border: none;
  border-radius: 7px;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.primary {
  background-color: #6543e0;
  color: #f6f5f8;
}

.secondary {
  background-color: gray;
  color: #f6f5f8;
}
</style>
