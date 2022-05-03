<template>
  <div class="app">
    <AppHeader title="Vue App" />
    <AppMenu>
      <AppCheckbox
          name="Readonly"
          :checked="readonly"
          @change="handleReadonly"
      />
      <button :class="iButton" @click="handleAdd">
        <Plus :style="iconStyle" />
      </button>
      <button :class="iButton" @click="handleDelete">
        <Delete :style="iconStyle" />
      </button>
    </AppMenu>
    <AppContent>
      <CardList
          v-if="cards.length"
          :cards="cards"
          :readonly="readonly"
          @editCard="handleEdit"
          @checkCard="handleCheck"
      />
      <span v-else class="empty">Cards not found</span>
    </AppContent>
  </div>
</template>

<script>
import { Delete, Plus } from 'mdue';
import { v4 as uuid } from 'uuid';
import AppHeader from '@/containers/AppHeader';
import AppContent from '@/containers/AppContent';
import CardList from '@/components/CardList';
import AppMenu from '@/containers/AppMenu';
import AppCheckbox from '@/components/AppCheckbox';
import { iButton } from './styles/AppButton.module.css';

export default {
  name: 'App',
  components: {
    Delete,
    Plus,
    AppCheckbox,
    AppMenu,
    AppHeader,
    AppContent,
    CardList
  },
  data() {
    return {
      iButton,
      readonly: false,
      iconStyle: { color: '#1675e0', fontSize: '24px' },
      cards: [...Array(18).keys()].map(value => ({
        id: uuid(),
        content: {
          title: `Card Title ${value}`,
          description: `
            ${value}.
            Some quick example text
            to build on the card title
            and make up the bulk of the card's content.
          `.replace(/\s+/g, ' ').trim()
        },
        checked: null
      }))
    };
  },
  methods: {
    handleReadonly() {
      this.readonly = !this.readonly;
    },
    handleEdit(id, content) {
      this.cards = this.cards.map(card => card.id === id ? { ...card, content } : card);
    },
    handleCheck(id, checked) {
      this.cards = this.cards.map(card => card.id === id ? { ...card, checked } : card);
    },
    handleDelete() {
      this.cards = this.cards.filter(({ checked }) => !checked);
    },
    handleAdd() {
      this.cards = [...this.cards, {
        id: uuid(),
        content: {
          title: 'Edit me!',
          description: 'Me too :)'
        },
        checked: Math.floor(Math.random() * 5) + 1
      }];
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

.empty {
  color: red;
  text-align: center;
}
</style>
