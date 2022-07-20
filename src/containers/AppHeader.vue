<template>
  <header class="header">
    <span class="title">
      {{ (userStore.email && `Hello, ${userStore.role === 'admin' ? 'Admin' : userStore.email}!`) || title }}
    </span>
    <div class="badge">{{ cardStore.cardsCount }}</div>
  </header>
</template>

<script>
import { useCardStore } from '@/store/card'
import { useUserStore } from '@/store/user'

export default {
  props: {
    title: String,
  },
  setup() {
    const cardStore = useCardStore()
    const userStore = useUserStore()

    return {
      cardStore,
      userStore,
    }
  },
}
</script>

<style scoped>
.header {
  height: 6vh;
  min-height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e1e4e8;
}

.title {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 2em;
  font-weight: bold;
}

.badge {
  margin-right: 2vw;
  padding: 0 1vw;
  background: red;
  color: white;
  border-radius: 3em;
}
</style>
