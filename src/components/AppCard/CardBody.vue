<template>
  <div v-if="!readonly && isEdit" :class="styles.body">
    <textarea
        :class="styles.input"
        :style="{height: height}"
        :value="newDescription"
        @input="changeContent"
    />
  </div>
  <div v-else :class="styles.body">{{ description }}</div>
</template>

<script>
import styles from '@/components/AppCard/AppCard.module.css';

export default {
  props: {
    description: String,
    newDescription: String,
    readonly: Boolean,
    isEdit: Boolean
  },
  data() {
    return {
      styles
    };
  },
  computed: {
    height() {
      const min = 2, max = this.newDescription.length / 20;
      return `${max < min ? min : max}em`;
    }
  },
  methods: {
    changeContent(event) {
      this.$emit('edit', event.target.value);
    }
  }
};
</script>

<style scoped></style>
