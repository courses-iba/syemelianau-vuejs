<template>
  <nav class="nav">
    <div v-show="userStore.role && (!pageStore.readonly || userStore.role === 'admin')" class="panel">
      <AppCheckbox
        v-show="userStore.role === 'admin'" name="Readonly"
        :checked="pageStore.readonly"
        @change="pageStore.handleReadonly"
      />
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
        v-show="isSettings(link)"
        :key="title"
        :to="link"
        :class="{active: link === active}"
        @click="() => handleClick(link)"
      >
        {{ isLoggedIn(link) ? 'Logout' : title }}
      </RouterLink>
    </div>
  </nav>
</template>

<script>
import { Delete, Plus } from 'mdue'

import AppCheckbox from '@/components/AppCheckbox'
import { iButton } from '@/styles/AppButton.module.css'
import { usePageStore } from '@/store/page'
import { useCardStore } from '@/store/card'
import { useUserStore } from '@/store/user'

export default {
  components: {
    AppCheckbox,
    Delete,
    Plus,
  },
  setup() {
    const cardStore = useCardStore()
    const pageStore = usePageStore()
    const userStore = useUserStore()

    return {
      cardStore,
      pageStore,
      userStore,
    }
  },
  data() {
    return {
      iButton,
      active: this.$route.path,
      routes: [
        { link: '/', title: 'Home' },
        { link: '/settings', title: 'Settings' },
        { link: '/login', title: 'Login' },
      ],
    }
  },
  methods: {
    isLoggedIn(link) {
      return this.userStore.role && link === '/login'
    },
    isSettings(link) {
      return !(this.userStore.role !== 'admin' && link === '/settings')
    },
    handleClick(link) {
      this.active = link
      this.isLoggedIn(link) && this.userStore.logout()

    },
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
  justify-content: center;
  border-bottom: 1px solid #e1e4e8;

  -webkit-box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
  -moz-box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
  box-shadow: 0 4px 2px -2px rgba(41, 41, 41, .25);
}

.nav > * {
  flex: 1;
}

.menu, .panel {
  display: flex;
  justify-content: center;
  align-items: center;
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
