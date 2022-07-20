<template>
  <div>
    <div v-if="readonly" :class="styles.header">
      <span :class="styles.title">{{ title }}</span>
    </div>
    <div v-else-if="isEdit" :class="styles.header">
      <input :class="styles.input" :value="newTitle" @change="changeTitle" />
      <slot />
    </div>
    <div v-else :class="styles.header">
      <span :class="styles.title">{{ title }}</span>
      <slot />
    </div>
  </div>
</template>

<script>
import styles from '@/components/AppCard/AppCard.module.css'

export default {
  props: {
    title: String,
    newTitle: String,
    readonly: Boolean,
    isEdit: Boolean,
  },
  data() {
    return {
      styles,
    }
  },
  methods: {
    changeTitle(event) {
      this.$emit('edit', event.target.value)
    },
  },
}
</script>

<style scoped></style>
