<template>
  <div v-if="loading" :class="[styles.card, styles.load]">
    <SyncLoader color="#36d7b7" :class="styles.loader" />
  </div>
  <slot v-else />
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader';
import { randomState } from '@/utils';
import styles from './AppCard.module.css';

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
