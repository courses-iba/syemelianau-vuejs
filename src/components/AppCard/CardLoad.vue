<template>
  <div v-if="loading" :class="[styles.card, styles.load]">
    <SyncLoader :color="loader" :class="styles.loader" />
  </div>
  <slot v-else />
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader';

import { randomState } from '@/utils';
import styles from '@/components/AppCard/AppCard.module.css';
import { mapState } from 'vuex';

export default {
  components: {
    SyncLoader
  },
  data() {
    return {
      styles,
      loading: true,
      timeout: null
    };
  },
  computed: mapState(['loader']),
  mounted() {
    this.timeout = setTimeout(() => {
      this.loading = false;
    }, randomState() * 1000);
  },
  unmounted() {
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped></style>
