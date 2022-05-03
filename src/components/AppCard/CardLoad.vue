<template>
  <div v-if="loading" :class="[styles.card, styles.load]">
    <SyncLoader color="#36d7b7" :class="styles.loader" />
  </div>
  <slot v-else />
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader';
import styles from './AppCard.module.css';

export default {
  components: {
    SyncLoader
  },
  data() {
    return {
      styles,
      loading: true
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, Math.floor(Math.random() * 3000));
  }
};
</script>

<style scoped></style>
