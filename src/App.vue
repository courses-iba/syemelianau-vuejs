<template>
  <div class="app">
    <AppHeader title="Vue App" />
    <AppMenu>
      <AppCheckbox
          name="Readonly"
          :checked="this.readonly"
          @change="this.toggleReadonly"
      />
    </AppMenu>
    <AppContent>
      <AppCard
          v-for="{id, content} in this.mockCards"
          :key="id"
          :content="content"
          :readonly="this.readonly"
          @edit="newContent => this.editCard(id, newContent)"
      />
    </AppContent>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppContent from '@/components/AppContent';
import AppCard from '@/components/AppCard';
import AppMenu from '@/components/AppMenu';
import AppCheckbox from '@/components/AppCheckbox';

export default {
  name: 'App',
  components: {
    AppCheckbox,
    AppMenu,
    AppHeader,
    AppContent,
    AppCard
  },
  data() {
    return {
      readonly: false,
      mockCards: [...Array(18).keys()].map((value, index) => ({
        id: index,
        content: {
          title: `Card Title ${value}`,
          description: `
            ${value}.
            Some quick example text
            to build on the card title
            and make up the bulk of the card's content.
          `.replace(/\s+/g, ' ').trim()
        }
      }))
    };
  },
  methods: {
    editCard(id, newContent) {
      this.mockCards = this.mockCards.map(value => value.id === id ? { id, content: newContent } : value);
    },
    toggleReadonly() {
      this.readonly = !this.readonly;
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
