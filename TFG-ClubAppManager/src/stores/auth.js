import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem('token') || '',
    tel: sessionStorage.getItem('tel') || '',
    nombre: sessionStorage.getItem('nombre') || '',
    rol: sessionStorage.getItem('rol') || '',
  }),
  actions: {
    setToken(token) {
      this.token = token
      sessionStorage.setItem('token', token)
    },
    setTel(tel) {
      this.tel = tel
      sessionStorage.setItem('tel', tel)
    },
    setNombre(nombre) {
      this.nombre = nombre
      sessionStorage.setItem('nombre', nombre)
    },
    setRol(rol) {
      this.rol = rol
      sessionStorage.setItem('rol', rol)
    },
    logout() {
      this.token = ''
      this.tel = ''
      this.nombre = ''
      this.rol = ''
      sessionStorage.clear()
    }
  }
})
