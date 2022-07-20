<template>
  <div class="list">
    <GridLoader v-if="cardStore.loading" :color="pageStore.loader" :class="styles.loader" />
    <span v-else-if="cardStore.error" class="empty">{{ cardStore.error }}</span>
    <span v-else-if="isEmpty" class="empty">{{ placeholder }}</span>
    <CardLoad v-else v-for="card in cardStore.cards" :key="card.id">
      <AppCard v-bind="card" />
    </CardLoad>
  </div>
</template>

<script>
import GridLoader from 'vue-spinner/src/GridLoader'

import AppCard from '@/components/AppCard/AppCard'
import CardLoad from '@/components/AppCard/CardLoad'
import styles from '@/components/AppCard/AppCard.module.css'
import { useCardStore } from '@/store/card'
import { usePageStore } from '@/store/page'

export default {
  components: {
    GridLoader,
    AppCard,
    CardLoad,
  },
  setup() {
    const cardStore = useCardStore()
    const pageStore = usePageStore()

    return {
      cardStore,
      pageStore,
    }
  },
  data() {
    return {
      styles,
    }
  },
  props: {
    placeholder: String,
  },
  computed: {
    isEmpty() {
      return !this.cardStore.cardsCount
    },
  },
  mounted() {
    this.isEmpty && this.cardStore.getCards()
  },
}
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.empty {
  color: red;
  text-align: center;
}
</style>
