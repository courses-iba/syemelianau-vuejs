<template>
  <nav class="menu">
    <slot />
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.menu {
  display: flex;
  padding: 1vh 2vw;
  border-bottom: 1px solid #e1e4e8;

  -webkit-box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
  -moz-box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
  box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
}
</style>