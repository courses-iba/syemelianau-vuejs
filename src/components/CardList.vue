<template>
  <div class="list">
    <CardLoad v-for="{id, content, checked} in cards" :key="id">
      <AppCard
          :content="content"
          :checked="checked"
          :readonly="readonly"
          @edit="newContent => $emit('editCard', id, newContent)"
          @check="newCheck => $emit('checkCard', id, newCheck)"
      />
    </CardLoad>
  </div>
</template>

<script>
import AppCard from '@/components/AppCard/AppCard';
import CardLoad from '@/components/AppCard/CardLoad';

export default {
  components: {
    AppCard,
    CardLoad
  },
  props: {
    cards: {
      id: Number,
      content: {
        title: String,
        description: String
      },
      checked: [Number, null]
    },
    readonly: Boolean
  }
};
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
