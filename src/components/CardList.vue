<template>
  <div class="list">
    <GridLoader v-if="loading" :color="loader" :class="styles.loader" />
    <span v-else-if="error" class="empty">{{ error }}</span>
    <span v-else-if="isEmpty" class="empty">{{ placeholder }}</span>
    <CardLoad v-else v-for="card in cards" :key="card.id">
      <AppCard v-bind="card" />
    </CardLoad>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import GridLoader from 'vue-spinner/src/GridLoader';

import AppCard from '@/components/AppCard/AppCard';
import CardLoad from '@/components/AppCard/CardLoad';
import styles from '@/components/AppCard/AppCard.module.css';

export default {
  components: {
    GridLoader,
    AppCard,
    CardLoad
  },
  data() {
    return {
      styles
    };
  },
  props: {
    placeholder: String
  },
  computed: {
    ...mapState(['cards', 'loading', 'error', 'loader']),
    isEmpty() {
      return !this.$store.getters.cardsCount;
    }
  },
  methods: mapActions(['getCards']),
  mounted() {
    this.getCards();
  }
};
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
