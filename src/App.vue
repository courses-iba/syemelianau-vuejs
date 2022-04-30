<template>
  <div class="app">
    <AppHeader title="Vue App" />
    <AppContent>
      <AppCard
          v-for="{id, title, content} in cards"
          :key="id"
          :title="title"
          :content="content"
          @edit="card => this.editCard(id, card)"
      />
    </AppContent>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppContent from '@/components/AppContent';
import AppCard from '@/components/AppCard';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppContent,
    AppCard
  },
  data() {
    return {
      cards: [...Array(18).keys()].map((value, index) => ({
        id: index,
        title: `Card Title ${value}`,
        content: `
            ${value}.
            Some quick example text
            to build on the card title
            and make up the bulk of the card's content.
        `.replace(/\s+/g, ' ').trim()
      }))
    };
  },
  methods: {
    editCard(id, card) {
      this.cards = this.cards.map(value => value.id === id ? { id, ...card } : value);
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.app {
  display: flex;
  flex-direction: column;
}
</style>
