<template>
  <div class="content">
    <CardList placeholder="Cards not found" />
  </div>
</template>

<script>
import CardList from '@/components/CardList';

export default {
  components: {
    CardList
  }
};
</script>

<style scoped>
.content {
  margin: 5vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
