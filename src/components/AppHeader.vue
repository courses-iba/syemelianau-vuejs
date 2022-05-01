<template>
  <header class="header">{{ this.title }}</header>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style scoped>
.header {
  height: 6vh;
  min-height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  font-weight: bold;
  border-bottom: 1px solid #e1e4e8;
}
</style>
