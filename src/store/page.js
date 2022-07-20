import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const usePageStore = defineStore('page', {
  state: () => ({
    readonly: useStorage('readonly', false),
    credentials: { email: '', password: '' },
    iSize: { fontSize: '24px' },
    loader: '#36d7b7',
  }),
  getters: {
    iDefault: state => ({ ...state.iSize, color: '#586069' }),
    iAction: state => ({ ...state.iSize, color: '#1675e0' }),
  },
  actions: {
    handleReadonly() {
      this.readonly = !this.readonly
    },
  },
})
