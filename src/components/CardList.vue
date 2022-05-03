<template>
  <div class="list">
    <AppCard
        v-for="{id, content, checked} in cards"
        :key="id"
        :content="content"
        :checked="checked"
        :readonly="readonly"
        @edit="newContent => $emit('editCard', id, newContent)"
        @check="newCheck => $emit('checkCard', id, newCheck)"
    />
  </div>
</template>

<script>
import AppCard from '@/components/AppCard/AppCard';

export default {
  components: {
    AppCard
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
