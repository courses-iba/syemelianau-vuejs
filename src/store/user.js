import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const admin = {
  email: 'testAdmin@gmail.com',
  password: '12345yuiopp',
}

export const useUserStore = defineStore('user', {
  state: () => ({
    email: useStorage('email', ''),
    password: useStorage('password', ''),
    role: useStorage('role', ''),
  }),
  actions: {
    login(payload) {
      const role = JSON.stringify(admin) === JSON.stringify(payload)
      this.email = payload.email
      this.password = payload.password
      this.role = role ? 'admin' : 'user'
    },
    logout() {
      this.email = ''
      this.password = ''
      this.role = ''
    },
  },
})
