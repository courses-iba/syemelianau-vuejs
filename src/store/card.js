import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { v4 as uuid } from 'uuid'

import { getPokemon } from '@/services/pokemon.service'
import { randomState } from '@/utils'

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: useStorage('cards', []),
    loading: false,
    error: null,
  }),
  getters: {
    cardsCount: state => state.cards.length,
  },
  actions: {
    getCards() {
      this.loading = true
      getPokemon().then(response => {
        this.cards = response.data.slice(0, 15).map(pokemon => ({
          id: pokemon['Number'],
          content: {
            title: pokemon['Name'],
            description: pokemon['About'],
          },
          checked: null,
        }))
        this.loading = false
      }).catch(reason => {
        this.error = reason.message
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },
    handleAdd() {
      this.cards.push({
        id: uuid(),
        content: {
          title: 'Edit me!',
          description: 'Me too :)',
        },
        checked: randomState(),
      })
    },
    handleChange(payload) {
      this.cards = this.cards.map(card => card.id === payload.id ? payload : card)
    },
    handleDelete() {
      this.cards = this.cards.filter(({ checked }) => !checked)
    },
  },
})
