// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    tel: '',
    nombre: '',
    rol:'',
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setTel(tel) {
      this.tel = tel;
    },
    setNombre(nombre) {
      this.nombre = nombre;
    },
    setRol(rol) {
      this.rol = rol;
    },
    clearToken() {
      this.token = ''
    }
  }
})
