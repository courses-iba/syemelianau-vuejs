<template>
  <div class="page">
    <div class="card">
      <AppCheckbox name="Readonly" :checked="pageStore.readonly" @change="pageStore.handleReadonly" />
    </div>
  </div>
</template>

<script>
import AppCheckbox from '@/components/AppCheckbox'
import { usePageStore } from '@/store/page'

export default {
  components: {
    AppCheckbox,
  },
  setup() {
    const pageStore = usePageStore()

    return {
      pageStore,
    }
  },
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 10vh;
}

.page * {
  color: #586069;
}

.card {
  padding: 3vh 10vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  transition: 0.3s;
}
</style>
