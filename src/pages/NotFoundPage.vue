<template>
  <div class="page">
    <span class="code">404</span>
    <span class="message">Page not found</span>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.page {
  padding: 2vh 2vw;
  margin: 2vh 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff8f2;
  border: 1px solid #ffd1ac;
  border-radius: 6px;
  transition: 0.3s;
}

.page:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.page * {
  color: #ffd1ac;
}

.code {
  font-size: 3em;
  font-weight: bold;
}

.message {
  font-size: 2em;
}
</style>
