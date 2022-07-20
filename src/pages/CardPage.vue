<template>
  <div class="page">
    <AppCard v-if="card" v-bind="card" />
    <ScaleLoader v-else :color="pageStore.loader" :class="styles.loader" />
  </div>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader'

import AppCard from '@/components/AppCard/AppCard'
import styles from '@/components/AppCard/AppCard.module.css'
import { useCardStore } from '@/store/card'
import { usePageStore } from '@/store/page'

export default {
  components: {
    AppCard,
    ScaleLoader,
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
  computed: {
    card() {
      return this.cardStore.cards.find(card => card.id === this.$route.params.id)
    },
  },
  mounted() {
    if (!this.card) {
      this.$router.push({
        name: 'NotFound',
        params: { pathMatch: this.$route.path.substring(1).split('/') },
      })
    }
  },
}
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh;
}
</style>
