// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    tel: ''
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setTel(tel) {
      this.tel = tel;
    },
    clearToken() {
      this.token = ''
    }
  }
})
