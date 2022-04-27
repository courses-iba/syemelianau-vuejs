<template>
  <div class="card" :class="this.cardColor" @click="this.toggleColor">
    <div class="header">{{ this.title }}</div>
    <AppDivider />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import AppDivider from '@/components/AppDivider';

export default {
  components: {
    AppDivider
  },
  data() {
    return {
      color: null
    };
  },
  props: {
    title: String
  },
  computed: {
    cardColor() {
      return `card${this.color}`;
    }
  },
  methods: {
    randomColor() {
      return Math.floor(Math.random() * 5) + 1;
    },
    toggleColor() {
      this.color = this.color ? null : this.randomColor();
    }
  }
};
</script>

<style scoped>
.card {
  padding: 1vh;
  margin: 1vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  width: 10vw;
  min-width: 10em;
  max-width: 20em;
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.card:active {
  transition: none;
  background-color: #f1f8ff;
  border-color: #c8e1ff;
}

.header {
  font-weight: bold;
}

.header, .content {
  padding: 0 5%;
}

.card1 {
  background-color: #f1f8ff;
  border-color: #c8e1ff;
}

.card2 {
  background-color: #f0fff4;
  border-color: #bef5cb;
}

.card3 {
  background-color: #fffdef;
  border-color: #fff5b1;
}

.card4 {
  background-color: #fff8f2;
  border-color: #ffd1ac;
}

.card5 {
  background-color: #f5f0ff;
  border-color: #d1bcf9;
}
</style>
