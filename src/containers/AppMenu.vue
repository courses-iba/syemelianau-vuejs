<template>
  <nav class="nav">
    <div :style="{display: 'flex'}">
      <AppCheckbox name="Readonly" :checked="pageStore.readonly" @change="pageStore.handleReadonly" />
      <button :class="iButton" @click="cardStore.handleAdd">
        <Plus :style="pageStore.iAction" />
      </button>
      <button :class="iButton" @click="cardStore.handleDelete">
        <Delete :style="pageStore.iAction" />
      </button>
    </div>
    <div class="menu">
      <RouterLink
        v-for="{link, title} in routes"
        :key="title"
        :to="link"
        :class="{active: link === active}"
        @click="this.active = link"
      >
        {{ title }}
      </RouterLink>
    </div>
    <span />
  </nav>
</template>

<script>
import { Delete, Plus } from 'mdue'

import AppCheckbox from '@/components/AppCheckbox'
import { iButton } from '@/styles/AppButton.module.css'
import { usePageStore } from '@/store/page'
import { useCardStore } from '@/store/card'

export default {
  components: {
    AppCheckbox,
    Delete,
    Plus,
  },
  setup() {
    const cardStore = useCardStore()
    const pageStore = usePageStore()

    return {
      cardStore,
      pageStore,
    }
  },
  data() {
    return {
      iButton,
      active: this.$route.path,
      routes: [
        { link: '/', title: 'Home' },
        { link: '/login', title: 'Login' },
      ],
    }
  },
  mounted() {
    this.$watch(() => this.$route.path, toPath => {
      this.active = toPath
    })
  },
}
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 2vw;
  border-bottom: 1px solid #e1e4e8;

  -webkit-box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
  -moz-box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
  box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
}

.menu * {
  text-decoration: none;
  padding: 2vh 2vw;
}

.menu *:hover {
  color: #36d7b7;
  border-bottom: 2px solid #36d7b7;
}

.active {
  color: #1675e0;
  border-bottom: 2px solid #1675e0;
  font-weight: bold;
}

.menu *:active {
  background-color: rgba(0, 0, 0, .1);
}
</style>
