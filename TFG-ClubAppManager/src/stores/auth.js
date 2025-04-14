// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    clearToken() {
      this.token = ''
    }
  }
})
