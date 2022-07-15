<template>
  <div class="list">
    <span v-if="isEmpty" class="empty">{{ placeholder }}</span>
    <CardLoad v-else v-for="card in cards" :key="card.id">
      <AppCard v-bind="card" />
    </CardLoad>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppCard from '@/components/AppCard/AppCard';
import CardLoad from '@/components/AppCard/CardLoad';

export default {
  components: {
    AppCard,
    CardLoad
  },
  props: {
    placeholder: String
  },
  computed: {
    ...mapState(['cards']),
    isEmpty() {
      return !this.$store.getters.cardsCount;
    }
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
