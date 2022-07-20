<template>
  <div v-if="loading" :class="[styles.card, styles.load]">
    <SyncLoader :color="pageStore.loader" :class="styles.loader" />
  </div>
  <slot v-else />
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader'

import { randomState } from '@/utils'
import styles from '@/components/AppCard/AppCard.module.css'
import { usePageStore } from '@/store/page'

export default {
  components: {
    SyncLoader,
  },
  setup() {
    const pageStore = usePageStore()

    return {
      pageStore,
    }
  },
  data() {
    return {
      styles,
      loading: true,
      timeout: null,
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.loading = false
    }, randomState() * 1000)
  },
  unmounted() {
    clearTimeout(this.timeout)
  },
}
</script>

<style scoped></style>
